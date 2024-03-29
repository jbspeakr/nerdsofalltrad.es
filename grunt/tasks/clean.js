module.exports = {
  before: {
    options: {
      force: true
    },
    src: [
      '<%= paths.dist.default %>/**/*'
    ]
  },
  after: {
    options: {
      force: true
    },
    src: [
      '<%= paths.dist.default %>/**/*.tmp',
      '<%= paths.dist.default %>/**/*.inline.*'
    ]
  }
};
