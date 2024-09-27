import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, './src/') }],
    },
    define: {
        __API__: JSON.stringify('http://89.111.170.13/api'),
        IS_DEV: JSON.stringify(true),
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://89.111.170.13/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\//, ''),
            },
        },
    },
});
