import { defineStore } from "pinia";
import { getMenuListApi } from "@/service/api/mock";
import { ObjectType } from "@/service/api/interface";
import { getKeepAliveRouterName, getAllBreadcrumbList } from "@/utils/utils";

interface GlobalState {
  name: string;
  menuList: any[];
  userInfo?: ObjectType;
  themeValue: string;
  fullScreen: string;
  langObj: langObjType;
}

type langObjType = { language: string; dateLocale: string };

export const useGlobalStore = defineStore({
  id: "globalStore",
  state: (): GlobalState => ({
    name: "全局store",
    menuList: [],
    userInfo: {},
    themeValue: "dark",
    fullScreen: "full-screen",
    langObj: {
      language: "zhCN",
      dateLocale: "dateZhCN",
    },
  }),
  getters: {
    nameLength: state => state.name.length,
    menuListGet: state => state.menuList,
    keepAliveRouterNameGet: state => getKeepAliveRouterName(state.menuList),
    breadcrumbObjectGet: state => getAllBreadcrumbList(state.menuList),
  },
  actions: {
    async getMenuList() {
      const { data } = await getMenuListApi();
      this.menuList = data as any;
    },
    toggleThem(themeValue: string) {
      this.themeValue = themeValue;
    },
    toggleFullScreen() {
      // fullscreenEnabled属性检查浏览器是否支持全屏模式，并且是否得到了用户的授权。
      if (document.fullscreenEnabled) {
        // fullscreenElement属性将返回当前处于全屏模式下的元素
        // 如果没有元素处于全屏模式下的时候，它将返回null
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    },
    changeLanguage(langObj: langObjType) {
      this.langObj = langObj;
    },
  },
});
