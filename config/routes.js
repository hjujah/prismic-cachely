export default {
  multiLanguage: false,

  defaultLocale: "en-us",

  excludedRoutes: [],

  // PAGES ---------------------------------------------------------------------
  pages: ["page_home", "page_default", "page_blog"],

  // ARTICLES ------------------------------------------------------------------
  articles: {
    article_blog: {
      parent: "page_blog",
      template: "article_blog" // optional field - key would be used if not set
    }
  }
}
