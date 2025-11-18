# Como Executar o Projeto TalentMatch

## O problema que você estava enfrentando

O erro do Tailwind CSS acontecia porque o projeto estava misturando duas configurações diferentes:
- **Next.js** (framework moderno do React) - configurado em `app/` com Tailwind v4
- **Vite** (bundler alternativo) - configurado em `vite.config.js`

Este projeto foi originalmente criado com React + Vite, mas foi importado para um ambiente Next.js.

## Solução: Duas opções para rodar o projeto

### OPÇÃO 1: Executar com Next.js (Recomendado - Mais Simples)

Este é o método mais fácil e já está configurado. O Next.js é o framework padrão da Vercel.

**Passos:**

1. **Instalar as dependências:**
\`\`\`bash
npm install
\`\`\`

2. **Executar o backend (em um terminal):**
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

3. **Executar o frontend Next.js (em outro terminal):**
\`\`\`bash
npm run dev
\`\`\`

4. **Acessar:** http://localhost:3000

### OPÇÃO 2: Manter a estrutura original React + Vite

Se você quer manter a estrutura original do projeto, precisamos ajustar os arquivos.

**Passos para configurar o Vite:**

1. Criar arquivo de configuração do PostCSS simplificado
2. Ajustar o CSS para usar Tailwind v3 (compatível com Vite)
3. Verificar se `src/main.jsx` existe e está correto

---

## Estrutura do Projeto Explicada

### Frontend (React/Next.js)
\`\`\`
app/                    # Páginas Next.js (novo)
  ├── layout.tsx       # Layout principal
  ├── page.tsx         # Página inicial
  └── globals.css      # Estilos globais com Tailwind v4

src/                    # Código fonte React original (Vite)
  ├── pages/           # Páginas do React
  ├── context/         # Context API para autenticação
  ├── components/      # Componentes reutilizáveis
  ├── main.jsx         # Ponto de entrada do Vite
  ├── App.jsx          # Componente principal
  └── index.css        # Estilos globais
\`\`\`

### Backend (Node.js + Express)
\`\`\`
server/
  ├── server.js              # Servidor principal
  ├── controllers/           # Lógica de negócio
  ├── routes/               # Rotas da API
  ├── middleware/           # Autenticação JWT
  └── database.db           # Banco de dados SQLite
\`\`\`

---

## Tecnologias Usadas (Explicação para Júnior)

### Frontend
- **React**: Biblioteca JavaScript para criar interfaces
- **Next.js**: Framework React que facilita criar aplicações web
- **Tailwind CSS**: Framework CSS para estilizar componentes
- **Axios**: Biblioteca para fazer requisições HTTP (falar com o backend)
- **React Router**: Navegação entre páginas

### Backend
- **Node.js**: Ambiente para executar JavaScript no servidor
- **Express**: Framework para criar APIs REST
- **SQLite**: Banco de dados leve e simples (arquivo .db)
- **bcryptjs**: Criptografia de senhas
- **jsonwebtoken (JWT)**: Tokens de autenticação

---

## Próximos Passos

Escolha a **OPÇÃO 1 (Next.js)** se você quer simplicidade.

Escolha a **OPÇÃO 2 (Vite)** se você precisa manter o projeto original exatamente como estava.

Qual opção você prefere? Posso configurar qualquer uma delas para você!
