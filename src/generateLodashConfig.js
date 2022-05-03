const request = require("request");
const cheerio = require("cheerio");
const baseUrl = "https://www.lodashjs.com";
const url = `${baseUrl}/docs/lodash.after`;

const download = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

async function getExamples(url) {
  const html = await download(url);
  const $ = cheerio.load(html);
  const code = $(".codeBlockLines_mRuA").text();
  return code;
}

module.exports = async function generateConfig() {
  const html = await download(url);
  const $ = cheerio.load(html);

  const a = $(".menu__list li a");

  const base = "function/";

  const suba = Array.from(a).filter((it) => {
    return (
      it.attribs.tabindex == 0 &&
      it.attribs.href &&
      it.attribs.href.indexOf("/docs/lodash") !== -1
    );
  });
  const result = suba.map((it) => {
    const href = it.attribs.href;
    const name = href.split("lodash.")[1];
    const path = `${base}${name}.js`;
    return {
      path,
      doc: `${baseUrl}${href}`,
    };
  });

  const promiseAll = Promise.all(
    result.map((it) =>
      getExamples(it.doc).then((code) => {
        console.log(`处理完成：${it.doc}`);
        it.code = code;
      })
    )
  );
  await promiseAll;

  console.log(`\n成功生成配置文件！\n`);
  return result;
};
