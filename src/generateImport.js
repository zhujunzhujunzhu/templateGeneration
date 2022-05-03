/*
 * @Description
 * @Autor 朱俊
 * @Date 2022-03-25 16:29:19
 * @LastEditors 朱俊
 * @LastEditTime 2022-04-23 11:10:23
 */
const list = [
  {
    path: "right/address.vue",
    author: "王松",
    description: "区域",
  },
  {
    path: "right/age.vue",
    author: "王松",
    description: "年龄",
  },
  {
    path: "right/sex.vue",
    author: "王松",
    description: "性别",
  },
  {
    path: "right/partition.vue",
    author: "王松",
    description: "分区",
  },
];

function initialsLetterUpperCase(str) {
  const first = str[0];
  const other = str.slice(1);
  return first.toUpperCase() + other;
}

const importArr = [];
const components = [];
const templates = [];
list.forEach((it) => {
  const name = it.path.split("/").slice(-1).join("").split(".")[0];
  const comName = initialsLetterUpperCase(name);
  importArr.push(`import ${comName} from './${name}.vue'`);
  components.push(comName);
  templates.push(`<!-- ${it.description} -->
  <${comName}/>`);
});
console.log(importArr.join("\n"));

console.log(components.join(",\n"));

console.log(templates.join("\n"));
