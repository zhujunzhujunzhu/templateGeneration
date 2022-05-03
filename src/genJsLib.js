const fs = require("fs-extra");
const { resolve } = require("path");
const handlebars = require("handlebars");
const generateLodashConfig = require("./generateLodashConfig.js");

async function main() {
  const fileListConfig = await generateLodashConfig();
  const temp = fs.readFileSync(
    resolve(__dirname, "./template/jsLib.tpl"),
    "utf-8"
  );
  const compile = handlebars.compile(temp, { noEscape: true });

  function generateSingleFile(info) {
    const arr = info.path.split("/");
    const name = arr[arr.length - 1].split(".")[0];
    const content = compile({
      name,
      doc: info.doc,
      example: info.code,
    });

    fs.outputFile(
      resolve(__dirname, `../dist/${info.path}`),
      content,
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${info.path},生成完成！`);
        }
      }
    );
  }

  fileListConfig.forEach((item) => {
    generateSingleFile(item);
  });
}
main();
