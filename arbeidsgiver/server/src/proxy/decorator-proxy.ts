import axios from 'axios';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default (router: Router, mock = false) => {
    router.use('/dekoratoren/api/auth', async (req, res) => {
        if (mock) {
            {
                try {
                    const response = await axios.get(
                        'http://tiltak-refusjon-api-labs/api/arbeidsgiver/innlogget-bruker',
                        {
                            headers: req.headers,
                        }
                    );
                    res.json({ authenticated: true, name: response.data.identifikator || '' });
                } catch {
                    res.json({ authenticated: false });
                }
            }
        } else {
            res.json({ authenticated: true, name: '' });
        }
    });

    router.use('/dekoratoren/env', async (_, res) => {
        if (mock) {
            const response = await axios.get('https://www.nav.no/dekoratoren/env?context=arbeidsgiver&feedback=false');
            res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
        } else {
            try {
                const response = await axios.get(
                    `${process.env.DECORATOR_URL}/env?context=arbeidsgiver&feedback=false`
                );
                res.json({
                    ...response.data,
                    API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
                    APP_URL: '/dekoratoren',
                    LOGOUT_URL: '/logout',
                });
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        }
    });

    router.use(
        '/dekoratoren',
        createProxyMiddleware({
            target: mock ? 'https://www.nav.no' : 'https://www.nav.no/dekoratoren',
            changeOrigin: true,
        })
    );
};
