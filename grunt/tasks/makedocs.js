var
  ext = '.makedocs.tmp',
  Handlebars = require('handlebars'), // Mustache with recursive templates
  fs = require('fs'),
  paths = require('../options/paths.json');

module.exports = function(grunt) {
  return {
    default: {
      files: [
        {
          expand: true,
          cwd: paths.src.content,
          src: '**/*.md',
          dest: 'dist',
          ext: '.html' + ext
        }
      ],
      options: {
        layoutsDir: paths.src.layouts,
        partialsDir: paths.src.templates,
        componentsDir: paths.src.templates,
        build: true,
        nav: function(pages) {
          var
            html = fs.readFileSync(paths.src.layouts + '/index.mustache', 'utf-8').toString();

          Handlebars.registerPartial(
            'header',
            fs.readFileSync(paths.src.templates + '/header.html', 'utf-8').toString()
          );
          Handlebars.registerPartial(
            'index',
            fs.readFileSync(paths.src.templates + '/index.html', 'utf-8').toString()
          );
          Handlebars.registerPartial(
            'footer',
            fs.readFileSync(paths.src.templates + '/footer.html', 'utf-8').toString()
          );

          for (var i = 0; i < pages.length; ++i) {
            pages[i].url = pages[i].dest.substring(pages[i].dest.indexOf('/dist/') + 6);
            pages[i].url = pages[i].url.substring(0, pages[i].url.indexOf('/index.html'));
          }

          grunt.file.write(
            paths.dist.default + '/index.html' + ext,
            Handlebars.compile(html)({
              pages: pages,
              title: 'Next-generation frontend engineering'
            })
          );
        }
      }
    }
  };
};
