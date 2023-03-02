<template>
  <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <!-- qiankun子应用缓存处理 -->
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepIncludes">
              <component :is="microRefresh ? null : Component" />
            </keep-alive>
          </router-view>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">
import { useQiankunStore } from "@/store/qiankun";
import { defineComponent, computed, toRefs } from "vue";
import { darkTheme, lightTheme, zhCN, dateZhCN } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { useGlobalStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const { microInclude, microRefresh } = toRefs(useQiankunStore());
    const themes: Record<string, GlobalTheme> = { dark: darkTheme, light: lightTheme };
    const langMap: Record<string, any> = { zhCN, dateZhCN };
    const globalStore = useGlobalStore();
    const { themeValue, langObj } = storeToRefs(globalStore);
    const locale = langMap[langObj.value.language];
    const dateLocale = langMap[langObj.value.dateLocale];
    const router = useRouter();
    // 根据缓存url，映射到具体组件名，实现缓存
    const keepIncludes = computed(() => {
      return microInclude.value.reduce((arr: string[], url) => {
        const matched = router.resolve(url).matched || [];
        matched.forEach(m => {
          const name = m.components?.default?.name;
          name && arr.push(name);
        });
        return arr;
      }, []);
    });
    return {
      darkTheme,
      lightTheme,
      theme: computed(() => themes[themeValue.value]),
      themeValue,
      locale,
      dateLocale,
      microRefresh,
      keepIncludes,
    };
  },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .n-config-provider {
    height: 100%;
  }
}
.test {
  color: @test-color;
}
</style>
