const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  configureWebpack: {
      devServer: {
          // proxy: {
            proxy: 'http://localhost:9000/',
              // '/api': {
              //     target: 'http://localhost:3000',
              // },
          // },
      },
  },
}
