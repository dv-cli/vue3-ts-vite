## 技术栈

- [vite](https://cn.vitejs.dev/) 尤大团队开发的新一代构建工具，急速启动，快速热载
- [axios](https://www.kancloud.cn/yunye/axios/234845) 这个就不用介绍了吧，使用最广泛的 ajax 封装插件
- [naive-ui](https://www.naiveui.com/zh-CN/dark/docs/introduction) 尤雨溪推荐 UI 库，TypeScript 语法，主题可调，为 vue3 而生
- [vueuse](https://vueuse.org/) 尤雨溪推荐，可以理解为 vue3 的 hooks 库，专为 vues 设计
- [pinia](https://pinia.vuejs.org/) 尤雨溪推荐，替代 vuex4，作者原话 pinia 就是 vuex5 了

## 脚手架安装

本项目目前支持通过`cdv-cli`脚手架来安装。

[cdv-cli 脚手架使用方法点击查看](https://github.com/ruanlin-kylin/cdv-cli)

## 开发运行

```bash
    # 安装依赖
    yarn install

    # 本地开发 开启服务
    yarn dev

    # 打包
    yarn build


```

## 本项目 git Commit message 统一规范

常用的修改项

- feat: 增加新功能
- fix: 修复问题/BUG
- style: 代码风格相关无影响运行结果的
- perf: 优化/性能提升
- refactor: 重构
- revert: 撤销修改
- test: 测试相关
- docs: 文档/注释
- chore: 依赖更新/脚手架配置修改等
- workflow: 工作流改进
- ci: 持续集成
- types: 类型定义文件更改
- wip: 开发中

**[⬆ 返回顶部](#技术栈)**
