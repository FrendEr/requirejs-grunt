# requirejs-grunt

基于grunt与bower的requirejs项目构建。

###1、使用bower获取静态资源包

`bower init` (选择amd模式作为默认模式)

`bower install backbone --save-dev` (获取的backbone文件支持amd)


###2、使用grunt构建(具体配置见Gruntfile.js文件)

a) 所有静态资源库文件合并成一个base.js文件

b) 所有app都提供一个*-main.js的入口文件


