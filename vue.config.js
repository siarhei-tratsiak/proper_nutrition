const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  transpileDependencies: ['vuetify'],

  chainWebpack: function (config) {
    config
      .module
      .rule('js')
      .exclude.add(path.resolve('src/data/products.js'))
      .add(path.resolve('src/data/foodNutrients.js'))

    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Simplex Food'
        return args
      })
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
