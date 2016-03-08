module.exports = {
  default: {
    pattern: [
      '<%= paths.dist.default %>/index.html',
      '<%= paths.dist.default %>/**/index.html'
    ],
    siteRoot: '<%= paths.dist.default %>',
    changefreq: 'daily'
  }
};
