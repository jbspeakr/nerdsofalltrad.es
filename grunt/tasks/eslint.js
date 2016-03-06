module.exports = {
  options: {
    configFile: '.eslintrc'
  },
  target: [
    '<%= paths.src.javascripts %>**/*.js',
    'grunt/**/*.js'
  ]
};
