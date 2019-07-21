const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const HTTPS = process.env.HTTPS === 'true'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    https: HTTPS,
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist/'),
    port: 3000
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
