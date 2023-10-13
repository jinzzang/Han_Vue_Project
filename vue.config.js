
module.exports = {
//  outputDir: "../src/main/resources/static",
  devServer: {
    port: 8082,
    proxy: {
      '/vue': {
        target: 'http://localhost:8081',
        publicPath:'./vue',
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
  },
  publicPath: './', //해당 설정을 추가 해줍니다. 상대경로인 ./ 로 설정 합니다.
  assetsDir: './', //만약 css, js, img 등 어셋 경로가 다를 경우 해당 경로도 수정 해야 합니다.

}


