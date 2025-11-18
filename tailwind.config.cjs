/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind deve procurar classes CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos React
  ],
  
  // Tema: personalização de cores, fontes, espaçamentos, etc.
  theme: {
    extend: {
      // Adicione customizações aqui se precisar
      colors: {
        // Exemplo: 'brand': '#FF5733',
      },
    },
  },
  
  // Plugins: extensões do Tailwind
  plugins: [],
}
