module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser", // ✅ 使用官方解析器
    requireConfigFile: false,       // 如果没有 babel.config.js 文件，可加此项
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    "no-undef": "off", // 避免 defineProps 报错
  },
}
