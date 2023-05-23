import { UrlParser } from "./libs/url-parser";

function run() {
  const urlParser = new UrlParser();

  console.log(
    urlParser.parse(
      "/:version/api/:collection/:id",
      "/6/api/listings/3?sort=desc&limit=10"
    )
  );
}

run();
