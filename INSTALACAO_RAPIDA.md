# Guia de Instalação Rápida - TalentMatch

## Problema Resolvido
O erro do PostCSS foi corrigido! O projeto client NÃO usa Tailwind CSS, então removemos a configuração conflitante.

## Como Executar o Projeto

### 1. Instalar Backend (Servidor)
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

O servidor vai iniciar na porta **3000**: http://localhost:3000

### 2. Instalar Frontend (Client) - EM OUTRO TERMINAL
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

O client vai iniciar na porta **5173**: http://localhost:5173

### 3. Pronto!
Acesse no navegador: **http://localhost:5173**

## Estrutura do Projeto

\`\`\`
projeto/
├── server/              # Backend (API REST com Node.js + Express)
│   ├── server.js       # Servidor principal
│   ├── controllers/    # Lógica de negócio
│   ├── routes/         # Rotas da API
│   ├── database.db     # Banco de dados SQLite
│   └── package.json    # Dependências do backend
│
├── client/             # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/      # Páginas (Login, Register, Candidates)
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── context/    # Context API (AuthContext)
│   │   └── main.jsx    # Ponto de entrada
│   ├── package.json    # Dependências do frontend
│   └── vite.config.js  # Configuração do Vite
│
└── app/                # Pasta do Next.js (NÃO USAR - é da v0)
\`\`\`

## Tecnologias Usadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para criar APIs REST
- **SQLite**: Banco de dados leve em arquivo
- **bcryptjs**: Criptografia de senhas
- **jsonwebtoken**: Autenticação com JWT
- **cors**: Permitir requisições entre client e server

### Frontend
- **React**: Biblioteca para interfaces de usuário
- **Vite**: Build tool rápido para desenvolvimento
- **React Router**: Navegação entre páginas
- **Axios**: Cliente HTTP para fazer requisições
- **CSS puro**: Estilização (NÃO usa Tailwind)

## Como Funciona

### 1. Autenticação
\`\`\`
Usuario digita email/senha → Frontend envia para /api/login 
→ Backend verifica no banco → Gera token JWT 
→ Frontend salva token → Usuario logado!
\`\`\`

### 2. Cadastro
\`\`\`
Usuario preenche formulario → Frontend envia para /api/register
→ Backend criptografa senha → Salva no banco
→ Retorna sucesso → Redireciona para login
\`\`\`

### 3. Proteção de Rotas
\`\`\`
Usuario tenta acessar /candidates 
→ AuthContext verifica se tem token
→ Se SIM: mostra página
→ Se NÃO: redireciona para login
\`\`\`

## Comandos Úteis

### Backend
\`\`\`bash
cd server
npm install              # Instala dependências
npm run dev             # Inicia servidor (porta 3000)
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install              # Instala dependências
npm run dev             # Inicia client (porta 5173)
npm run build           # Cria versão de produção
\`\`\`

## Testando o Sistema

1. Acesse: http://localhost:5173
2. Clique em "Cadastre-se"
3. Crie uma conta com email e senha
4. Faça login com suas credenciais
5. Você será redirecionado para a página de candidatos

## Problemas Comuns

### Erro: "Cannot find module"
**Solução**: Execute `npm install` na pasta correta (server ou client)

### Erro: "Port already in use"
**Solução**: Outra aplicação está usando a porta. Feche-a ou mude a porta no código.

### Backend não conecta
**Solução**: Certifique-se que o servidor está rodando em http://localhost:3000

### Frontend não carrega
**Solução**: Verifique se o Vite está rodando em http://localhost:5173

## Banco de Dados

O projeto usa SQLite com arquivo `database.db` na pasta server.

**Tabelas:**
- **users**: Armazena usuários (id, name, email, password_hash, created_at)
- **candidates**: Armazena candidatos (criado automaticamente se necessário)

Para ver o banco: Use DB Browser for SQLite ou similar

## Próximos Passos para Aprender

1. Entenda como funciona o AuthContext (client/src/context/AuthContext.jsx)
2. Veja como as rotas são protegidas (client/src/App.jsx)
3. Estude os controllers do backend (server/controllers/)
4. Aprenda sobre JWT e autenticação
5. Pratique criando novas funcionalidades

## Recursos para Estudo

- React: https://react.dev
- Express: https://expressjs.com
- JWT: https://jwt.io
- SQLite: https://sqlite.org
- Vite: https://vitejs.dev

---

**Dica**: Sempre rode backend e frontend em terminais separados!
