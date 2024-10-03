const config = require('../config');
const authUtils = require('../auth/utils');
const { createProxyMiddleware } = require('http-proxy-middleware');

const setup = (router, authClient, tokenEndpoint) => {
    router.use(
        '/modiacontextholder',
        async (req, res, next) => {
            try {
                const accessToken = await authUtils.getOnBehalfOfAccessToken(
                    authClient,
                    tokenEndpoint,
                    req,
                    config.envVar({ name: 'MODIA_CONTEXT_HOLDER_SCOPE', required: false })
                );
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: 'http://modiacontextholder.personoversikt/modiacontextholder',
            followRedirects: false,
            changeOrigin: true,
        })
    );

    router.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(config.decorator().host + req.originalUrl.replace('/internarbeidsflatedecorator', ''));
    });
};

module.exports = { setup };
