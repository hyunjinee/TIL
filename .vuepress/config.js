const sidebar = require("./sidebar");

module.exports = {
  title: "Today Hyunjin Learned",
  description: "⭐️",
  dest: "build",
  base: "/TIL/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about/" },
      { text: "Contact", link: "/contact/" },
    ],
    sidebar,
  },
};

// // config.js
// module.exports = {
//   title: "vuepress-stater", // 사이트 타이틀
//   description: "vuepress로 만든 문서입니다.",
//   themeConfig: {
//     logo: "https://avatars1.githubusercontent.com/u/18749057?s=460&v=4", // 로고 이미지
//     nav: [{ text: "Home", link: "/" }],
//     sidebar: "auto", // h1~h6 같은 heading tag를 기준으로 sidebar를 만들어줌
//   },
// }
