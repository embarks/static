module.exports = {
  plugins: [
    require('autoprefixer')({
      browserlist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
    })
  ]
}
