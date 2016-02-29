var
    _postcssCssNextProcessor = require('postcss-cssnext')(),
    _postcssCustomPropertiesProcessor = require('postcss-custom-properties')(),
    _postcssCustomMediaProcessor = require('postcss-custom-media')(),
    _postcssImportProcessor = require('postcss-import')(),
    _postcssAssetsProcessor = require('postcss-assets')({
      loadPaths: ['src/']
    }),
    _postcssNestedProcessor = require('postcss-nested')(),
    _postcssSvgProcessor = require('postcss-svg')({
      ei: { defaults: '[fill]: black' }
    }),
    _autoprefixerProcessor = require('autoprefixer')({
      browsers: [
        'last 3 Android versions',
        'last 4 iOS versions',
        'last 5 Chrome versions',
        'last 8 ChromeAndroid versions',
        'last 4 ExplorerMobile versions',
        'last 5 FirefoxAndroid versions'
      ]
    }),
    _cssNanoProcessor = require('cssnano')(),
    _processors = [
      _postcssCustomPropertiesProcessor,
      _postcssCustomMediaProcessor,
      _postcssImportProcessor,
      _postcssNestedProcessor,
      _postcssSvgProcessor,
      _postcssAssetsProcessor,
      _postcssCssNextProcessor,
      _autoprefixerProcessor,
      _cssNanoProcessor
    ];

module.exports = {
  critical: {
    options: {
      map: false,
      processors: _processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/critical.min.css':
        '<%= paths.src.stylesheets %>/critical.css'
    }
  },
  app: {
    options: {
      map: false,
      processors: _processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/app.min.css':
        '<%= paths.src.stylesheets %>/app.css'
    }
  },
  vendor: {
    options: {
      map: false,
      processors: _processors
    },
    files: {
      '<%= paths.dist.stylesheets %>/vendor.min.css': [
        '<%= paths.node_modules %>/highlightjs/styles/github.css'
      ]
    }
  }
};
