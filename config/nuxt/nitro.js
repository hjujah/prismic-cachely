export default {
  prerender: {
    // crawlLinks: true,
    routes: ["/sitemap.xml"],
    ignore: ["/slice-simulator", "/dev/slice-simulator", "/preview"]
  },

  // preset: "node-server",

  publicAssets:
    process.env.NODE_ENV == "development" || process.env.STAGING == "true"
      ? []
      : [
          {
            baseURL: "img",
            dir: "public/img",
            maxAge: 60 * 60 * 24 * 365 // 1 year
          },
          {
            baseURL: "fonts",
            dir: "public/fonts",
            maxAge: 60 * 60 * 24 * 365 // 1 year
          }
        ],

  storage: {
    redis: {
      driver: "redis",
      /* redis connector options */
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      username: "", // needs Redis >= 6
      password: "",
      db: 0, // Defaults to 0
      tls: {} // tls/ssl
    }
  }
}
