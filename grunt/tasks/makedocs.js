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
        nav: function(pages, done) {
          return new Promise(function() {
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

            // Read authors from file or twitter
            resolveAuthors(grunt, pages)
              .then(authors => {
                for (var i = 0; i < pages.length; ++i) {
                  pages[i].url = pages[i].dest.substring(pages[i].dest.indexOf('/dist/') + 6);
                  pages[i].url = pages[i].url.substring(0, pages[i].url.indexOf('/index.html'));
                  pages[i].date = pages[i].url.substring(0, 10).replace(/\//g, '-');
                  pages[i].displayDate = pages[i].url.substring(0, 10);
                  pages[i].author = authors[pages[i].author];
                }
                grunt.file.write(
                  paths.dist.default + '/index.html' + ext,
                  Handlebars.compile(html)({
                    pages: pages.filter((page) => { return !page['no-index']; }).reverse(),
                    author: {
                      name: 'Blog with a Pull Request',
                      url: '/blog-with-a-pull-request'
                    },
                    title: 'Next-generation frontend engineering',
                    tldr: 'Open-Source blog about next-generation frontend engineering',
                    tags: 'Javascript, ES6, ECMAScript, Nginx, Continuous, Integration, Delivery'
                  })
                );
                done(pages);
              })
              .catch(() => {
                done([]);
              }) ;
          });
        }
      }
    }
  };
};


function resolveAuthors(grunt, pages, done) {
  var
    authors = {},
    authorsToResolve = [],
    pageAuthors = [];

  try {
    authors = require('../../.authors.json');
  } catch (e) {
    authors = {};
  }

  for (var i = 0; i < pages.length; ++i) {
    if (pageAuthors.indexOf(pages[i].author) === -1) {
      pageAuthors.push(pages[i].author);
    }
    if (!authors[pages[i].author]) {
      if (authorsToResolve.indexOf(pages[i].author)) {
        grunt.log.writeln(`Author ${pages[i].author.cyan} unkown.`);
        authorsToResolve.push(pages[i].author);
      }
    }
  }
  if (! authorsToResolve.length) {
    return new Promise(resolve => {
      resolve(authors);
    });
  }

  // Try resolving via twitter
  return new Promise((resolve, reject) => {
    var
      client,
      twitterError = () => {
        grunt.file.write(
          '.authors.json',
          JSON.stringify(
            pageAuthors
              .map(author => {
                return {
                  handle: author,
                  name: author,
                  avatar: '',
                  url: `https://twitter.com/${author}`
                }
              })
              .reduce((result, currentItem) => {
                result[currentItem.handle] = currentItem;
                return result;
              }, {}),
          null, 2)
        );
        grunt.log.error(`Could not connect to twitter for resolving authors:

          ${authorsToResolve}

          Please check if you have the following environment variables set and valid:
          - TWITTER_CONSUMER_KEY
          - TWITTER_CONSUMER_SECRET
          - TWITTER_ACCESS_TOKEN_KEY
          - TWITTER_ACCESS_TOKEN_SECRET

          I created a .authors.json for you. Just fill it out and restart the
          build.
        `);
        grunt.log.writeln(`Created ${'.authors.json'.cyan}.`);
      };

    if (!process.env.TWITTER_CONSUMER_KEY ||
        !process.env.TWITTER_CONSUMER_SECRET ||
        !process.env.TWITTER_ACCESS_TOKEN_KEY ||
        !process.env.TWITTER_ACCESS_TOKEN_SECRET) {
      twitterError(authorsToResolve);
      reject();
    } else {
      client = require('twitter')({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });

      client.get('users/lookup', { screen_name: authorsToResolve.join() },
        function(error, data) {
          if (!error && data && data.length) {
            var
              authorsResolved = data
                .map(author => {
                  return {
                    handle: author.screen_name,
                    name: author.name,
                    avatar: author.profile_image_url_https,
                    url: `https://twitter.com/${author.screen_name}`
                  }
                })
                .reduce((result, currentItem) => {
                  grunt.log.writeln(`Author ${currentItem.handle.cyan} identified.`);
                  result[currentItem.handle] = currentItem;
                  return result;
                }, {});
            authorsResolved = Object.assign(authorsResolved, authors);
            grunt.file.write('.authors.json', JSON.stringify(authorsResolved, null, 2));
            resolve(authorsResolved);
          } else {
            twitterError(authorsToResolve);
            reject();
          }
        });
      }
    })
  }
