import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src', 'main.ts'),
            },
            output: {
                dir: resolve(__dirname, 'dist'),
                entryFileNames: '[name].js'
            }
        },
    },
})