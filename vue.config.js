module.exports = {
  chainWebpack: config => {
    config.externals({
      jquery: 'jQuery'
    })
  }
}