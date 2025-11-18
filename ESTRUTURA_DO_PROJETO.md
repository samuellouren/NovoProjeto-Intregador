# 📁 Estrutura do Projeto TalentMatch

## Visão Geral

\`\`\`
projeto-integrador/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   └── Header.jsx     # Menu de navegação
│   │   ├── context/           # Context API do React
│   │   │   └── AuthContext.jsx # Gerencia autenticação
│   │   ├── pages/             # Páginas da aplicação
│   │   │   ├── Login.jsx      # Página de login
│   │   │   ├── Register.jsx   # Página de cadastro
│   │   │   ├── Candidates.jsx # Lista de candidatos
│   │   │   ├── AddCandidate.jsx # Adicionar candidato
│   │   │   ├── Jobs.jsx       # Lista de vagas
│   │   │   └── AddJob.jsx     # Adicionar vaga
│   │   ├── App.jsx            # Componente principal + rotas
│   │   ├── main.jsx           # Ponto de entrada do React
│   │   └── index.css          # Estilos globais
│   ├── vite.config.js         # Configuração do Vite
│   └── package.json           # Dependências frontend
│
├── server/                    # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js        # Configuração do SQLite
│   ├── controllers/
│   │   └── userController.js  # Lógica de usuários
│   ├── middlewares/
│   │   └── authMiddleware.js  # Verifica JWT
│   ├── routes/
│   │   ├── userRoutes.js      # Rotas de usuários
│   │   ├── candidateRoutes.js # Rotas de candidatos
│   │   └── jobRoutes.js       # Rotas de vagas
│   ├── data/
│   │   └── users.db           # Banco de dados SQLite (criado automaticamente)
│   ├── server.js              # Servidor Express principal
│   └── package.json           # Dependências backend
│
└── [outros arquivos...]
\`\`\`

---

## 🎨 Frontend (Client)

### Fluxo de Navegação

\`\`\`
Login/Register
    ↓
Candidates (Lista) → AddCandidate (Formulário)
    ↓
Jobs (Lista) → AddJob (Formulário)
\`\`\`

### Componentes Principais

#### 1. **AuthContext.jsx**
- Gerencia estado de autenticação
- Armazena token JWT no localStorage
- Fornece funções de login/logout para toda aplicação

#### 2. **Header.jsx**
- Menu de navegação
- Links para Candidatos e Vagas
- Botão de Sair

#### 3. **Páginas**

**Login.jsx** → Autenticação de usuários
**Register.jsx** → Cadastro de novos usuários
**Candidates.jsx** → Lista todos os candidatos + busca
**AddCandidate.jsx** → Formulário para adicionar candidato
**Jobs.jsx** → Lista todas as vagas + filtros
**AddJob.jsx** → Formulário para adicionar vaga

---

## 🔧 Backend (Server)

### Arquitetura MVC Simplificada

\`\`\`
Requisição → Rota → Controller → Database → Resposta
\`\`\`

### Rotas Disponíveis

#### Usuários
- `POST /api/register` - Cria novo usuário
- `POST /api/login` - Autentica usuário (retorna JWT)
- `GET /api/users` - Lista usuários

#### Candidatos
- `GET /api/candidates` - Lista candidatos
- `POST /api/candidates` - Adiciona candidato

#### Vagas
- `GET /api/jobs` - Lista vagas
- `POST /api/jobs` - Adiciona vaga

---

## 💾 Banco de Dados

### Tabelas

#### **users**
\`\`\`sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT UNIQUE)
- password (TEXT) -- Hash bcrypt
- created_at (DATETIME)
- updated_at (DATETIME)
\`\`\`

#### **candidates**
\`\`\`sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT UNIQUE)
- phone (TEXT)
- skills (TEXT)
- experience (TEXT)
- education (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
\`\`\`

#### **jobs**
\`\`\`sql
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- company (TEXT)
- location (TEXT)
- type (TEXT)
- salary (TEXT)
- description (TEXT)
- requirements (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
\`\`\`

---

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Registro:**
   \`\`\`
   Usuário → Frontend → POST /api/register → Backend
   → Senha é criptografada com bcrypt
   → Usuário salvo no banco
   → JWT gerado e retornado
   \`\`\`

2. **Login:**
   \`\`\`
   Usuário → Frontend → POST /api/login → Backend
   → Verifica email e senha
   → Gera JWT com dados do usuário
   → Frontend salva token no localStorage
   \`\`\`

3. **Requisições Autenticadas:**
   \`\`\`
   Frontend → Envia token no header Authorization
   → Backend verifica token com JWT
   → Se válido, processa requisição
   → Se inválido, retorna 401 Unauthorized
   \`\`\`

---

## 📡 Comunicação Frontend-Backend

### Como funciona?

1. **Frontend faz requisição:**
   \`\`\`javascript
   axios.post('/api/jobs', dados)
   \`\`\`

2. **Vite Proxy redireciona:**
   \`\`\`
   http://localhost:5173/api/jobs
   →
   http://localhost:3000/api/jobs
   \`\`\`

3. **Backend processa e responde:**
   \`\`\`javascript
   router.post('/jobs', (req, res) => {
     // Processa dados
     res.json({ success: true })
   })
   \`\`\`

4. **Frontend recebe resposta:**
   \`\`\`javascript
   .then(response => {
     console.log('Sucesso!', response.data)
   })
   \`\`\`

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca para interfaces
- **React Router** - Navegação entre páginas
- **Axios** - Requisições HTTP
- **Vite** - Build tool rápido

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **better-sqlite3** - Banco de dados
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **CORS** - Permite comunicação entre portas

---

## 📚 Conceitos Importantes

### SPA (Single Page Application)
O frontend é uma SPA - não recarrega a página, apenas troca componentes.

### API REST
O backend fornece uma API REST - cada rota tem um propósito específico (GET para buscar, POST para criar, etc).

### JWT (JSON Web Token)
Token criptografado que contém dados do usuário. Enviado em cada requisição para provar identidade.

### Proxy
Vite redireciona requisições `/api/*` para o backend, evitando problemas de CORS.

---

## 🎓 Para Programadores Júnior

### O que estudar para entender melhor:

1. **JavaScript ES6+** - Arrow functions, async/await, destructuring
2. **React Básico** - Components, Props, State, Hooks (useState, useEffect, useContext)
3. **Node.js** - Módulos, import/export, callbacks
4. **Express** - Rotas, middlewares, req/res
5. **SQL Básico** - SELECT, INSERT, CREATE TABLE
6. **HTTP** - Métodos (GET, POST), Status codes (200, 404, 500)
7. **Autenticação** - Tokens, headers, localStorage

### Exercícios Práticos:

1. Adicione um campo "experiência" com anos na tela de candidatos
2. Crie filtro por tipo de vaga (CLT, PJ, etc)
3. Adicione botão de editar candidato
4. Implemente paginação na lista de vagas
5. Adicione foto de perfil para candidatos

---

Bom aprendizado! 🚀
