const path = require('path')
const { config } = require('process')
module.exports =  {
  publicPath: './',
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
  // configureWebpack: config => {
    
  //   config.optimization = {
  //     splitChunks: {
  //       cacheGroups: {
  //         // vendor: {
  //         //   chunks: 'all',
  //         //   test: /node_modules/,
  //         //   name: 'vendor',
  //         //   minChunks: 1,
  //         //   maxInitialRequests: 5,
  //         //   minSize: 0,
  //         //   priority: 100
  //         // }
  //         defaultVendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: -10
  //         },
  //         default: {
  //           minChunks: 2,
  //           priority: -20,
  //           reuseExistingChunk: true
  //         }
  //       }
  //     }
  //   }
  // }
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     automaticNameDelimiter: '~',
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }
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