window.onload = () => {
  /* Lazy load app */

  [/*'app.min.css', */'vendor.min.css'].forEach((style) => {
    let sct = window.document.createElement('link');
    sct.rel = 'stylesheet';
    sct.async = true;
    sct.href = `${window.cdn}/assets/stylesheets/${style}`;
    (window.document.getElementsByTagName('head')[0]).appendChild(sct);
  });

  ['app.min.js'].forEach((script) => {
    let sct = window.document.createElement('script');
    sct.type = 'text/javascript';
    sct.async = true;
    sct.src = `${window.cdn}/assets/javascripts/${script}`;
    (window.document.getElementsByTagName('head')[0]).appendChild(sct);
  });
};
