require('dotenv/config');
const logger = require('./logger');

const envVar = ({ name, required = true }) => {
    if (!process.env[name] && required) {
        logger.error(`Missing required environment variable '${name}'`);
        process.exit(1);
    }
    return process.env[name];
};

const server = () => {
    return {
        host: envVar({ name: 'HOST', required: false }) || 'localhost', // should be equivalent to the URL this application is hosted on for correct CORS origin header
        port: envVar({ name: 'PORT', required: false }) || 3000,
        proxy: envVar({ name: 'HTTP_PROXY', required: false }), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
        sessionKey: envVar({ name: 'SESSION_KEY' }), // should be set to a random key of significant length for signing session ID cookies
        cookieName: 'tiltak-refusjon-session-id',
    };
};

const azureAd = () => {
    return {
        discoveryUrl: envVar({ name: 'AZURE_APP_WELL_KNOWN_URL' }),
        clientId: envVar({ name: 'AZURE_APP_CLIENT_ID' }),
        clientJwks: JSON.parse(envVar({ name: 'AZURE_APP_JWKS' })),
        openIdJwksUri: envVar({ name: 'AZURE_OPENID_CONFIG_JWKS_URI' }),
        redirectUri: envVar({ name: 'AAD_REDIRECT_URL' }),
        logoutRedirectUri: envVar({ name: 'AAD_LOGOUT_REDIRECT_URL' }),
        tokenEndpointAuthMethod: 'private_key_jwt',
        responseTypes: ['code'],
        responseMode: 'query',
        tokenEndpointAuthSigningAlg: 'RS256',
    };
};

const api = () => {
    logger.info(`Loading reverse proxy config from API_* [CLIENT_ID, URL]`);
    const scopes = envVar({ name: 'API_SCOPES', required: false });
    return {
        clientId: envVar({ name: 'API_CLIENT_ID' }),
        url: envVar({ name: 'API_URL' }),
        scopes: scopes ? scopes.split(',') : [],
    };
};

const decorator = () => {
    return {
        host: envVar({ name: 'DECORATOR_HOST' }),
    };
};

module.exports = {
    server,
    azureAd,
    api,
    decorator,
    envVar,
};
