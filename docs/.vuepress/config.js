const path = require("path");

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  title: "vicvinc's notes.",
  description: "sunshine water air and something else.",
  configureWebpack: {
    resolve: {
      alias: {
        "@static": "static"
      }
    }
  },
  themeConfig: {
    sidebar: "auto",
    nav: [
      { text: "Home", link: "/" },
      { text: "Notes", link: "/notes/" },
      { text: "Gallery", link: "/gallery/" }
    ]
  },
  base: "/",
  dest: resolve("../../dist")
};
