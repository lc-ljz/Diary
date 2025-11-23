// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// webpack.config.js
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')  // 使用 webpack 版本
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: 
  {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()], // 解析 Element Plus 组件
        vueTemplate: true,
      }),
      Components({
        resolvers: [ElementPlusResolver()], // 解析 Element Plus 组件
      })
    ],
  }
  
})

