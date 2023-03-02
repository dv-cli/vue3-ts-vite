// store/modules/qiankun
import { defineStore } from "pinia";
import { nextTick } from "vue";

interface keepAliveMapping {
  code: string;
  name: string;
}
interface IQiankunStore {
  microRefresh: boolean; // 是否刷新微应用页签
  microInclude: string[]; // 需缓存菜单页签数组
  microExclude: string[]; // 刷新时，不需要缓存的菜单页签数组
  keepAliveMapping: keepAliveMapping[]; // 缓存菜单路由与组件路由映射关系
  lang: string; // 当前语言
  currentClosedMenu: any; // 关闭菜单项
  topicIsConnect: boolean; // 订阅主题是否连接上
}

export const useQiankunStore = defineStore({
  id: "qinkun",
  state: (): IQiankunStore => ({
    microRefresh: false,
    microInclude: [],
    microExclude: [],
    keepAliveMapping: [],
    lang: "ZH_CN", //国际化语言
    currentClosedMenu: null, //关闭的菜单信息
    topicIsConnect: false,
  }),
  getters: {
    getMicroRefresh(): boolean {
      return this.microRefresh;
    },
    getMicroInclude(): string[] {
      return this.microInclude;
    },
    getMicroExclude(): string[] {
      return this.microExclude;
    },
  },
  actions: {
    SET_TOPIC_IS_CONNCET(bool: boolean) {
      this.topicIsConnect = bool;
    },
    SET_MICRO_REFRESH(microRefresh: boolean) {
      this.microRefresh = microRefresh;
    },
    SET_MICRO_INCLUDE(microInclude: string[]) {
      this.microInclude = microInclude;
    },
    SET_MICRO_EXCLUDE(microExclude: string[]) {
      this.microExclude = microExclude;
    },
    SET_KEEP_ALIVE_MAPPING(keepAliveMapping: keepAliveMapping[]) {
      this.keepAliveMapping = keepAliveMapping;
    },
    SET_LANG(lang: string) {
      this.lang = lang;
    },
    SET_CURRENT_CLOSED_MENU(currentClosedMenu: any) {
      this.currentClosedMenu = currentClosedMenu;
    },
    REFRESH_BY_ROUTEPATH(refreshUrl: string) {
      const { SET_MICRO_REFRESH, SET_MICRO_INCLUDE, microInclude } = this;
      const includes = microInclude.slice();
      SET_MICRO_REFRESH(true);
      SET_MICRO_INCLUDE(microInclude.filter(item => item !== refreshUrl));
      return nextTick(() => {
        SET_MICRO_REFRESH(false);
        SET_MICRO_INCLUDE(includes);
      });
    },
  },
});
