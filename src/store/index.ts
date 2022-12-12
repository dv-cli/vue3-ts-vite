import { defineStore } from "pinia";
import { getMenuListApi } from "@/service/api/login/mock";
import { ObjectType } from "@/service/api/login/interface";
import { getKeepAliveRouterName, getAllBreadcrumbList } from "@/utils/utils";

interface GlobalState {
  name: string;
  menuList: any[];
  userInfo?: ObjectType;
}

export const useGlobalStore = defineStore({
  id: "globalStore",
  state: (): GlobalState => ({
    name: "全局store",
    menuList: [],
    userInfo: {},
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
  },
});
