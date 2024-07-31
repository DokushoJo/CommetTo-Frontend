import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

process.env = { ...process.env, ...loadEnv("production", process.cwd()) };
const PORT = process.env.VITE_APP_PORT;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: parseInt(PORT),
  },
})
