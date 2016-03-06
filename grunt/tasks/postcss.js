var
    postcssCssNextProcessor = require('postcss-cssnext')(),
    postcssCustomPropertiesProcessor = require('postcss-custom-properties')(),
    postcssCustomMediaProcessor = require('postcss-custom-media')(),
    postcssImportProcessor = require('postcss-import')(),
    postcssAssetsProcessor = require('postcss-assets')({
      loadPaths: ['src/']
    }),
    postcssNestedProcessor = require('postcss-nested')(),
    postcssSvgProcessor = require('postcss-svg')({
      ei: { defaults: '[fill]: black' }
    }),
    postcssSvgoProcessor = require('postcss-svgo')(),
    autoprefixerProcessor = require('autoprefixer')({
      browsers: [
        '> 3%'
      ]
    }),
    cssNanoProcessor = require('cssnano')(),
    processors = [
      postcssCustomPropertiesProcessor,
      postcssCustomMediaProcessor,
      postcssImportProcessor,
      postcssNestedProcessor,
      postcssSvgProcessor,
      postcssSvgoProcessor,
      postcssAssetsProcessor,
      postcssCssNextProcessor,
      autoprefixerProcessor,
      cssNanoProcessor
    ];

module.exports = {
  critical: {
    options: {
      map: false,
      processors: processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/critical.min.css':
        '<%= paths.src.stylesheets %>/critical.css'
    }
  },
  app: {
    options: {
      map: false,
      processors: processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/app.min.css':
        '<%= paths.src.stylesheets %>/app.css'
    }
  },
  fonts: {
    options: {
      map: false,
      processors: processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/fonts.min.css':
        '<%= paths.src.stylesheets %>/fonts.css'
    }
  },
  vendor: {
    options: {
      map: false,
      processors: processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/vendor.min.css': [
        '<%= paths.node_modules %>/highlightjs/styles/github.css'
      ]
    }
  }
};
