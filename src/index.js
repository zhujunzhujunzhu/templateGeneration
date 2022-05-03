/*
 * @Description
 * @Autor 朱俊
 * @Date 2022-03-25 10:18:00
 * @LastEditors 朱俊
 * @LastEditTime 2022-03-25 12:16:43
 */

const fs = require("fs-extra");
const { resolve } = require("path");
const handlebars = require("handlebars");
const fileListConfig = require("./config");

const temp = fs.readFileSync(
  resolve(__dirname, "./template/index.vue"),
  "utf-8"
);
const compile = handlebars.compile(temp, { noEscape: true });

function generateSingleFile(info) {
  const arr = info.path.split("/");
  const name = arr[arr.length - 1].split(".")[0];
  const content = compile({
    content: info.path,
    description: info.description,
    className: `${name}Wrapper`,
    author: info.author,
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
