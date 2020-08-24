const jsdom = require("jsdom");
const request = require("request");

const { JSDOM } = jsdom;
const requestDecorator = callback => request(process.env.DECORATOR_EXTERNAL_URL, callback);

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const prop = "innerHTML";

        resolve(setTemplate(document.getElementById("scripts")[prop],
            document.getElementById("styles")[prop],
            document.getElementById("skiplinks")[prop],
            document.getElementById("header-withmenu")[prop],
            document.getElementById("footer-withmenu")[prop]));
      } else {
        reject(new Error(error));
      }
    };
    if (process.env.DECORATOR_EXTERNAL_URL) {
      requestDecorator(callback);
    } else {
      resolve(setTemplate(`<script src="${process.env.DECORATOR_INTERNAL_SCRIPT}"></script>`,
          `<link rel="stylesheet" href="${process.env.DECORATOR_INTERNAL_STYLING}"/>`,
          '', '', ''));
    }
  });

const setTemplate = (script, style, skiplinks, heading, footer) => ({
  NAV_SCRIPTS: script,
      NAV_STYLES: style,
      NAV_SKIPLINKS: skiplinks,
      NAV_HEADING: heading,
      NAV_FOOTER: footer,
});

module.exports = getDecorator;
