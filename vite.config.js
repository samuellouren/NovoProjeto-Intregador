import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // Plugin do React para suportar JSX e Fast Refresh
  plugins: [react()],
  
  // Configuração do servidor de desenvolvimento
  server: {
    port: 5173, // Porta onde o frontend vai rodar
    
    // Proxy: redireciona requisições para o backend
    // Quando o frontend chama "/api/qualquercoisa", 
    // o Vite redireciona para "http://localhost:3000/api/qualquercoisa"
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL do backend
        changeOrigin: true, // Necessário para evitar erros de CORS
        secure: false // Permite conexões HTTP (não apenas HTTPS)
      }
    }
  },
  
  // Resolve: ajuda o Vite a encontrar os arquivos
  resolve: {
    // Alias: atalhos para importar arquivos
    // Exemplo: import Button from '@/components/Button'
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // CSS: configuração para processar estilos
  css: {
    // PostCSS: ferramenta para transformar CSS
    postcss: {
      plugins: [
        // Tailwind CSS v3 (compatível com Vite)
        // Nota: o Tailwind v4 requer configuração diferente
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
})
