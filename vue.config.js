const path = require('path')
module.exports =  {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/style/variable.less")] // 引入全局样式变量
    }
  },
  devServer: {
    proxy: 'http://192.168.0.10:3000'
  }
}