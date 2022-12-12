import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import viteCompression from "vite-plugin-compression";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/style/main.less";',
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5238,
    open: true,
    proxy: {
      "/cnhis": {
        target: "https://mock.mengxuegu.com/mock/63856c7c9433403d6c06899c", // easymock
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cnhis/, ""),
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
