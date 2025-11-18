# Erros Comuns e Soluções - TalentMatch

## 1. Erro do PostCSS/Tailwind

### Problema
\`\`\`
[postcss] Cannot find module '@tailwindcss/postcss'
\`\`\`

### Causa
O Vite estava tentando carregar um arquivo `postcss.config.mjs` da raiz que tinha configuração de Tailwind v4.

### Solução
O arquivo foi removido! O projeto client NÃO usa Tailwind CSS, usa CSS puro.

Se o erro persistir:
1. Certifique-se de estar na pasta `client`: `cd client`
2. Delete o arquivo `postcss.config.mjs` da raiz se ainda existir
3. Execute: `npm install`
4. Execute: `npm run dev`

---

## 2. Erro "Cannot GET /api/..."

### Problema
\`\`\`
Cannot GET /api/login
Cannot GET /api/register
\`\`\`

### Causa
O backend (servidor) não está rodando.

### Solução
1. Abra um terminal
2. `cd server`
3. `npm install` (primeira vez)
4. `npm run dev`
5. Verifique se aparece: "Servidor rodando na porta 3000"

---

## 3. Erro "EADDRINUSE: address already in use"

### Problema
\`\`\`
Error: listen EADDRINUSE: address already in use :::3000
\`\`\`

### Causa
Já existe um servidor rodando na porta 3000.

### Solução

**Windows:**
\`\`\`bash
# Encontrar processo usando a porta 3000
netstat -ano | findstr :3000

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
\`\`\`

**Linux/Mac:**
\`\`\`bash
# Encontrar e matar processo na porta 3000
lsof -ti:3000 | xargs kill -9
\`\`\`

**Ou simplesmente:**
Mude a porta no `server/server.js`:
\`\`\`javascript
const PORT = 3001; // Era 3000
\`\`\`

---

## 4. Erro "Network Error" no login

### Problema
Login não funciona, aparece erro de rede no console.

### Causa
Frontend não consegue se conectar ao backend.

### Solução
1. Verifique se o backend está rodando: http://localhost:3000
2. Verifique o proxy no `client/vite.config.js`:
\`\`\`javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Deve apontar para o backend
      changeOrigin: true
    }
  }
}
\`\`\`
3. Verifique CORS no `server/server.js`:
\`\`\`javascript
app.use(cors({
  origin: 'http://localhost:5173' // Deve apontar para o frontend
}))
\`\`\`

---

## 5. Erro "Module not found"

### Problema
\`\`\`
Error: Cannot find module 'express'
Error: Cannot find module 'react'
\`\`\`

### Causa
Dependências não instaladas.

### Solução
\`\`\`bash
# No backend
cd server
rm -rf node_modules
npm install

# No frontend
cd client
rm -rf node_modules
npm install
\`\`\`

---

## 6. Página em branco após login

### Problema
Login funciona mas a página de candidatos está vazia.

### Causa
Token não está sendo salvo ou não está sendo enviado nas requisições.

### Solução
1. Abra o DevTools (F12)
2. Vá em "Application" → "Local Storage"
3. Verifique se existe uma chave "token"
4. Se não existe, o login não está salvando o token
5. Veja o console para erros
6. Verifique o AuthContext (client/src/context/AuthContext.jsx)

---

## 7. Senha incorreta sempre

### Problema
Mesmo com senha correta, aparece "senha incorreta".

### Causa
Pode ser problema na criptografia ou banco de dados.

### Solução
1. Delete o arquivo `server/database.db`
2. Reinicie o servidor: `npm run dev`
3. Cadastre um novo usuário
4. Tente fazer login novamente

---

## 8. Erro de CORS

### Problema
\`\`\`
Access to XMLHttpRequest has been blocked by CORS policy
\`\`\`

### Causa
Backend não está configurado para aceitar requisições do frontend.

### Solução
No `server/server.js`, adicione/verifique:
\`\`\`javascript
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
\`\`\`

---

## 9. Banco de dados travado

### Problema
\`\`\`
SQLITE_BUSY: database is locked
\`\`\`

### Causa
Outro processo está usando o banco de dados.

### Solução
1. Pare o servidor (Ctrl+C)
2. Feche qualquer programa que esteja acessando o banco
3. Se persistir, delete `server/database.db` (vai perder os dados)
4. Reinicie o servidor

---

## 10. Vite não inicia

### Problema
\`\`\`
Failed to load config from vite.config.js
\`\`\`

### Causa
Configuração do Vite incorreta ou dependências faltando.

### Solução
1. Verifique se está na pasta `client`
2. Execute: `npm install vite @vitejs/plugin-react --save-dev`
3. Verifique o arquivo `client/vite.config.js`:
\`\`\`javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
\`\`\`

---

## Checklist de Depuração

Quando algo não funcionar, siga esta ordem:

1. [ ] Backend está rodando? (http://localhost:3000)
2. [ ] Frontend está rodando? (http://localhost:5173)
3. [ ] `npm install` foi executado em ambas as pastas?
4. [ ] Há erros no terminal do backend?
5. [ ] Há erros no terminal do frontend?
6. [ ] Há erros no console do navegador (F12)?
7. [ ] As portas 3000 e 5173 estão livres?
8. [ ] O arquivo database.db existe na pasta server?

---

## Comandos de Emergência

### Resetar Tudo
\`\`\`bash
# Backend
cd server
rm -rf node_modules package-lock.json database.db
npm install
npm run dev

# Frontend (novo terminal)
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
\`\`\`

### Ver Logs Detalhados
\`\`\`bash
# Backend com logs
cd server
npm run dev

# Frontend com logs
cd client
npm run dev -- --debug
\`\`\`

### Testar API Manualmente
\`\`\`bash
# Teste se o backend está respondendo
curl http://localhost:3000/api/test

# Ou abra no navegador
http://localhost:3000/api/test
\`\`\`

---

## Precisa de Mais Ajuda?

1. Leia o arquivo `INSTALACAO_RAPIDA.md`
2. Leia o arquivo `README_COMPLETO.md`
3. Verifique os comentários no código
4. Pesquise o erro no Google
5. Pergunte para alguém com mais experiência

**Dica**: Sempre copie a mensagem de erro completa ao pedir ajuda!
