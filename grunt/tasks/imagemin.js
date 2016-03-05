module.exports = {
  images: {
    files: [
      {
        cwd: '<%= paths.src.content %>',
        src: '**/*.png',
        dest: 'dist',
        expand: true
      }
    ]
  }
};
