import {JSDOM} from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body>Hello world</body></html>`, {
    url: 'https://some.dum.site'
});
// (global as any).window = dom.window;
global.localStorage = dom.window.localStorage
global.sessionStorage = dom.window.sessionStorage
