const include = /\/pages\/productA/;

module.exports = [{
  // 合并router
  type: 'router',
  // 路由文件名
  targetFilename: 'router.js',
  // 入口组件名
  entryModuleName: 'App.js',
  // 寻找路由的目录
  targetDirectory: './shared/pages',
  // 入口组件
  entryModulePath: './shared/App.js',
  // 新文件存放路径
  newFilePath: './shared/router.js',
  routerPrefixFilter: /\/?pages/,
  // 包含模块，即最终打包的模块
  // include,
}, {
  // 合并reducer
  type: 'reducer',
  // 路由文件名
  targetFilename: 'reducer.js',
  // 寻找路由的目录
  targetDirectory: './shared/pages',
  // 新文件存放路径
  newFilePath: './shared/reducer.js',
  // 包含模块，即最终打包的模块
  // include,
}];
