# Guia Completo de Instalação - TalentMatch

Este guia foi escrito pensando em **programadores júnior**. Vou explicar cada passo detalhadamente.

---

## O que você precisa ter instalado

### 1. Node.js (versão 18 ou superior)

**O que é?** Node.js é um ambiente que permite executar JavaScript fora do navegador.

**Como verificar se já está instalado:**
\`\`\`bash
node --version
\`\`\`

**Como instalar:** 
- Acesse: https://nodejs.org
- Baixe a versão LTS (recomendada)
- Instale seguindo o assistente

### 2. NPM (vem junto com o Node.js)

**O que é?** NPM é o gerenciador de pacotes do Node.js. É como uma "loja de bibliotecas" para JavaScript.

**Como verificar:**
\`\`\`bash
npm --version
\`\`\`

---

## Passo a Passo para Rodar o Projeto

### PASSO 1: Extrair o projeto

Se você recebeu um arquivo ZIP:
1. Extraia o ZIP em uma pasta de sua escolha
2. Exemplo: `C:\projetos\talentmatch`

### PASSO 2: Abrir o terminal

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter
- Navegue até a pasta do projeto: `cd C:\projetos\talentmatch`

**Mac/Linux:**
- Abra o Terminal
- Navegue até a pasta: `cd ~/projetos/talentmatch`

### PASSO 3: Instalar dependências do FRONTEND

\`\`\`bash
# Certifique-se de estar na pasta raiz do projeto
npm install
\`\`\`

**O que isso faz?** Baixa todas as bibliotecas que o projeto precisa (React, Vite, Tailwind, etc.)

**Tempo estimado:** 2-5 minutos (depende da internet)

### PASSO 4: Instalar dependências do BACKEND

\`\`\`bash
# Entre na pasta do servidor
cd server

# Instale as dependências
npm install

# Volte para a pasta raiz
cd ..
\`\`\`

**O que isso faz?** Baixa as bibliotecas do backend (Express, SQLite, bcrypt, JWT, etc.)

### PASSO 5: Executar o BACKEND

**Abra um novo terminal** (deixe este rodando):

\`\`\`bash
cd server
npm run dev
\`\`\`

**Você deve ver:**
\`\`\`
Servidor rodando na porta 3000
Banco de dados conectado!
\`\`\`

**NÃO FECHE ESTE TERMINAL!** O backend precisa ficar rodando.

### PASSO 6: Executar o FRONTEND

**Abra outro terminal** (agora você tem 2 terminais abertos):

\`\`\`bash
# Certifique-se de estar na pasta raiz
npm run dev
\`\`\`

**Você deve ver:**
\`\`\`
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
\`\`\`

### PASSO 7: Acessar o site

Abra seu navegador e acesse:
\`\`\`
http://localhost:5173
\`\`\`

---

## Entendendo os Terminais

Agora você deve ter **2 terminais abertos**:

### Terminal 1 (Backend)
\`\`\`
servidor/
└── npm run dev
    └── Porta 3000
    └── API REST rodando
\`\`\`

### Terminal 2 (Frontend)
\`\`\`
raiz/
└── npm run dev
    └── Porta 5173
    └── Interface do usuário
\`\`\`

---

## Como testar se está funcionando

### 1. Teste a página inicial
- Acesse: http://localhost:5173
- Você deve ver a página de login ou home

### 2. Teste o cadastro
- Clique em "Cadastrar"
- Preencha o formulário
- Clique em "Cadastrar"
- Se aparecer mensagem de sucesso, funcionou!

### 3. Teste o login
- Use o email e senha que você cadastrou
- Clique em "Entrar"
- Você deve ser redirecionado para a página de candidatos

---

## Problemas Comuns e Soluções

### Erro: "porta já está em uso"

**Problema:** Outra aplicação está usando a porta 3000 ou 5173

**Solução:**
\`\`\`bash
# No Windows
netstat -ano | findstr :3000
taskkill /PID [número_do_PID] /F

# No Mac/Linux
lsof -ti:3000 | xargs kill -9
\`\`\`

### Erro: "Cannot find module"

**Problema:** Dependências não foram instaladas corretamente

**Solução:**
\`\`\`bash
# Delete a pasta node_modules
rm -rf node_modules

# Delete o arquivo package-lock.json
rm package-lock.json

# Instale novamente
npm install
\`\`\`

### Erro: "Network Error" ao fazer login

**Problema:** Backend não está rodando ou está na porta errada

**Solução:**
1. Verifique se o backend está rodando no Terminal 1
2. Deve mostrar "Servidor rodando na porta 3000"
3. Se não estiver, execute `cd server && npm run dev`

### Erro do Tailwind CSS / PostCSS

**Problema:** Conflito de versões do Tailwind

**Solução:** Execute os comandos na ordem:
\`\`\`bash
# 1. Instale as dependências corretas
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17

# 2. Limpe o cache
npm cache clean --force

# 3. Reinstale
npm install

# 4. Execute novamente
npm run dev
\`\`\`

---

## Estrutura de Pastas Explicada

\`\`\`
talentmatch/
│
├── src/                      # Código fonte do FRONTEND
│   ├── pages/               # Páginas React (Login, Cadastro, etc.)
│   ├── components/          # Componentes reutilizáveis
│   ├── context/            # Context API (gerenciamento de estado)
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada do React
│   └── index.css           # Estilos globais
│
├── server/                  # Código fonte do BACKEND
│   ├── controllers/        # Lógica de negócio (CRUD)
│   ├── routes/             # Rotas da API (/api/usuarios, etc.)
│   ├── middleware/         # Autenticação JWT
│   ├── server.js           # Servidor Express
│   ├── database.db         # Banco de dados SQLite
│   └── package.json        # Dependências do backend
│
├── public/                  # Arquivos públicos (imagens, ícones)
├── index.html              # HTML principal
├── vite.config.js          # Configuração do Vite
├── tailwind.config.cjs     # Configuração do Tailwind CSS
├── package.json            # Dependências do frontend
└── README.md               # Documentação
\`\`\`

---

## Próximos Passos

Agora que o projeto está rodando:

1. **Explore o código:** Comece por `src/App.jsx`
2. **Leia os comentários:** Todo código está comentado
3. **Faça modificações:** Tente mudar cores, textos, etc.
4. **Teste as APIs:** Use o Postman ou Thunder Client
5. **Aprenda:** Leia o arquivo `README_COMPLETO.md`

---

## Precisa de Ajuda?

Se você ainda está com problemas:

1. Verifique se seguiu TODOS os passos na ordem
2. Veja a seção "Problemas Comuns"
3. Tire print do erro e pesquise no Google
4. Pergunte em fóruns: Stack Overflow, Reddit, Discord

**Dica:** Sempre copie a mensagem de erro completa ao pesquisar!
