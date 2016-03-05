module.exports = {
  app: {
    src: [
      '<%= paths.dist.templates %>/**/*.html',
      '!<%= paths.dist.templates %>/google*.html'
    ]
  }
};
