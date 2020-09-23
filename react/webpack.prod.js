const merge = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash|react-bootstrap)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
})
