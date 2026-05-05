import svgLoader from "vite-svg-loader"
import removeConsole from "vite-plugin-remove-console"

export default {
  plugins: [
    svgLoader(),
    removeConsole({
      includes: ["log", "warn", "error"]
    }),
    {
      name: "remove-html-comments",
      enforce: "post",
      transform(code, id) {
        if (id.endsWith(".vue") || id.endsWith(".html")) {
          return code.replace(/<!--[\s\S]*?-->/g, "") // Remove comments
        }
        return code
      },
      transformIndexHtml(html) {
        return html.replace(/<!--[\s\S]*?-->/g, "")
      }
    }
  ],

  optimizeDeps: {
    exclude: ["form-data"]
  },
  ssr: {
    noExternal: ["form-data"]
  },

  esbuild: {
    drop: ["console", "debugger"]
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
        // additionalData: '@import "@/assets/css/global.scss";'
      }
    }
  }
}
