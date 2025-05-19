import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react({
            jsxImportSource: 'react', // Important per a React 17+
        }),
    ],
    build: {
        outDir: 'public/build', // Assegura't que coincideix
        manifest: true,
        emptyOutDir: true,
        rollupOptions: {
            input: 'resources/js/app.jsx'
        }
    }
});
