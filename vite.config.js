import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
      lib: {
        entry: resolve('./resources/js/field.js'),
        name: 'FroalaField',
        fileName: 'froala-field'
      },
      rollupOptions: {
        external: ['vue', 'laravel-nova', 'froala-editor'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
  }
});
