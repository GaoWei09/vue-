const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  publicPath: "./",
  assetsDir: "static",
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
      echarts: "echarts",
      vant: "vant",
      "vue-i18n": "VueI18n",
    },
    
    
    
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
};