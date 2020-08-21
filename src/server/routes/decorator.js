const jsdom = require("jsdom");
const request = require("request");

const { JSDOM } = jsdom;
let url = process.env.DECORATOR_INTERNAL_URL;

const requestDecorator = callback => request(url, callback);

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const prop = "innerHTML";

        const data = {
          NAV_SCRIPTS: document.getElementById("scripts")[prop],
          NAV_STYLES: document.getElementById("styles")[prop],
          NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
          NAV_HEADING: document.getElementById("header-withmenu")[prop],
          NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
          NAV_MENU_RESOURCES: document.getElementById("megamenu-resources")[
            prop
          ]
        };
        resolve(data);
      } else {
        reject(new Error(error));
      }
    };
    if (process.env.DECORATOR_EXTERNAL_URL) {
      requestDecorator(callback);
    }else {
      const data = {
        NAV_SCRIPTS: `<script src="${process.env.DECORATOR_INTERNAL_SCRIPT}"/>`,
        NAV_STYLES:  `<link rel=“stylesheet” href="${process.env.DECORATOR_INTERNAL_STYLING}"/>`,

      };
      resolve(data);
    }
  });

module.exports = getDecorator;
