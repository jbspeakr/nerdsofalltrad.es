class HttpsRedirect {

  constructor(_window = { location: { href: '' }}) {
    let url = _window.location.href;

    if (!url.includes('//localhost')) {
      _window.location.href = url.replace(/^http:/, 'https:');
    }
  }
}

export default HttpsRedirect;
