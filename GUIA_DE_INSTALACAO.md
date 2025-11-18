# 🚀 Guia de Instalação - TalentMatch

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** versão 18 ou superior
- **npm** ou **yarn**

## 📁 Estrutura do Projeto

\`\`\`
projeto/
├── client/          ← Frontend React/Vite (RODE AQUI: npm run dev)
├── server/          ← Backend API MVC (RODE AQUI: npm run dev)
└── README.md
\`\`\`

---

## ⚙️ Passo 1: Instalar o Backend (API)

### 1.1 Entre na pasta do servidor

\`\`\`bash
cd server
\`\`\`

### 1.2 Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 1.3 Execute o servidor

\`\`\`bash
npm run dev
\`\`\`

✅ **Pronto!** O backend estará rodando em: **http://localhost:3000**

Você verá a mensagem:
\`\`\`
🚀 Servidor rodando na porta 3000
📡 API disponível em http://localhost:3000/api
\`\`\`

---

## 🎨 Passo 2: Instalar o Frontend (React)

### 2.1 Abra um NOVO TERMINAL e entre na pasta do cliente

\`\`\`bash
cd client
\`\`\`

### 2.2 Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 2.3 Execute o app React

\`\`\`bash
npm run dev
\`\`\`

✅ **Pronto!** O frontend estará rodando em: **http://localhost:5173**

Você verá a mensagem:
\`\`\`
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
\`\`\`

---

## 🔗 Como Funciona a Conexão Frontend ↔ Backend?

A conexão é **AUTOMÁTICA** através do proxy configurado no Vite!

### O que acontece nos bastidores:

1. **Frontend faz requisição:** `axios.post('/api/auth/login', { ... })`
2. **Vite proxy intercepta:** Vê que é uma rota `/api/*`
3. **Redireciona para backend:** `http://localhost:3000/api/auth/login`
4. **Backend responde:** Retorna os dados para o frontend

### Arquivo de configuração (client/vite.config.js):

\`\`\`javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend
        changeOrigin: true
      }
    }
  }
})
\`\`\`

---

## 📍 Onde Executar Cada Comando?

### ❌ ERRADO:
\`\`\`bash
# NÃO execute "npm run dev" na raiz do projeto!
npm run dev  # ← Isso não vai funcionar
\`\`\`

### ✅ CORRETO:

**Terminal 1 - Backend:**
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

---

## 🧪 Testando a Instalação

### 1. Teste o Backend

Abra o navegador e acesse:
\`\`\`
http://localhost:3000/api/health
\`\`\`

Você deve ver:
\`\`\`json
{"status": "ok", "message": "API está funcionando!"}
\`\`\`

### 2. Teste o Frontend

Abra o navegador e acesse:
\`\`\`
http://localhost:5173
\`\`\`

Você deve ver a página de login do TalentMatch.

---

## 🎯 Endpoints da API

### Autenticação (Públicos)
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login

### Usuários (Protegidos - Requer Token JWT)
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário específico
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

---

## 🛠 Comandos Úteis

### Backend (server/)
\`\`\`bash
npm run dev      # Modo desenvolvimento (nodemon)
npm start        # Modo produção
\`\`\`

### Frontend (client/)
\`\`\`bash
npm run dev      # Modo desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
\`\`\`

---

## 🐛 Problemas Comuns

### Erro: "EADDRINUSE" (Porta já em uso)

**Solução:** Mude a porta no arquivo `server/.env`:
\`\`\`
PORT=3001
\`\`\`

E atualize o proxy em `client/vite.config.js`:
\`\`\`javascript
target: 'http://localhost:3001'
\`\`\`

### Erro: "Cannot find module"

**Solução:** Certifique-se de instalar as dependências:
\`\`\`bash
cd server && npm install
cd ../client && npm install
\`\`\`

### Frontend não conecta com Backend

**Checklist:**
- ✅ Backend está rodando? (http://localhost:3000/api/health)
- ✅ Proxy configurado corretamente em `vite.config.js`?
- ✅ As duas aplicações estão rodando simultaneamente?

---

## 🎉 Pronto!

Agora você tem:
- ✅ Backend rodando em `http://localhost:3000`
- ✅ Frontend rodando em `http://localhost:5173`
- ✅ Conexão automática entre eles via proxy
- ✅ Banco de dados SQLite criado automaticamente

**Acesse o app e comece a usar!** 🚀
