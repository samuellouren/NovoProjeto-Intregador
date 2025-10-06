# TalentMatch Backend API

API RESTful completa para o sistema de recrutamento TalentMatch.

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/talentmatch-backend.git
cd talentmatch-backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor
npm run dev
```

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=sua_chave_secreta
CORS_ORIGIN=http://localhost:3000
```

## 📚 Documentação da API

### Base URL
```
http://localhost:3001/api
```

---

### 🏥 Health Check

#### `GET /api/health`
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "success": true,
  "message": "TalentMatch API está funcionando",
  "timestamp": "2025-10-06T12:00:00.000Z"
}
```

---

### 📊 Estatísticas

#### `GET /api/statistics`
Retorna estatísticas gerais do dashboard.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Desenvolvedor Full-stack",
    "department": "Tecnologia",
    "description": "Desenvolvimento de aplicações web com React e Node.js",
    "requirements": ["React", "Node.js", "PostgreSQL", "Git"],
    "benefits": ["Vale refeição", "Plano de saúde", "Home office"],
    "candidates": [
      {
        "id": 1,
        "name": "Paulo Mendes",
        "status": "interview",
        "compatibility": 95
      }
    ]
  }
}
```

---

#### `POST /api/vacancies`
Cria uma nova vaga.

**Body:**
```json
{
  "title": "Analista de Dados",
  "department": "Data Science",
  "location": "Remote",
  "type": "CLT",
  "salary": "R$ 8.000 - R$ 12.000",
  "description": "Análise e visualização de dados",
  "requirements": ["Python", "SQL", "Power BI"],
  "benefits": ["100% remoto", "Vale refeição"],
  "openings": 2
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Vaga criada com sucesso",
  "data": {
    "id": 4,
    "title": "Analista de Dados",
    ...
  }
}
```

---

#### `PUT /api/vacancies/:id`
Atualiza uma vaga existente.

---

#### `DELETE /api/vacancies/:id`
Remove uma vaga.

---

### 📊 Dashboards

#### `GET /api/dashboards`
Lista todos os dashboards do usuário.

**Query Parameters:**
- `userId` (opcional): ID do usuário (padrão: 1)

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dashboard Principal",
      "type": "recruitment",
      "color": "blue",
      "layout": "grid",
      "metrics": ["candidaturas", "vagasAbertas"],
      "filters": ["departamento", "cargo"]
    }
  ]
}
```

---

#### `POST /api/dashboards`
Cria um novo dashboard.

**Body:**
```json
{
  "name": "Dashboard de Tecnologia",
  "type": "recruitment",
  "color": "purple",
  "layout": "columns",
  "metrics": ["candidaturas", "tempoMedio", "qualificados"],
  "filters": ["cargo", "data", "status"],
  "userId": 1
}
```

---

#### `PUT /api/dashboards/:id`
Atualiza um dashboard existente.

---

#### `DELETE /api/dashboards/:id`
Remove um dashboard.

---

## 🔐 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `404` - Não encontrado
- `500` - Erro no servidor

## 📝 Códigos de Status de Candidatos

- `new` - Novo
- `screening` - Triagem
- `interview` - Entrevista
- `hired` - Contratado
- `rejected` - Rejeitado

## 💡 Exemplos de Uso com Fetch API

### Listar candidatos com filtros
```javascript
const response = await fetch('http://localhost:3001/api/candidates?status=interview&sortBy=compatibility');
const data = await response.json();
console.log(data.data);
```

### Criar novo candidato
```javascript
const response = await fetch('http://localhost:3001/api/candidates', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@email.com',
    position: 'Backend Developer',
    skills: ['Node.js', 'MongoDB', 'Docker']
  })
});
const data = await response.json();
```

### Atualizar status do candidato
```javascript
const response = await fetch('http://localhost:3001/api/candidates/1/status', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'hired',
    statusLabel: 'Contratado'
  })
});
```

### Criar novo dashboard
```javascript
const response = await fetch('http://localhost:3001/api/dashboards', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Dashboard de RH',
    type: 'recruitment',
    color: 'blue',
    layout: 'grid',
    metrics: ['candidaturas', 'vagasAbertas', 'tempoMedio'],
    filters: ['departamento', 'status']
  })
});
```

## 🛠️ Estrutura do Projeto

```
talentmatch-backend/
├── server.js           # Arquivo principal da API
├── package.json        # Dependências do projeto
├── .env               # Variáveis de ambiente (criar)
├── .env.example       # Exemplo de variáveis
└── README.md          # Documentação
```

## 🚀 Deploy

### Heroku
```bash
heroku create talentmatch-api
git push heroku main
heroku config:set NODE_ENV=production
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📦 Próximos Passos

- [ ] Integrar com banco de dados real (PostgreSQL/MongoDB)
- [ ] Adicionar autenticação JWT
- [ ] Implementar upload de currículos
- [ ] Adicionar sistema de notificações por email
- [ ] Implementar paginação nas listagens
- [ ] Adicionar testes automatizados
- [ ] Implementar rate limiting
- [ ] Adicionar documentação Swagger/OpenAPI

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👥 Contato

Para dúvidas ou sugestões, entre em contato através do email: contato@talentmatch.com {
    "totalApplications": 347,
    "applicationsChange": "+12%",
    "openVacancies": 14,
    "vacanciesChange": "+3 vagas",
    "averageTime": 12,
    "timeChange": "-40%",
    "qualifiedRate": 86,
    "qualifiedChange": "+8%"
  }
}
```

---

### 👥 Candidatos

#### `GET /api/candidates`
Lista todos os candidatos com opções de filtro.

**Query Parameters:**
- `status` (opcional): new, screening, interview, hired, rejected
- `position` (opcional): Filtro por cargo
- `search` (opcional): Busca por nome, email ou vaga
- `sortBy` (opcional): date, compatibility, name (padrão: date)
- `order` (opcional): asc, desc (padrão: desc)

**Exemplo:**
```
GET /api/candidates?status=interview&sortBy=compatibility&order=desc
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Paulo Mendes",
      "email": "paulo@email.com",
      "position": "Desenvolvedor Full-stack",
      "status": "interview",
      "compatibility": 95,
      ...
    }
  ],
  "total": 1
}
```

---

#### `GET /api/candidates/:id`
Obtém detalhes de um candidato específico.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Paulo Mendes",
    "email": "paulo@email.com",
    "phone": "(11) 98765-4321",
    "position": "Desenvolvedor Full-stack",
    "status": "interview",
    "skills": ["React", "Node.js", "PostgreSQL"],
    "experience": "5 anos",
    "education": "Bacharelado em Ciência da Computação",
    "salary": "R$ 12.000",
    "compatibility": 95
  }
}
```

---

#### `POST /api/candidates`
Cria um novo candidato.

**Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 99999-8888",
  "position": "Desenvolvedora Frontend",
  "skills": ["React", "TypeScript", "CSS"],
  "experience": "3 anos",
  "education": "Sistemas de Informação",
  "salary": "R$ 8.000",
  "vacancyId": 1
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Candidato criado com sucesso",
  "data": {
    "id": 4,
    "name": "Maria Santos",
    ...
  }
}
```

---

#### `PUT /api/candidates/:id`
Atualiza dados completos de um candidato.

**Body:**
```json
{
  "name": "Paulo Mendes Silva",
  "phone": "(11) 98765-0000",
  "experience": "6 anos"
}
```

---

#### `PATCH /api/candidates/:id/status`
Atualiza apenas o status de um candidato.

**Body:**
```json
{
  "status": "hired",
  "statusLabel": "Contratado"
}
```

---

#### `DELETE /api/candidates/:id`
Remove um candidato.

**Resposta:**
```json
{
  "success": true,
  "message": "Candidato deletado com sucesso"
}
```

---

### 💼 Vagas

#### `GET /api/vacancies`
Lista todas as vagas com filtros.

**Query Parameters:**
- `status` (opcional): open, closed, paused
- `department` (opcional): Tecnologia, Produto, Design, etc.
- `search` (opcional): Busca por título ou descrição

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Desenvolvedor Full-stack",
      "department": "Tecnologia",
      "location": "São Paulo - SP",
      "type": "CLT",
      "salary": "R$ 10.000 - R$ 15.000",
      "status": "open",
      "openings": 2,
      "applicants": 45
    }
  ],
  "total": 1
}
```

---

#### `GET /api/vacancies/:id`
Obtém detalhes de uma vaga específica, incluindo candidatos.

**Resposta:**
```json
{
  "success": true,
  "data":