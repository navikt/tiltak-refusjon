import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    preview: {
        port: 3001,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            '~': path.resolve(__dirname, '../komponenter/src'),
        },
    },
    plugins: [react(), svgr()],

    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
    },

    server: {
        port: 3001,
        proxy: {
            '/api': { target: 'http://localhost:8081', changeOrigin: true },
            '/logout': {
                target: 'http://localhost:3001/',
                bypass(_, res) {
                    res?.setHeader('set-cookie', 'tokenx-token=; max-age=0');
                    res?.setHeader('set-cookie', 'aad-token=; max-age=0');
                    res?.writeHead(302, { Location: '/' });
                    res?.end();
                },
            },
        },
    },
});
