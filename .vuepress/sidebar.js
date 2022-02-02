const CONST = require("./const");

module.exports = [
  {
    title: "JavaScript",
  },
  {
    title: "React",
  },
  {
    title: "Python",
  },
  {
    title: "Node",
    children: [
      {
        title: "공식문서",
      },
    ],
  },
  {
    title: "Nest",
    children: CONST.Nest,
  },
  {
    title: "TEST",
    // children: ["test"],
  },
];
