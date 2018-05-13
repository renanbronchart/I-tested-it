const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: '_redirects',
          to: path.resolve(__dirname, 'dist/')
        }
      ])
    ]
  }
}
