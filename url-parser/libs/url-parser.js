class UrlParser {
  variableIndicator;

  constructor(options = {}) {
    const { variableIndicator } = options;
    this.variableIndicator = variableIndicator || ":";
  }

  parse(schema, urlInstance) {
    let parsedUrlParams = {};

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

  getParsedPath(schema, path) {
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

  getParsedQueryParams(queryParams) {
    // TODO: handle query params arrays.

    const parsedQueryParams = queryParams
      .split("&")
      .map((queryParam) => queryParam.split("="));

    return Object.fromEntries(parsedQueryParams);
  }

  isVariable(schemaPart) {
    return schemaPart.startsWith(this.variableIndicator);
  }

  getUrlParamKey(schemaPart) {
    return schemaPart.substring(schemaPart.indexOf(this.variableIndicator) + 1);
  }
}

module.exports = { UrlParser };