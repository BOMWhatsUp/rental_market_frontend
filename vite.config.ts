import { defineConfig, ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import { UserConfig } from "vite";

// UserConfig interface에서 proxy 속성 추가
interface MyUserConfig extends UserConfig {
  proxy?: {
    [key: string]: string | ProxyOptions;
  };
}

export default defineConfig(
  ({ command, mode }: { command: string; mode: string }): MyUserConfig => {
    return {
      plugins: [react()],
      define: {
        global: "globalThis",
      },
      // proxy 속성 추가

      // proxy: {
      //   "/api": {
      //     target: "http://3.37.196.93:8080",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    };
  }
);
