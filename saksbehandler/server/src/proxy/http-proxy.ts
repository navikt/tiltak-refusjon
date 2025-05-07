import tunnel from 'tunnel';

import * as config from '../config';
import logger from '../logger';

export default () => {
    const proxyUri = config.server().proxy;
    if (proxyUri) {
        logger.info(`Proxying requests via ${proxyUri} for openid-client`);
        const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
        return tunnel.httpsOverHttp({
            proxy: {
                host: hostPort[0],
                port: hostPort[1],
            },
        });
    } else {
        logger.info(`Environment variable HTTP_PROXY is not set, not proxying requests for openid-client`);
        return null;
    }
};
