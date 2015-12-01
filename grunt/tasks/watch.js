module.exports = {
  app: {
    files: [
      '<%= paths.src.config %>/**/*',
      '<%= paths.src.images %>/**/*.svg',
      '<%= paths.src.javascripts %>/**/*.js',
      '<%= paths.src.stylesheets %>/**/*.css',
      '<%= paths.src.layouts %>/**/*.mustache',
      '<%= paths.src.templates %>/**/*.html',
      '<%= paths.src.content %>/**/*.md'
    ],
    tasks: ['app']
  }
};
