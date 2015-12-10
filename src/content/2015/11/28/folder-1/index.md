---

title: Javascript loading, execution-order and performance
name: example-28
author: Sebastian Misch
tldr:
  The goal is to load three external Javascript-files, each 140k in size,
  each taking several seconds to process using different methods of embedding -
  and to monitor the impact on execution-order, page-load time, performance
  and user-experience.
layout: article

---

# Javascript loading, execution-order and performance


## Experiment
The goal is to load three external Javascript-files, each 140k in size,
each taking several seconds to process using different methods of embedding -
and to monitor the impact on execution-order, page-load time, performance
and user-experience.

Check out the experiment at [github.com/nerds-of-all-trades/experiments-script-loading](https://github.com/nerds-of-all-trades/experiments-script-loading)


## Loading Javascripts the 90ies way
The usual approach for embedding Javascript-files into a web-page
is to load them in the `HEAD` section of the HTML-document, like
`import`-statements in a Java-class.

We have all done this before.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script>
      console.time('page-load');
      console.time('first-impression');
      console.log('Experiment: Loading scripts the 90ies way');
    </script>
    <script src="1.js"></script>
    <script src="2.js"></script>
    <script src="3.js"></script>
  </head>
  <body>
    <h1>Loading scripts the 90ies way</h1>
    <script>
      window.onload = function() {
        console.timeEnd('page-load');
      }
      console.timeEnd('first-impression');
    </script>
  </body>
</html>
```

This setup takes about 7 seconds to load to finally display the
heading 'Loading scripts the 90ies way'.
Several seconds to display just a single headline? This is out of
the question.

To dive further into what happens the developer tools of the browser come into place.

![Loading javascripts the 90ies way](assets/exp_0.png)

So, what happened? Opening the page will start the browser's spinner
(or progress bar). Nothing is displayed for about 7 seconds.
The developer tools tell us why.

- The browser downloads the `index_0.html`.
- After parsing the Javascript-files' download starts. Modern
  browsers are able to download up to 16 files at the
  same time.
- Each Javascript-file is executed and processed (approx. 2secs)
  sequentially (see browser's console).
- After 7secs the Javascript is processed, the browser displays the
  body and fires the `onload`-event.
- The browser`s spinner stops.

So embedding Javascripts in the `HEAD`-section seems to block
rendering of the document. But why?

Take a minute and think about it. Javascript is able to manipulate
the page's DOM (create, change, remove content), redirect or alike.
The browser is not able to render the page, as long as the Javascript-file is not fully downloaded, parsed and processed.

Loading javascripts like this is potentially a bad idea. Your
website's visitors will have to wait for something, that's not even
visible or of concern to the content of the page itself.


## Loading Javascripts in the body
The #1 advice often found on the web is to load scripts in the `BODY`-section. If you are just initializing
some things in your script and asset size is just a few kilobytes this is fine and will not noticably harm your page performance.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script>
      console.time('page-load');
      console.time('first-impression');
      console.log('Experiment: Loading scripts in the body')
    </script>
  </head>
  <body>
    <h1>Loading scripts in the body</h1>
    <script src="1.js"></script>
    <script src="2.js"></script>
    <script src="3.js"></script>
    <script>
      window.onload = function() {
        console.timeEnd('page-load');
      }
      console.timeEnd('first-impression');
    </script>
  </body>
</html>
```

Bummer: This experiments' scripts do heavy processing. Though the loading of scripts in the
`BODY`-section does not block
rendering - the spinner/ progressbar keeps running until all javascript is processed.

So just loading scripts in the body is not always the recipe for edge performance and user experience.

![Loading Javascripts in the body](assets/exp_1.png)

This technique is negligible faster (~500ms in context of this experiment) than loading the script in the
`HEAD`-section.

7secs to finish loading is way too long.


## Loading Javascripts asynchronously in the body

HTML5 allows to load scripts asynchronously by using the `async`-attribute.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script>
      console.time('page-load');
      console.time('first-impression');
      console.log('Experiment: Loading scripts asynchronously in the body')
    </script>
  </head>
  <body>
    <h1>Loading scripts asynchronously in the body</h1>
    <script src="1.js" async></script>
    <script src="2.js" async></script>
    <script src="3.js" async></script>
    <script>
      window.onload = function() {
        console.timeEnd('page-load');
      }
      console.timeEnd('first-impression');
    </script>
  </body>
</html>
```

But how does it work? The browser loads all three scripts in paralell. Though
most modern browsers do asynchronous loading out of the box even without using the
`async`-attribute, there is a big impact when using the `async`-attribute:

*Execution order not guaranteed.*

This means that the second script may be processed
before finishing the first script. Lacking execution order means you must not
have any dependencies between your single scripts.

![Loading Javascripts asynchronously in the body](assets/exp_2.png)

The asynchronous loading technique makes our site interact after milliseconds (8ms first-impression). The browsers spinner keeps spinning for another 7
seconds. Why? The scripts are loaded in paralell (this is good), but javascript is single-threaded. So the browser processes each script in line, one after one, in random order.


## Loading Javascripts asynchronously via script
Whenever you use 3rd-party plugins like Facebook-Like, Disqus or alike you are familiar with another script loading technique: Dynamic injection.

A single (often inline-) script injects a `SCRIPT`-tag into the DOM and
forces the browser to *lazy-load* the demanded javascript-files.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script>
      console.time('page-load');
      console.time('first-impression');
      console.log('Experiment: Loading scripts asynchronously via script')
    </script>
  </head>
  <body>
    <h1>Loading scripts asynchronously via script</h1>

    <script>
      ['1', '2', '3'].forEach(function(script) {
        var sct = window.document.createElement('script');
        sct.type = 'text/javascript';
        sct.async = true;
        sct.src = script + '.js';
        (window.document.getElementsByTagName('script')[0]).appendChild(sct);
      });
    </script>

    <script>
      window.onload = function() {
        console.timeEnd('page-load');
      }
      console.timeEnd('first-impression');
    </script>
  </body>
</html>
```

This best-practice-technique does not block browser rendering.

![Loading Javascripts asynchronously via script](assets/exp_3.png)

Considering the test results there is no big difference to performance than
loading scripts in the `BODY`-section. Why? It's nearly the same approach, -
but in Javascript.

The site is display immediately, the site is interacting but the browser's spinner keeps spinning for another 7secs. Damn it.

## Loading Javascripts asynchronously via script after onload
Your website visitor is nearly happy. Now let's turn that spinner of.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script>
      console.time('page-load');
      console.time('first-impression');
      console.log('Experiment: Loading scripts asynchronously via script after onload')
    </script>
  </head>
  <body>
    <h1>Loading scripts asynchronously via script after onload</h1>

    <script>
      window.onload = function() {
        console.timeEnd('page-load');

        ['1', '2', '3'].forEach(function(script) {
          var sct = window.document.createElement('script');
          sct.type = 'text/javascript';
          sct.async = true;
          sct.src = script + '.js';
          (window.document.getElementsByTagName('script')[0]).appendChild(sct);
        });
      };
    </script>

    <script>
      console.timeEnd('first-impression');
    </script>
  </body>
</html>
```

By adapting the dynamic injection technique and attaching it to the browsers
`onload`-event the loading task is started *after* the initial page load.
This means: The spinner stops and the website visitor does not expect more to
come. This is a trick. No expectation -> no need to hurry.

![Loading Javascripts asynchronously via script after onload](assets/exp_4.png)

Finally: The site is displayed, interacts and the browser's
spinner stops immediately (~9ms).

Wooohooo.


## Comparison
As you can see in the below comparison just loading your scripts asynchronously (as
stated in dozens of best-practices around the web) may be not enough to speed up
your website. It depends on the scripts you load.

| Tactic                                                     | Page-Load Event | First Impression |
| ---------------------------------------------------------- | ---------------:| ----------------:|
| Loading Loading Javascripts the 90ies way                  |         7.500ms |          7.500ms |
| Loading Javascripts in the body                            |         7.000ms |          7.000ms |
| Loading Javascripts asynchronously in the body             |         7.200ms |              8ms |
| Loading Javascripts asynchronously via script              |         6.800ms |              9ms |
| Loading Javascripts asynchronously via script after onload |             9ms |              8ms |


## Conclusion
Loading external scripts can be a hazzle. A good starting point is the
**< 30ms** rule of thumb:

*Fix it if your user has to wait for more than 30 milliseconds!*

Consider:
- No scripts in the `HEAD-section` (NEVER)
- Build your scripts to be not dependant on other scripts (or make them wait for each other)
- Don't do hardcore processing inline (use webworkers or at least external scripts)
- Lazy-load scripts asynchronously after the `onload`-event
