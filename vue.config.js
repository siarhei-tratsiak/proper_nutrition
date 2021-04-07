const path = require('path')
module.exports = {
  transpileDependencies: ['vuetify'],

  chainWebpack: function (config) {
    config.module
      .rule('js')
      .exclude.add(path.resolve('src/data/products.js'))
      .add(path.resolve('src/data/foodNutrients.js'))
  },

  pluginOptions: {
    i18n: {
      locale: '(ru)',
      fallbackLocale: '(en)',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
