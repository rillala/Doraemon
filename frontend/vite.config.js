import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from "vite-plugin-style-import";

export default defineConfig({
  base:
    process.env.DEPLOY_TARGET === "GITHUB_PAGES"
      ? "/Doaramon/" // 替換為你的 GitHub 倉庫名
      : process.env.NODE_ENV === "production"
      ? "/doaramon/front/"
      : "/",
  build: {
    outDir: "front",
  },
  server: {
    proxy: {
      // 配置代理，解決跨域問題
      "/api": "http://localhost:8080",
    },
  },

  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [
        AndDesignVueResolve(),
        VantResolve(),
        ElementPlusResolve(),
        NutuiResolve(),
        AntdResolve(),
      ],
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        // 配置 Sass 全局變數、混入等
        additionalData: `@import "./src/assets/scss/main.scss";`,
      },
    },
  },
});
