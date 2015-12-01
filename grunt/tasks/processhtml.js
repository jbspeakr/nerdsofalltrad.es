module.exports = {
  app: {
    files: [
      {
        expand: true,
        cwd: '<%= paths.dist.templates %>',
        src: '**/*.html.makedocs.tmp',
        dest: '<%= paths.dist.templates %>',
        ext: '.html.processhtml.tmp',
        flatten: false
      }
    ],
    options: {
      data: {
        cdn: process.env.CDN || ''
      },
      includeBase: '<%= paths.dist.default %>',
      process: false
    }
  }
};
