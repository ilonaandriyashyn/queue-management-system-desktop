import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  plugins: [react()],
  // @ts-ignore
  test: {
    environment: 'jsdom',
  }
})
