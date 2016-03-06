---

title: Blog with a Pull Request
name: blog-with-a-pull-request
author: sebastianmisch
tldr:
  The nerdsofalltrad.es website is a blog about next-generation frontend
  engineering. If you have an article to contribute just pull-request.
no-index: true
layout: article

---

The nerdsofalltrad.es website is a blog about next-generation frontend
engineering. If you have an article to contribute just pull-request.

<div class="box box--github">
  <span>
    Fork
    <a href="https://github.com/nerds-of-all-trades/nerdsofalltrad.es"
      target="github">github.com/nerds-of-all-trades/nerdsofalltrad.es</a>
    to add your own article.
  </span>
</div>

## How to blog at nerdsofalltrad.es
The nerdsofalltrad.es blog is an Open Source repository living at github.
Open the nerdsofalltrad.es-repository above and fork it. After that:

```bash
$ git clone https://github.com/<your-github-username>/nerdsofalltrad.es.git
$ cd nerdsofalltrad.es
$ git checkout -b my-new-article-branch
$ nvm use # or just use at least node 5
$ npm i
```

Now you are set up to add your article as a markdown file.

Create a folder `src/content/<year>/<month>/<day>/<rest-like-url>`.

Add an `index.md` file to it. This file will be your article and
should look like this:
```markdown
---

title: My first article about cats
name: REST-like name of your article, i.e. my-first-article-about-cats
author: your twitter handle, i.e. sebastianmisch
tldr:
  A brief description of your article. This one is displayed on
  the index page
layout: article

---

My contributed article written in markdown...

## A heading
- a list item

... etc.

```

Note: Your _twitter handle_ is used for authorship. The magic
deployment will automatically resolve it using the twitter api to
display your name, website and avatar image.

After finishing your article preview it:

```bash
$ grunt
$ nginxere # available at https://github.com/sbstnmsch/nginxere
           # or just serve ./dist with your favorite webserver
```

Open http://localhost:3000. Your article should be listed and hyperlinked
on the first page. If you are satisfied push it to your fork.

```bash
$ git add -A
$ git commit . -m 'Add new article about ... cats'
$ git push origin my-new-article-branch
```

Now open github and navigate to your nerdsofalltrad.es fork. Switch your
branch to `my-new-article-branch` and open a pull request.

Once merged in it's automatically published at https://nerdsofalltrad.es a
few moments later thanks to _travis-ci_ automated deployment.

Happy bloggin!
