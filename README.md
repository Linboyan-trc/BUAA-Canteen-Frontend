# buaa-cafeterias
`//temp`下面的代码都是测试数据，与后端对接时，注释掉测试数据代码，然后把附近原本注释掉的接口代码（一般在测试数据下方）取消注释

侧边栏登录和注册按钮只在未登录时显示，我的按钮只在登录后显示，前端模拟登录可以调整src/store/user.js里//temp下的代码

用户中心里有个“帖子”的选项，最后可能会去掉，因为可能不需要普通用户发送帖子的功能
# TODO
1. Login、Register页面格式检验还没写
2. 管理员页面还没做
### 一些额外安装的库
```sh
npm install unplugin-auto-import
npm install unplugin-vue-components
npm install -D sass
npm install vue-infinite-scroll
```
不全，可以根据控制台运行的报错提示安装相应的库

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```
