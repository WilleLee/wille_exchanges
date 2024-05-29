/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return defineConfig({
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      tsconfigPaths(),
    ],
    test: {
      environment: "jsdom",
    },
    server: {
      proxy: {
        "/api": {
          target: "https://www.koreaexim.go.kr/site/program/financial",
          changeOrigin: true,
          rewrite: (path) => {
            let apiUrl = path.replace(/^\/api/, "");
            if (apiUrl.includes("exchangeJSON")) {
              apiUrl += `&authkey=${env.VITE_EXCHANGE_AUTH_KEY}`;
            }
            return apiUrl;
          },
        },
      },
    },
  });
};
