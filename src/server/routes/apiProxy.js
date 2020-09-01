const { createProxyMiddleware } = require("http-proxy-middleware");
const paths = require("../../paths");

module.exports = function(app) {
  const proxyConfig = {
    target: "http://localhost:8080"
  };

  app.use(paths.apiPath, createProxyMiddleware(proxyConfig));
};
