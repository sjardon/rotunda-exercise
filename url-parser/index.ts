import { UrlParser } from "./libs/url-parser";

function run() {
  const urlParser = new UrlParser();

  console.log(
    "Testing url instance [/6/api/listings/3?sort=desc&limit=10] for url schema [/:version/api/:collection/:id]",
    urlParser.parse(
      "/:version/api/:collection/:id",
      "/6/api/listings/3?sort=desc&limit=10"
    )
  );
}

run();
