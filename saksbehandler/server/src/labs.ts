import express, { Express } from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

export async function startLabs(server: Express) {
    const page = path.resolve(__dirname, '../build', 'index.html');

    try {
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup routes
        server.get('/isAlive', (_, res) => {
            res.send('Alive');
        });
        server.get('/isReady', (_, res) => {
            res.send('Ready');
        });

        server.use(express.static(path.join(__dirname, '../build')));

        server.use(
            '/api',
            createProxyMiddleware({
                target: 'http://tiltak-refusjon-api-labs/api',
                changeOrigin: true,
                on: {
                    proxyReq: (proxyReq, req, res) => {
                        const cookies = req.headers?.cookie?.split(';');
                        const cookieWithFakeToken = cookies?.filter((c) => c.includes('aad-token'));
                        if (!cookieWithFakeToken?.length) {
                            res.writeHead(401);
                            res.end();
                            return;
                        }
                        const accessToken = cookieWithFakeToken[0].split('=')[1];
                        proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
                    },
                },
            })
        );

        server.use('/logout', (_, res) => {
            res.clearCookie('aad-token');
            res.redirect('/');
        });

        server.get('/*', (_, res) => {
            res.status(200);
            res.sendFile(page);
        });

        const port = 3000;
        server.listen(port, () => console.info(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}
