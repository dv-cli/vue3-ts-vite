<template>
  <nav>
    <div class="nav-left">
      <Breadcrumb />
    </div>
    <div class="nav-right">
      <n-button class="r16" text @click="toggleTheme">{{ isNight ? "浅色" : "深色" }}</n-button>
      <SvgIcon
        class="r16"
        :name="isFullscreen ? 'full-screen' : 'exit-full-screen'"
        @click="toggleScreen"
      />
      <n-icon class="r16"><Language /></n-icon>
    </div>
  </nav>
</template>

<script lang="ts">
import Breadcrumb from "./components/Breadcrumb.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { Language } from "@vicons/ionicons5";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    SvgIcon,
    Language,
    // GameControllerOutline,
    Breadcrumb,
  },
  setup() {
    const isFullscreen = ref<Boolean>(false);
    const isNight = ref<Boolean>(false);
    const toggleScreen = () => (isFullscreen.value = !isFullscreen.value);
    const toggleTheme = () => (isNight.value = !isNight.value);

    return {
      toggleScreen,
      toggleTheme,
      isFullscreen,
      isNight,
    };
  },
});
</script>

<style lang="less" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  .nav-left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
  .nav-right {
    font-size: 20px;
    padding: 8px;
    margin-right: 36px;
    display: flex;
    align-items: center;
    .r16 {
      margin-right: 16px;
    }
  }
}
</style>
