import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const host = env.SERVER_HOST;
    const isProduction = mode === 'production';

    console.log(`Mode: ${mode}`);
    console.log(`isProduction: ${isProduction}`);
    console.log(`Server Host: ${host}`);

    return {
        server: isProduction
            ? undefined
            : {
                  host,
                  port: 5174,
                  hmr: { host },
                  https: {
                      key: readFileSync(env.SERVER_HTTPS_KEY),
                      cert: readFileSync(env.SERVER_HTTPS_CERT),
                  },
                  cors: true,
              },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
    };
});
