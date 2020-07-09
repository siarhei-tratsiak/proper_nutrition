const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: function (config) {
    config.module
      .rule("js")
      .exclude.add(path.resolve("src/data/food.js"))
      .add(path.resolve("src/data/foodNutrient.js"));
  }
};
