import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Split chunks for better caching — vendor libs separate from app code
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    ui: ['lucide-react', 'axios'],
                },
            },
        },
        // Minify aggressively
        minify: 'esbuild',
        terserOptions: {
            compress: {
                drop_console: true,  // Remove console.log in production
                drop_debugger: true,
            },
        },
        // Enable chunk size warnings
        chunkSizeWarningLimit: 500,
        // Asset inlining threshold (inline small assets as base64)
        assetsInlineLimit: 4096,
    },
    // Optimize deps for faster cold start in dev
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'axios', 'lucide-react'],
    },
})
