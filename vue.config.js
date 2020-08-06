const path = require('path')
module.exports =  {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/style/variable.less"), 
      path.resolve(__dirname, "src/style/common.less")] // 引入全局样式变量
    }
  },
  devServer: {
    proxy: 'http://192.168.0.10:3000'
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('less')
  //     .test(/\.less$/)
  //     .oneOf('vue')
  //     .use('px2rem-loader')
  //     .loader('px2rem-loader')
  //     .before('postcss-loader') // this makes it work.
  //     .options({ remUnit: 75, remPrecision: 8 })
  //     .end()
  // }
}