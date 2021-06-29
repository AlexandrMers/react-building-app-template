import path from "path";

module.exports = {
  process(_: any, filename: string) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
