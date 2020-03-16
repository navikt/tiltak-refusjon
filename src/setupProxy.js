const proxy = require('http-proxy-middleware');
const whitelist = require('./whitelist');

const brukLokalLogin = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ON_HEROKU === 'true';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER
};

module.exports = function(app) {

    const proxyConfig = {
        changeOrigin: true,
        pathRewrite: whitelist,
        target: envProperties.APIGW_URL,
        xfwd: true,
    };

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER,
        };
    }

    app.use('/refusjon', proxy(proxyConfig));
};
