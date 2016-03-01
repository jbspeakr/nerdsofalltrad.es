module.exports = {
  default: {
    // options: {
    //   code: '123'
    // },
    // Verification code is read from process.env.GOOGLE_SITE_VERIFICATION
    // which is configured in Travis-CI
    dest: '<%= paths.dist.default %>'
  }
};
