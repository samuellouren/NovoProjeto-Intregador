# 🚀 Como Iniciar o Projeto TalentMatch

## Passo a Passo Completo

### 1️⃣ Instalar Dependências do Servidor

Abra um terminal na pasta raiz do projeto e execute:

\`\`\`bash
cd server
npm install
\`\`\`

**O que isso faz?** Instala todas as bibliotecas necessárias para o backend funcionar (Express, SQLite, bcrypt, etc).

---

### 2️⃣ Iniciar o Servidor Backend

Ainda na pasta `server`, execute:

\`\`\`bash
npm run dev
\`\`\`

**O que você deve ver:**
\`\`\`
🚀 Servidor rodando em http://localhost:3000
📡 API disponível em http://localhost:3000/api
✅ Health check: http://localhost:3000/health

📋 Rotas disponíveis:
   POST /api/register     - Cadastro de usuário
   POST /api/login        - Login de usuário
   GET  /api/users        - Listar usuários
   GET  /api/candidates   - Listar candidatos
   POST /api/candidates   - Adicionar candidato
   GET  /api/jobs         - Listar vagas
   POST /api/jobs         - Adicionar vaga
\`\`\`

**⚠️ NÃO FECHE ESTE TERMINAL!** O servidor precisa ficar rodando.

---

### 3️⃣ Instalar Dependências do Frontend

Abra um **NOVO TERMINAL** (deixe o servidor rodando no primeiro) e execute:

\`\`\`bash
cd client
npm install
\`\`\`

**O que isso faz?** Instala React, Vite, Axios e outras bibliotecas do frontend.

---

### 4️⃣ Iniciar o Frontend

Ainda na pasta `client`, execute:

\`\`\`bash
npm run dev
\`\`\`

**O que você deve ver:**
\`\`\`
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
\`\`\`

---

### 5️⃣ Acessar o Sistema

Abra seu navegador e acesse:
\`\`\`
http://localhost:5173
\`\`\`

---

## 📊 Verificando se Está Funcionando

### Teste 1: API está respondendo?
Abra em seu navegador:
\`\`\`
http://localhost:3000/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "OK",
  "message": "API está funcionando!"
}
\`\`\`

### Teste 2: Frontend está conectado?
1. Acesse `http://localhost:5173`
2. Vá para a página de Login
3. Tente criar uma conta
4. Se conseguir criar e fazer login, está tudo funcionando! ✅

---

## 🐛 Problemas Comuns

### Erro: "Port 3000 already in use"
**Solução:** Outra aplicação está usando a porta 3000.
\`\`\`bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [NUMERO_DO_PID] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
\`\`\`

### Erro: "Port 5173 already in use"
**Solução:** Feche outros servidores Vite ou use outra porta:
\`\`\`bash
npm run dev -- --port 5174
\`\`\`

### Erro: "Cannot find module"
**Solução:** Instale as dependências novamente:
\`\`\`bash
# No servidor
cd server
rm -rf node_modules package-lock.json
npm install

# No cliente
cd client
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Erro 404 ao adicionar candidato/vaga
**Causa:** O servidor não está rodando.
**Solução:** Certifique-se de que você executou `npm run dev` na pasta `server` e veja a mensagem "🚀 Servidor rodando".

### Frontend não conecta com Backend
**Causa:** Proxy do Vite não configurado.
**Solução:** Verifique se o arquivo `client/vite.config.js` tem:
\`\`\`javascript
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

## 📝 Resumo dos Comandos

**Terminal 1 (Servidor):**
\`\`\`bash
cd server
npm install        # Primeira vez apenas
npm run dev        # Sempre que for desenvolver
\`\`\`

**Terminal 2 (Cliente):**
\`\`\`bash
cd client
npm install        # Primeira vez apenas
npm run dev        # Sempre que for desenvolver
\`\`\`

---

## 🎯 Pronto para Desenvolver!

Agora você tem:
- ✅ Servidor rodando em `http://localhost:3000`
- ✅ Frontend rodando em `http://localhost:5173`
- ✅ Banco de dados SQLite criado automaticamente
- ✅ Todas as rotas de API funcionando

Bom desenvolvimento! 🚀
