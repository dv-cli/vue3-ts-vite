import { createApp, App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  RouterHistory,
  Router,
  createMemoryHistory,
} from "vue-router";
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import naive from "naive-ui";
import AppComponent from "./App.vue";
import { useQiankunStore } from "@/store/qiankun";
import "./assets/style/global.less";
import "virtual:svg-icons-register";

import { constantRouter } from "./router/modules/constant";
import { createPinia } from "pinia";
import { useGlobalStore } from "@/store";
import NProgress from "@/components/nprogress";

let router: Router;
let instance: App<Element>;
let history: RouterHistory;

async function render(props: any) {
  const { container, data = {}, onGlobalStateChange } = props;

  // data为主应用传递过来的数据，格式如下，请按需取用：
  // {
  //   store,		// 父应用store
  //   router,	        // 父应用router
  //   currentMenuItem: {}，  // 当前菜单项，目前只有低代码平台在使用
  //   baseConfig: {
  //     authorization: "xxxx", // token
  //     user: {}, // user完整数据
  //     language: "", // 国际化当前选中语言
  //     codeMap: {}   // 国际化数据
  //   }
  // }

  const {
    store,
    baseConfig,
    defaultPath = "", // 默认跳转路径
    loadedAppKey = "", // 当前加载微应用的名称
  } = data;

  // 如果data.defaultPath存在，表示主应用通过抽屉、弹框、内部dom元素打开子应用，xxx为项目base
  history = defaultPath ? createMemoryHistory() : createWebHashHistory("/demo-index/web/");

  router = createRouter({
    history,
    routes: [...constantRouter],
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });
  /**
   * @description 路由拦截 beforeEach
   * */
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 请求菜单列表并添加路由
    const globalStore = useGlobalStore();
    if (!globalStore.menuListGet.length) {
      await globalStore.getMenuList();
      return next({ ...to, replace: true });
    }

    next();
  });

  /**
   * @description 路由跳转结束
   * */
  router.afterEach(() => {
    NProgress.done();
  });

  /**
   * @description 路由跳转错误
   * */
  router.onError(error => {
    NProgress.done();
  });

  instance = createApp(AppComponent);

  // setupStore(instance);

  // 将父应用的router、store储存起来，供以后使用
  if (data.router) {
    instance.config.globalProperties.$parentRouter = data.router;
    instance.config.globalProperties.$parentVuex = store;
    (window as any).$parentVuex = store;
  }

  // 存储主应用传过来的用户信息、token等
  if (baseConfig) {
    const { user, authorization } = baseConfig;
    // ToDo, 存储用户信息、token
  }

  // 父子应用通信
  onGlobalStateChange?.((state: any) => {
    const {
      loadedApp,
      // styleSetting, 	// 风格
      // language, 	// 当前语言
      // codeMap,	// 国际化数据
      currentClosedMenu, // 当前关闭的菜单项
      topicIsConnect, // 订阅主题websocket是否连接上
    } = state;
    const { SET_MICRO_INCLUDE, SET_TOPIC_IS_CONNCET, SET_LANG, SET_CURRENT_CLOSED_MENU } =
      useQiankunStore();
    if (loadedApp) {
      const { childRoute = [], childRouteUrl = [] } = loadedApp[loadedAppKey] || {}; // xxx为微应用name，请按实际情况替换
      if (loadedApp && loadedAppKey && loadedApp[loadedAppKey]) {
        // 实现菜单页签缓存
        const { childRouteUrl = [] } = loadedApp[loadedAppKey];
        // if (microInclude.join(",") !== childRouteUrl.join(",")) {
        //         SET_MICRO_INCLUDE(childRouteUrl);
        //       }
      }
      SET_TOPIC_IS_CONNCET(topicIsConnect); // 存储至store
      SET_CURRENT_CLOSED_MENU(currentClosedMenu);
    }

    // if (styleSetting) {
    //   // ToDo, 切换风格
    //   ...
    // }
    // if (language) {
    //    SET_LANG(language)
    //   // ToDo ，切换语言
    //   ...
    // }
  }, true);

  // 如果是主应用通过iframe打开子应用，可通过getIframeInfo方法获取主应用的
  const getIframeInfo = (window as any).top["_topIframeInfo"];
  if (getIframeInfo && typeof getIframeInfo === "function") {
    const { authorization, user, store, router } = getIframeInfo() || {};
    instance.config.globalProperties.$parentRouter = router;
    instance.config.globalProperties.$parentVuex = store;
    (window as any).$parentVuex = data.store;
  }

  instance.config.globalProperties.$onGlobalStateChange = onGlobalStateChange; //父子应用通信
  instance
    .use(router)
    .use(naive)
    .use(createPinia())
    .mount(
      typeof container === "string" ? container : (container.querySelector("#app") as Element)
    );

  // 如果主应用传递了默认路径，直接跳转至默认路径
  if (defaultPath) {
    router.push(defaultPath);
  }
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({ container: "#app" });
}

renderWithQiankun({
  mount(props) {
    console.log("mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    instance.unmount();
    if (instance._container) {
      instance._container.innerHTML = "";
    }
    history.destroy();
  },
  update(props) {
    // 刷新页签
    const { REFRESH_BY_ROUTEPATH } = useQiankunStore();
    REFRESH_BY_ROUTEPATH(props.refreshUrl);
  },
});
