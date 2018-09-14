const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 其他配置
  plugins: [
    new webpack.DefinePlugin({
      serverUrl: process.env.ENV == 'dev' ? JSON.stringify('') : JSON.stringify('https://www.jun1yun.com')
    })
  ]
}
