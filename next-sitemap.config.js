/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kylesjapan.life",
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    return [
      {
        loc: "/en/about",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/ja/about",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
    ];
  },
};
