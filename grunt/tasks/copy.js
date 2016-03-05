module.exports = {
  app: {
    files: [
      {
        src: '<%= paths.src.images %>/*.ico',
        dest: '<%= paths.dist.default %>',
        expand: true,
        flatten: true
      },
      {
        cwd: '<%= paths.src.images %>',
        src: '**/*',
        dest: '<%= paths.dist.images %>',
        expand: true
      },
      {
        cwd: '<%= paths.src.content %>',
        src: '**/*.png',
        dest: 'dist',
        expand: true
      },
      /* highlightjs */
      {
        src: '<%= paths.node_modules %>/highlightjs/highlight.pack.min.js',
        dest: '<%= paths.dist.javascripts %>/highlight.min.js'
      },
      {
        src: '<%= paths.src.config %>/robots.txt',
        dest: '<%= paths.dist.default %>/robots.txt',
      }
    ]
  }
};
