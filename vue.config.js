
module.exports = {
  lintOnSave: false,
  publicPath: './', // vue-cli3.3+新版本使用
  productionSourceMap: false,
  chainWebpack: config => {
    globalScss(config)
  }
}

/**
 * @param {string} dir 路径
 * @returns {string} 返回基于当前文件的绝对路径
 */
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

/**
 * 全局 scss 文件
 *
 * @param {object} config 配置
 * @returns {void} 无返回
 */
function globalScss (config) {
  const scssFiles = ['src/assets/css/scssConfig.scss']
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach(item => {
    item.use('sass-resources-loader').loader('sass-resources-loader')
      .options({
        resources: scssFiles
      })
      .end()
  })
}
