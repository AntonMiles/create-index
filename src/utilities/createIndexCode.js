import _ from "lodash";

const fileOrFolderName = (fileName) => {
  const isFile = (_.includes(fileName, ".ts"));

  if (!isFile) {
    return `${fileName}/index`;
  } else {
    const indexOfDot = fileName.indexOf(".");
    return fileName.slice(0, indexOfDot);
  }
};

const buildImportBlock = (files) => {
  let importBlock;

  importBlock = _.map(files, (fileName) => {
    return `import "./${fileOrFolderName(fileName)}";`;
  });

  importBlock = importBlock.join("\n");

  return importBlock;
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;

  code = "";
  configCode = "";

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
      code += banner + "\n";
    });

    code += "\n";
  }

  if (options.config && _.size(options.config) > 0) {
    configCode += " " + JSON.stringify(options.config);
  }

  code += "// @create-index" + configCode + "\n\n";

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildImportBlock(sortedFilePaths) + "\n\n";
  }

  return code;
};
