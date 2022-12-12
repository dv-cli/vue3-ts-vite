<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { darkTheme, lightTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";

export default defineComponent({
  setup() {
    return {
      darkTheme,
      lightTheme,
      theme: ref<GlobalTheme | null>(null),
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
