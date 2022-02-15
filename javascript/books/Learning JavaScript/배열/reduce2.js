const words = [
  "Beachball",
  "Rodeo",
  "Angel",
  "Aardvark",
  "Xylophone",
  "November",
  "Chocolate",
  "Papaya",
  "Unifrom",
  "Joker",
  "Clover",
  "Bali",
];

const longWords = words.reduce((a, w) => (w.length > 6 ? a + " " + w : a), "");

console.log(longWords);
