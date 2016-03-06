[![Build Status](https://api.travis-ci.org/nerds-of-all-trades/nerdsofalltrad.es.svg?branch=master)](https://travis-ci.org/nerds-of-all-trades/nerdsofalltrad.es)

# The https://nerdsofalltrad.es blog
> The nerdsofalltrad.es website is a blog about next-generation
> frontend engineering.
> If you have an article to contribute just pull-request.

## How to blog
All articles are markdown files living in `src/content/`.
Fork and pull-request to add your own article. Once merged it's
automatically live at https://nerdsofalltrad.es a few moments
later.

Your article markdown file should look like this:
```markdown
---

title: Title of your article
name: REST-like name of your article, i.e. my-first-article
author: your twitter handle, i.e. sebastianmisch
tldr:
  A short desciption of your article. This one is diplayed on
  the index page
layout: article

---

Your article written in markdown...

## A sub heading
- a list item

...

```
Your _twitter handle_ is used for authorship. The magic
deployment will automatically resolve it against twitter to
get your name, website and avatar image.

## Development
```
$ npm i
$ nginxere # available at https://github.com/sbstnmsch/nginxere
           # or just serve ./dist with your favorite webserver
```
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
