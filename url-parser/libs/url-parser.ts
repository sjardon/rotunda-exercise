export type UrlParserOptions = {
  variableIndicator?: string;
};

export type UrlParameters = {
  [key: string]: string | number | boolean;
};

export class UrlParser {
  private variableIndicator: string;

  constructor(options: UrlParserOptions = {}) {
    const { variableIndicator } = options;
    this.variableIndicator = variableIndicator || ":";
  }

  parse(schema: string, urlInstance: string): UrlParameters {
    let parsedUrlParams: UrlParameters = {};

    const [path, queryParams] = urlInstance.split("?");

    if (path) {
      const parsedPath = this.getParsedPath(schema, path);
      parsedUrlParams = Object.assign(parsedUrlParams, parsedPath);
    }

    if (queryParams) {
      const parsedQueryParams = this.getParsedQueryParams(queryParams);
      parsedUrlParams = Object.assign(parsedUrlParams, parsedQueryParams);
    }

    return parsedUrlParams;
  }

  protected getParsedPath(schema: string, path: string): UrlParameters {
    const parsedPathParams = {};
    const pathParts = path.split("/");

    schema.split("/").forEach((schemaPart, index) => {
      if (!this.isVariable(schemaPart)) {
        return false;
      }

      const key = this.getUrlParamKey(schemaPart);

      parsedPathParams[key] = pathParts[index];
    });

    return parsedPathParams;
  }

  protected getParsedQueryParams(queryParams: string): UrlParameters {
    // TODO: handle query params arrays.

    const parsedQueryParams = queryParams
      .split("&")
      .map((queryParam) => queryParam.split("="));

    return Object.fromEntries(parsedQueryParams);
  }

  protected isVariable(schemaPart: string): boolean {
    return schemaPart.startsWith(this.variableIndicator);
  }

  protected getUrlParamKey(schemaPart: string) {
    return schemaPart.substring(schemaPart.indexOf(this.variableIndicator) + 1);
  }
}
