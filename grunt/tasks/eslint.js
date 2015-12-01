/* globals module */
module.exports = {
  options: {
    configFile: '<%= paths.src.config %>/eslint.json'
  },
  target: [
    '<%= paths.src.javascripts %>**/*.js'
  ]
};
