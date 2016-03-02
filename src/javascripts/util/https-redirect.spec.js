import test from 'tape';
import HttpsRedirect from './https-redirect';
import WindowMock from 'window-mock';
import {name} from '../../../package.json';

test(`${name}: https redirect feature`, (t) => {
  let
    windowMock = new WindowMock();

  windowMock.location.href = 'http://localhost:3000/someurl'
  new HttpsRedirect(windowMock);
  t.equal(windowMock.location.href, 'http://localhost:3000/someurl', 'should not redirect from localhost');

  windowMock.location.href = 'http://domain.tld/someurl'
  new HttpsRedirect(windowMock);
  t.equal(windowMock.location.href, 'https://domain.tld/someurl', 'should redirect to https');

  t.end();
});
