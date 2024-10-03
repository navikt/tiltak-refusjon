import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
const axios = require('axios');

// https://vitejs.dev/config/
export default defineConfig({
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
    plugins: [react(), svgr()],

    server: {
        port: 3000,
        proxy: {
            '/api': { target: 'http://localhost:8081', changeOrigin: true },
            '/internarbeidsflatedecorator': {
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/internarbeidsflatedecorator/, ''),
                target: 'http://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist',
            },
            '/modiacontextholder/api/decorator': {
                target: 'http://localhost:8081',
                bypass(req, res, options) {
                    axios
                        .get('http://localhost:8081/api/saksbehandler/innlogget-bruker', {
                            headers: req.headers,
                        })
                        .then(
                            (response) => {
                                res.end(JSON.stringify({ ...response.data, ident: response.data.identifikator || '' }));
                            },
                            (error) => {
                                res.end(JSON.stringify({ authenticated: false }));
                            }
                        );
                },
            },
        },
    },
});
