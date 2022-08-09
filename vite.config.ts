import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
  ],
  base: baseUrl[mode],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      'src': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 1024,
    // 是否开启 https
    proxy: {
      '/api': {
        target: 'https://v.qq.com/x/cover',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/music': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music/, '')
      },
      '/mulu': {
        target: 'https://pbaccess.video.qq.com/trpc.universal_backend_service.page_server_rpc.PageServer',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music/, '')
      }
    }
  }
})
