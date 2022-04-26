/*
 * @Author: your name
 * @Date: 2022-02-22 16:17:27
 * @LastEditTime: 2022-04-24 11:38:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AExi
 * @FilePath: \test-vue3\vue.config.js
 */
// const path = require("path");
// const resolve = function(dir) {
//   return path.join(__dirname, dir);
// };
module.exports = {
  //   publicPath: "./",
  //   outputDir: "dist",
  //   assetsDir: "static",
  //   lintOnSave: true, // 是否开启eslint保存检测
  //   productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  //   pages: {
  //     index: {
  //       entry: "src/main.js",
  //       template: "public/index.html"
  //     }
  //   },
  //   chainWebpack: config => {
  //     config.resolve.alias
  //       .set("@", resolve("src"))
  //       .set("@v", resolve("src/views"))
  //       .set("@c", resolve("src/components"))
  //       .set("@u", resolve("src/utils"))
  //       .set("@s", resolve("src/service")); /* 别名配置 */
  //     config.optimization.runtimeChunk("single");
  //   },
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      "/": {
        target: "http://192.168.30.154/",
        changeOrigin: true,
        ws: false,
      },
    },
  },
};
