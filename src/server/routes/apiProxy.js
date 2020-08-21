const proxy = require('http-proxy-middleware');
const paths = require('../../paths');

const pathRewrite = {};
pathRewrite['^' + paths.apiPath] = '/tiltak-refusjon-api';
module.exports = function(app) {
    const proxyConfig = {
        changeOrigin: true,
        target: process.env.APIGW_URL || 'http://localhost:8080',
        pathRewrite,
        xfwd: true,
    };

    app.use(paths.apiPath, proxy(proxyConfig));
};
