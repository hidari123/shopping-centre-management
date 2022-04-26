/*
 * @Author: hidari
 * @Date: 2022-04-14 13:38:31
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 15:25:33
 * @FilePath: \shopping-centre-management\vue.config.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入，使用绝对路径
      // 需要使用 path.join 拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  chainWebpack: config => {
    // 配置10kb下的图片打包成base64的格式
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    // 给webpack-dev-server开启可IP和域名访问权限
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
