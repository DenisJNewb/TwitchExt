import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src', 'main.ts'),
                // second: resolve(__dirname, 'src', 'bonus.ts'),
            },
            output: {
                dir: resolve(__dirname, 'dist'),
                // [name] will be replaced by ts file name
                entryFileNames: '[name].js',
                // Optional: ensure shared code doesn't create extra files if not desired
                manualChunks: undefined,
            }
        },
    },
})
