# 📚 TalentMatch - Guia Completo para Iniciantes

## 🎯 O que é este projeto?

Este é um **sistema de recrutamento** chamado TalentMatch. Ele permite que empresas gerenciem candidatos de vagas de emprego. O projeto tem duas partes principais:

1. **Frontend (React)** - A parte visual que o usuário vê no navegador
2. **Backend (API)** - O servidor que gerencia dados e autenticação

---

## 🏗️ Arquitetura do Projeto (Estrutura)

\`\`\`
projetointegrador/
│
├── src/                          ← FRONTEND (React/Vite)
│   ├── pages/                    ← Páginas da aplicação
│   │   ├── Login.jsx            ← Página de login
│   │   ├── Cadastro.jsx         ← Página de cadastro
│   │   └── Candidatos.jsx       ← Página de lista de candidatos
│   │
│   ├── components/              ← Componentes reutilizáveis
│   │   └── StarField.jsx        ← Efeito de estrelas no fundo
│   │
│   ├── context/                 ← Gerenciamento de estado global
│   │   └── AuthContext.jsx     ← Controla autenticação do usuário
│   │
│   ├── App.jsx                  ← Componente principal com rotas
│   ├── main.jsx                 ← Arquivo de entrada do React
│   └── index.css                ← Estilos globais
│
├── server/                      ← BACKEND (Node.js + Express)
│   ├── models/                  ← Camada de Dados (acessa banco)
│   │   └── User.js             ← Modelo de Usuário (CRUD)
│   │
│   ├── controllers/             ← Camada de Lógica de Negócio
│   │   └── userController.js   ← Funções de login, cadastro, etc
│   │
│   ├── routes/                  ← Camada de Rotas (endpoints da API)
│   │   └── userRoutes.js       ← Define URLs da API
│   │
│   ├── middlewares/             ← Funções intermediárias
│   │   └── authMiddleware.js   ← Verifica se usuário está logado
│   │
│   ├── config/                  ← Configurações
│   │   └── database.js         ← Conexão com banco de dados
│   │
│   ├── server.js               ← Arquivo principal do servidor
│   └── package.json            ← Dependências do backend
│
├── index.html                   ← HTML base do React
├── vite.config.js              ← Configuração do Vite
└── package.json                ← Dependências do frontend
\`\`\`

---

## 🔄 Como o Projeto Funciona (Fluxo Completo)

### 1️⃣ Fluxo de Cadastro de Usuário

\`\`\`
[Usuário]
   ↓
1. Preenche formulário de cadastro (nome, email, senha)
   ↓
[Frontend - Cadastro.jsx]
   ↓
2. Valida os dados (campos obrigatórios, senha com 6+ caracteres)
   ↓
3. Envia requisição POST para /api/register
   ↓
[Backend - userController.js]
   ↓
4. Recebe os dados
5. Verifica se email já existe
6. Criptografa a senha com bcrypt
   ↓
[Backend - User.js (Model)]
   ↓
7. Salva no banco de dados SQLite
   ↓
8. Retorna sucesso
   ↓
[Frontend]
   ↓
9. Mostra mensagem de sucesso
10. Redireciona para página de login
\`\`\`

### 2️⃣ Fluxo de Login

\`\`\`
[Usuário]
   ↓
1. Preenche email e senha
   ↓
[Frontend - Login.jsx]
   ↓
2. Envia requisição POST para /api/login
   ↓
[Backend - userController.js]
   ↓
3. Busca usuário no banco pelo email
4. Compara senha digitada com senha criptografada
5. Se correto, gera um TOKEN JWT (chave de acesso)
   ↓
6. Retorna token para o frontend
   ↓
[Frontend - AuthContext.jsx]
   ↓
7. Salva token no localStorage do navegador
8. Redireciona para página de candidatos
\`\`\`

### 3️⃣ Fluxo de Acesso a Páginas Protegidas

\`\`\`
[Usuário acessa /candidatos]
   ↓
[Frontend]
   ↓
1. Verifica se tem token no localStorage
   ↓
   Sim? → Mostra a página
   Não? → Redireciona para login
\`\`\`

---

## 🔑 Conceitos Importantes Explicados

### O que é JWT (Token)?

**JWT** = JSON Web Token (Token Web em formato JSON)

É como um **"passe VIP"** que prova que você está logado:

\`\`\`javascript
// Quando você faz login, o servidor cria um token assim:
const token = jwt.sign(
  { id: 123, email: 'usuario@email.com' },  // Informações do usuário
  'senhasecreta',                            // Chave secreta do servidor
  { expiresIn: '24h' }                       // Expira em 24 horas
)

// Token gerado:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJlbWFpbCI6InVzdWFyaW9AZW1haWwuY29tIn0.abc123def456"
\`\`\`

**Como funciona:**
1. Você faz login → Servidor gera token
2. Navegador guarda o token
3. Toda vez que você acessa algo protegido, envia o token
4. Servidor verifica se token é válido
5. Se válido, libera acesso

### O que é bcrypt?

É uma biblioteca que **criptografa senhas** para segurança:

\`\`\`javascript
// Senha original
const senha = '123456'

// Senha criptografada (armazenada no banco)
const senhaCriptografada = '$2b$10$abcdef1234567890...'

// Mesmo que alguém roube o banco de dados, não consegue ler a senha!
\`\`\`

### O que é MVC (Model-View-Controller)?

É uma **forma de organizar o código** dividindo responsabilidades:

\`\`\`
┌─────────────┐
│   MODEL     │ ← Gerencia dados (banco de dados)
│  (User.js)  │   Exemplos: criar usuário, buscar usuário, etc
└─────────────┘
       ↑
       ↓
┌─────────────┐
│ CONTROLLER  │ ← Lógica de negócio (regras da aplicação)
│(userController.js)│   Exemplos: validar email, comparar senha, etc
└─────────────┘
       ↑
       ↓
┌─────────────┐
│   ROUTES    │ ← Define os endpoints (URLs da API)
│(userRoutes.js)│   Exemplos: POST /api/login, GET /api/users
└─────────────┘
\`\`\`

### O que é SQLite?

É um **banco de dados local** (arquivo no computador):

- Não precisa instalar servidor de banco de dados
- Tudo fica salvo em um arquivo chamado `database.db`
- Fácil de usar para aprender e projetos pequenos

---

## 📦 Tecnologias Usadas (com explicações)

### Frontend:
- **React** - Biblioteca para criar interfaces (páginas)
- **Vite** - Ferramenta que empacota e roda o projeto rapidamente
- **React Router** - Gerencia navegação entre páginas
- **CSS** - Estilização das páginas

### Backend:
- **Node.js** - JavaScript rodando no servidor
- **Express** - Framework para criar APIs (rotas HTTP)
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken** - Criação e validação de tokens
- **better-sqlite3** - Banco de dados SQLite
- **CORS** - Permite frontend e backend conversarem

---

## 🚀 Como Executar o Projeto (Passo a Passo Detalhado)

### Pré-requisitos:
1. Instale o **Node.js** (versão 18+): https://nodejs.org
2. Verifique se instalou corretamente:
   \`\`\`bash
   node --version
   npm --version
   \`\`\`

### Passo 1: Executar o Backend (Servidor)

1. Abra o **terminal** e navegue até a pasta do servidor:
   \`\`\`bash
   cd server
   \`\`\`

2. Instale as dependências (bibliotecas necessárias):
   \`\`\`bash
   npm install
   \`\`\`
   
   Isso vai instalar: express, bcrypt, jsonwebtoken, better-sqlite3, cors, nodemon

3. Execute o servidor:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Você verá esta mensagem:
   \`\`\`
   🚀 API rodando em http://localhost:3000
   📡 Rotas disponíveis:
      - POST /api/register (cadastro)
      - POST /api/login (login)
      - GET /api/users (listar usuários)
   \`\`\`

✅ **Backend está rodando!** Não feche este terminal.

### Passo 2: Executar o Frontend (Interface)

1. Abra um **NOVO terminal** (deixe o anterior aberto com o backend rodando)

2. Volte para a pasta raiz do projeto:
   \`\`\`bash
   cd ..
   \`\`\`

3. Instale as dependências do frontend:
   \`\`\`bash
   npm install
   \`\`\`

4. Execute o frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Você verá:
   \`\`\`
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   \`\`\`

6. Abra o navegador e acesse: **http://localhost:5173**

✅ **Pronto! O sistema está funcionando!**

---

## 🧪 Como Testar o Sistema

### 1. Testar Cadastro:
1. Acesse http://localhost:5173
2. Clique em "Cadastre-se"
3. Preencha:
   - Nome: João Silva
   - Email: joao@teste.com
   - Senha: 123456
   - Confirmar senha: 123456
   - Aceite os termos
4. Clique em "Criar conta"
5. Se aparecer "Cadastro realizado com sucesso!", funcionou!

### 2. Testar Login:
1. Volte para a página de login
2. Digite:
   - Email: joao@teste.com
   - Senha: 123456
3. Clique em "Entrar"
4. Você será redirecionado para a página de candidatos

### 3. Verificar Token:
1. Abra as **Ferramentas do Desenvolvedor** (F12)
2. Vá em **Application → Local Storage → http://localhost:5173**
3. Você verá um item chamado `token` com um valor grande
4. Esse é o seu JWT!

---

## 🐛 Problemas Comuns e Soluções

### Erro: "EADDRINUSE" (porta já em uso)
**Problema:** Algo já está rodando na porta 3000 ou 5173

**Solução:**
\`\`\`bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <número_do_processo> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
\`\`\`

### Erro: "Cannot find module"
**Problema:** Dependências não instaladas

**Solução:**
\`\`\`bash
# Na pasta server:
cd server
rm -rf node_modules
npm install

# Na pasta raiz:
cd ..
rm -rf node_modules
npm install
\`\`\`

### Frontend não conecta com Backend
**Checklist:**
- ✅ Backend está rodando? Acesse: http://localhost:3000/health
- ✅ Frontend está rodando? Acesse: http://localhost:5173
- ✅ Verifique se não há erro no console do navegador (F12)

---

## 📝 Entendendo o Código (Linha por Linha)

### Exemplo 1: Login no Frontend

\`\`\`javascript
// src/pages/Login.jsx

import { useState } from 'react'  // Hook para criar variáveis que atualizam a tela

export default function Login() {
  // Cria variáveis de estado
  const [email, setEmail] = useState('')          // Guarda o email digitado
  const [password, setPassword] = useState('')    // Guarda a senha digitada
  const [error, setError] = useState('')          // Guarda mensagens de erro

  // Função que executa quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault()  // Impede que a página recarregue
    
    // Validação básica
    if (!email || !password) {
      setError('Preencha todos os campos')
      return  // Para a execução aqui
    }

    try {
      // Faz uma requisição HTTP POST para o backend
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',                           // Tipo da requisição
        headers: { 'Content-Type': 'application/json' },  // Formato dos dados
        body: JSON.stringify({ email, password })  // Converte para JSON
      })

      // Converte a resposta para JSON
      const data = await response.json()

      // Se a resposta não for OK (status 200-299)
      if (!response.ok) {
        setError(data.message)  // Mostra erro na tela
        return
      }

      // Se chegou aqui, login foi bem-sucedido!
      localStorage.setItem('token', data.token)  // Salva token no navegador
      window.location.href = '/candidatos'       // Redireciona
      
    } catch (error) {
      setError('Erro ao conectar com servidor')
      console.error(error)
    }
  }

  // Retorna o JSX (HTML + JavaScript)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Atualiza estado a cada digitação
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      
      {error && <div>{error}</div>}  {/* Mostra erro se existir */}
    </div>
  )
}
\`\`\`

### Exemplo 2: Login no Backend

\`\`\`javascript
// server/controllers/userController.js

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

class UserController {
  static async login(req, res) {
    // Pega os dados enviados pelo frontend
    const { email, password } = req.body
    
    // 1. VALIDAÇÃO
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email e senha obrigatórios' 
      })
    }

    // 2. BUSCA USUÁRIO NO BANCO
    const user = User.findByEmail(email)
    if (!user) {
      return res.status(400).json({ 
        message: 'Usuário não encontrado' 
      })
    }

    // 3. COMPARA SENHAS
    // bcrypt.compare compara senha digitada com senha criptografada do banco
    const senhaCorreta = await bcrypt.compare(password, user.password)
    if (!senhaCorreta) {
      return res.status(401).json({ 
        message: 'Senha incorreta' 
      })
    }

    // 4. GERA TOKEN JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },  // Dados que vão no token
      'senhasecreta',                       // Chave secreta (em produção, use variável de ambiente)
      { expiresIn: '24h' }                  // Token expira em 24h
    )

    // 5. RETORNA SUCESSO COM TOKEN
    res.json({
      message: 'Login bem-sucedido',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  }
}

export default UserController
\`\`\`

---

## 🎓 Exercícios para Praticar

### Nível 1 - Iniciante:
1. Mude a cor do botão de login de roxo para azul
2. Adicione um campo "telefone" no cadastro
3. Mude o título "TalentMatch" para outro nome

### Nível 2 - Intermediário:
1. Adicione validação para email (formato válido)
2. Faça a senha precisar de pelo menos 8 caracteres
3. Adicione um botão "Esqueci minha senha"

### Nível 3 - Avançado:
1. Crie uma página de perfil do usuário
2. Adicione funcionalidade de editar perfil
3. Implemente logout (remover token e voltar ao login)

---

## 📚 Recursos para Aprender Mais

### JavaScript:
- MDN Web Docs: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/

### React:
- Documentação oficial: https://react.dev/
- Tutorial interativo: https://react.dev/learn/tutorial-tic-tac-toe

### Node.js/Express:
- Node.js docs: https://nodejs.org/docs
- Express docs: https://expressjs.com/

### APIs REST:
- O que é API REST: https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api
- HTTP Status Codes: https://httpstatuses.com/

---

## 💡 Dicas Importantes

1. **Sempre leia os erros:** Mensagens de erro te dizem exatamente o que está errado
2. **Use console.log():** É seu melhor amigo para debugar
3. **Teste pequenas partes:** Não tente fazer tudo de uma vez
4. **Comente seu código:** Seu eu do futuro vai agradecer
5. **Não tenha medo de quebrar:** É testando e errando que se aprende!

---

## 🤝 Próximos Passos

Após entender este projeto, você pode:

1. Adicionar mais funcionalidades (upload de foto, busca avançada)
2. Melhorar o design (CSS/Tailwind)
3. Adicionar testes automatizados (Jest, Vitest)
4. Fazer deploy (Vercel, Heroku, Railway)
5. Migrar para TypeScript
6. Adicionar mais páginas (dashboard, relatórios)

Bons estudos e boa sorte! 🚀
