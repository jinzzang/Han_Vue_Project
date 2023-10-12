
module.exports = {
  outputDir: "../src/main/resources/static",
  devServer: {
    port: 8082,
    proxy: {
      '/vue': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  css:{
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/assets/style/_mixins.scss";
        @import "~@/assets/style/_variables.scss";
        @import "~@/assets/style/_mediaQueries.scss";
        @import "~@/assets/style/_svg.scss";
        @import "~@/assets/style/_common.scss";
        `
      }
    }
  }
}