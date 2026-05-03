import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          fleuriste: path.resolve(__dirname, 'fleuriste.html'),
          pompes: path.resolve(__dirname, 'pompes-funebres.html'),
          mentions: path.resolve(__dirname, 'mentions-legales.html'),
          politique: path.resolve(__dirname, 'politique-confidentialite.html'),
          accessibilite: path.resolve(__dirname, 'accessibilite.html'),
          error: path.resolve(__dirname, '404.html')
        }
      }
    }
  };
});
