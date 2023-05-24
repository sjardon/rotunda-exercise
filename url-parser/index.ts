import { UrlParser } from "./libs/url-parser";

function run() {
  const urlParser = new UrlParser();

  const urlSchema = "/:version/api/:collection/:id";
  const urlInstance = "/6/api/listings/3?sort=desc&limit=10";

  console.log(
    `Testing url instance [${urlInstance}] for url schema [${urlSchema}]`,
    urlParser.parse(urlSchema, urlInstance)
  );
}

run();
