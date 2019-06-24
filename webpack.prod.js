const merge = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        'component-lib': {
          test: /[\\/]node_modules[\\/](@mindshaft\/cute-components)[\\/]/,
          name: 'component-lib',
          chunks: 'all'
        },
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash|react-bootstrap)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }

    }
  }
})
