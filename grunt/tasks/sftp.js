module.exports = {
  deploy: {
    files: {
      "./": ["dist/.*", "dist/**"]
    },
    options: {
      host: process.env.DEPLOY_HOST,
      path: process.env.DEPLOY_PATH,
      username: process.env.DEPLOY_USERNAME,
      password: process.env.DEPLOY_PASSWORD,
      showProgress: true,
      srcBasePath: 'dist',
      createDirectories: true
    }
  }
};
