[![Build Status](https://api.travis-ci.org/nerds-of-all-trades/nerdsofalltrad.es.svg?branch=master)](https://travis-ci.org/nerds-of-all-trades/nerdsofalltrad.es)

# The nerdsofalltrad.es website
live at http://nerdsofalltrad.es - feel free to use for your own blog-alike website.

```
$ npm install
$ nginxere # available at https://github.com/sbstnmsch/nginxere
           # or just serve ./dist with your favorite webserver
```

## Development
To watch your sources and rebuild automatically type:
```
$ npm start
```
Open http://localhost:3000 with your favorite browser.

## Production builds and CDNs
If you love to use a CDN for your assets just configure one and build site with:
```
$ CDN=http://mycdnzone.cdnprovider.com grunt
```
All javascripts and stylesheets will be served by your chosen CDN.
That's all to it.
