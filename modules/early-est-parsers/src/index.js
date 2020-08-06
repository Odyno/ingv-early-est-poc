const Parser = require("./quakeml/Quakeml");
const jsonParser = require("xml2json");
const fs = require("fs");

quakeml2obj = rawQuakeml => {
  rawQuakeml = rawQuakeml || "";
  return Parser({ xml: rawQuakeml });
};

quakeml2json = (xml, options) => {
  options = options || {};
  xml = xml || "";
  let actualOptions = Object.assign(
    {},
    {
      object: true,
      sanitize: true,
      trim: true
    },
    options
  );
  return jsonParser.toJson(xml, actualOptions);
};

loadQuakemlXml = path => {
  return fs.readFileSync(path, { encoding: "utf8" });
};

module.exports = {
  loadQuakemlXml,
  quakeml2json,
  quakeml2obj
};
