// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ==================== BANCO DE DADOS EM MEMÓRIA ====================
// Em produção, use MongoDB, PostgreSQL, etc.

let dashboards = [
  {
    id: 1,
    name: 'Dashboard Principal',
    type: 'recruitment',
    color: 'blue',
    layout: 'grid',
    metrics: ['candidaturas', 'vagasAbertas', 'tempoMedio', 'qualificados'],
    filters: ['departamento', 'cargo', 'data', 'status'],
    createdAt: new Date('2025-01-01'),
    userId: 1
  }
];

let candidates = [
  {
    id: 1,
    initials: 'PM',
    name: 'Paulo Mendes',
    email: 'paulo@email.com',
    phone: '(11) 98765-4321',
    position: 'Desenvolvedor Full-stack',
    status: 'interview',
    statusLabel: 'Entrevista',
    date: '2025-10-06T14:30',
    dateLabel: 'Hoje, 14:30',
    compatibility: 95,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    experience: '5 anos',
    education: 'Bacharelado em Ciência da Computação',
    salary: 'R$ 12.000',
    vacancyId: 1,
    createdAt: new Date('2025-10-06')
  },
  {
    id: 2,
    initials: 'CR',
    name: 'Carla Ribeiro',
    email: 'carla@email.com',
    phone: '(11) 91234-5678',
    position: 'Product Manager',
    status: 'screening',
    statusLabel: 'Triagem',
    date: '2025-10-05T10:15',
    dateLabel: 'Ontem, 10:15',
    compatibility: 88,
    skills: ['Gestão de Produto', 'Agile', 'Scrum', 'Analytics'],
    experience: '7 anos',
    education: 'MBA em Gestão de Produtos',
    salary: 'R$ 15.000',
    vacancyId: 2,
    createdAt: new Date('2025-10-05')
  },
  {
    id: 3,
    initials: 'LS',
    name: 'Lucas Silva',
    email: 'lucas@email.com',
    phone: '(11) 99999-8888',
    position: 'UX Designer',
    status: 'new',
    statusLabel: 'Novo',
    date: '2025-04-25',
    dateLabel: '25 Abr, 2025',
    compatibility: 78,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototipagem'],
    experience: '3 anos',
    education: 'Design Gráfico',
    salary: 'R$ 8.000',
    vacancyId: 3,
    createdAt: new Date('2025-04-25')
  }
];

let vacancies = [
  {
    id: 1,
    title: 'Desenvolvedor Full-stack',
    department: 'Tecnologia',
    location: 'São Paulo - SP',
    type: 'CLT',
    salary: 'R$ 10.000 - R$ 15.000',
    status: 'open',
    description: 'Desenvolvimento de aplicações web com React e Node.js',
    requirements: ['React', 'Node.js', 'PostgreSQL', 'Git'],
    benefits: ['Vale refeição', 'Plano de saúde', 'Home office'],
    openings: 2,
    applicants: 45,
    createdAt: new Date('2025-09-15')
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Produto',
    location: 'Remote',
    type: 'CLT',
    salary: 'R$ 12.000 - R$ 18.000',
    status: 'open',
    description: 'Gestão de roadmap e priorização de features',
    requirements: ['Experiência em Product Management', 'Agile', 'Data Analysis'],
    benefits: ['Vale refeição', 'Plano de saúde', '100% remoto'],
    openings: 1,
    applicants: 32,
    createdAt: new Date('2025-09-20')
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Rio de Janeiro - RJ',
    type: 'PJ',
    salary: 'R$ 7.000 - R$ 10.000',
    status: 'open',
    description: 'Design de interfaces e experiência do usuário',
    requirements: ['Figma', 'User Research', 'Prototipagem'],
    benefits: ['Horário flexível', 'Vale transporte'],
    openings: 1,
    applicants: 28,
    createdAt: new Date('2025-09-25')
  }
];

let statistics = {
  totalApplications: 347,
  applicationsChange: '+12%',
  openVacancies: 14,
  vacanciesChange: '+3 vagas',
  averageTime: 12, // dias
  timeChange: '-40%',
  qualifiedRate: 86, // porcentagem
  qualifiedChange: '+8%',
  hiredThisMonth: 8,
  rejectedThisMonth: 15,
  costPerHire: 5000
};

// Contadores para IDs autoincrementais
let nextCandidateId = 4;
let nextVacancyId = 4;
let nextDashboardId = 2;

// ==================== ROTAS DE ESTATÍSTICAS ====================

// GET /api/statistics - Obter estatísticas do dashboard
app.get('/api/statistics', (req, res) => {
  res.json({
    success: true,
    data: statistics
  });
});

// ==================== ROTAS DE CANDIDATOS ====================

// GET /api/candidates - Listar todos os candidatos com filtros
app.get('/api/candidates', (req, res) => {
  const { status, position, search, sortBy = 'date', order = 'desc' } = req.query;
  
  let filtered = [...candidates];
  
  // Filtro por status
  if (status && status !== 'all') {
    filtered = filtered.filter(c => c.status === status);
  }
  
  // Filtro por vaga/posição
  if (position && position !== 'all') {
    filtered = filtered.filter(c => c.position.toLowerCase().includes(position.toLowerCase()));
  }
  
  // Busca por nome, email ou vaga
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.position.toLowerCase().includes(searchLower)
    );
  }
  
  // Ordenação
  filtered.sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'compatibility':
        comparison = a.compatibility - b.compatibility;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length
  });
});

// GET /api/candidates/:id - Obter candidato específico
app.get('/api/candidates/:id', (req, res) => {
  const candidate = candidates.find(c => c.id === parseInt(req.params.id));
  
  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: 'Candidato não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: candidate
  });
});

// POST /api/candidates - Criar novo candidato
app.post('/api/candidates', (req, res) => {
  const { name, email, phone, position, skills, experience, education, salary, vacancyId } = req.body;
  
  // Validação básica
  if (!name || !email || !position) {
    return res.status(400).json({
      success: false,
      message: 'Nome, email e posição são obrigatórios'
    });
  }
  
  // Gerar iniciais
  const initials = name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  const newCandidate = {
    id: nextCandidateId++,
    initials,
    name,
    email,
    phone: phone || '',
    position,
    status: 'new',
    statusLabel: 'Novo',
    date: new Date().toISOString(),
    dateLabel: 'Agora',
    compatibility: Math.floor(Math.random() * 30) + 70, // 70-100
    skills: skills || [],
    experience: experience || '',
    education: education || '',
    salary: salary || '',
    vacancyId: vacancyId || null,
    createdAt: new Date()
  };
  
  candidates.push(newCandidate);
  
  res.status(201).json({
    success: true,
    message: 'Candidato criado com sucesso',
    data: newCandidate
  });
});

// PUT /api/candidates/:id - Atualizar candidato
app.put('/api/candidates/:id', (req, res) => {
  const index = candidates.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Candidato não encontrado'
    });
  }
  
  // Atualizar campos permitidos
  const updatedCandidate = {
    ...candidates[index],
    ...req.body,
    id: candidates[index].id, // Manter ID original
    updatedAt: new Date()
  };
  
  candidates[index] = updatedCandidate;
  
  res.json({
    success: true,
    message: 'Candidato atualizado com sucesso',
    data: updatedCandidate
  });
});

// DELETE /api/candidates/:id - Deletar candidato
app.delete('/api/candidates/:id', (req, res) => {
  const index = candidates.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Candidato não encontrado'
    });
  }
  
  const deleted = candidates.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Candidato deletado com sucesso',
    data: deleted
  });
});

// PATCH /api/candidates/:id/status - Atualizar apenas o status
app.patch('/api/candidates/:id/status', (req, res) => {
  const { status, statusLabel } = req.body;
  const index = candidates.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Candidato não encontrado'
    });
  }
  
  candidates[index].status = status;
  candidates[index].statusLabel = statusLabel;
  candidates[index].updatedAt = new Date();
  
  res.json({
    success: true,
    message: 'Status atualizado com sucesso',
    data: candidates[index]
  });
});

// ==================== ROTAS DE VAGAS ====================

// GET /api/vacancies - Listar todas as vagas
app.get('/api/vacancies', (req, res) => {
  const { status, department, search } = req.query;
  
  let filtered = [...vacancies];
  
  if (status && status !== 'all') {
    filtered = filtered.filter(v => v.status === status);
  }
  
  if (department && department !== 'all') {
    filtered = filtered.filter(v => v.department === department);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(searchLower) ||
      v.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length
  });
});

// GET /api/vacancies/:id - Obter vaga específica
app.get('/api/vacancies/:id', (req, res) => {
  const vacancy = vacancies.find(v => v.id === parseInt(req.params.id));
  
  if (!vacancy) {
    return res.status(404).json({
      success: false,
      message: 'Vaga não encontrada'
    });
  }
  
  // Buscar candidatos da vaga
  const vacancyCandidates = candidates.filter(c => c.vacancyId === vacancy.id);
  
  res.json({
    success: true,
    data: {
      ...vacancy,
      candidates: vacancyCandidates
    }
  });
});

// POST /api/vacancies - Criar nova vaga
app.post('/api/vacancies', (req, res) => {
  const { title, department, location, type, salary, description, requirements, benefits, openings } = req.body;
  
  if (!title || !department) {
    return res.status(400).json({
      success: false,
      message: 'Título e departamento são obrigatórios'
    });
  }
  
  const newVacancy = {
    id: nextVacancyId++,
    title,
    department,
    location: location || '',
    type: type || 'CLT',
    salary: salary || '',
    status: 'open',
    description: description || '',
    requirements: requirements || [],
    benefits: benefits || [],
    openings: openings || 1,
    applicants: 0,
    createdAt: new Date()
  };
  
  vacancies.push(newVacancy);
  
  res.status(201).json({
    success: true,
    message: 'Vaga criada com sucesso',
    data: newVacancy
  });
});

// PUT /api/vacancies/:id - Atualizar vaga
app.put('/api/vacancies/:id', (req, res) => {
  const index = vacancies.findIndex(v => v.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Vaga não encontrada'
    });
  }
  
  vacancies[index] = {
    ...vacancies[index],
    ...req.body,
    id: vacancies[index].id,
    updatedAt: new Date()
  };
  
  res.json({
    success: true,
    message: 'Vaga atualizada com sucesso',
    data: vacancies[index]
  });
});

// DELETE /api/vacancies/:id - Deletar vaga
app.delete('/api/vacancies/:id', (req, res) => {
  const index = vacancies.findIndex(v => v.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Vaga não encontrada'
    });
  }
  
  vacancies.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Vaga deletada com sucesso'
  });
});

// ==================== ROTAS DE DASHBOARDS ====================

// GET /api/dashboards - Listar dashboards do usuário
app.get('/api/dashboards', (req, res) => {
  const { userId = 1 } = req.query;
  
  const userDashboards = dashboards.filter(d => d.userId === parseInt(userId));
  
  res.json({
    success: true,
    data: userDashboards
  });
});

// POST /api/dashboards - Criar novo dashboard
app.post('/api/dashboards', (req, res) => {
  const { name, type, color, layout, metrics, filters, userId = 1 } = req.body;
  
  if (!name || !type) {
    return res.status(400).json({
      success: false,
      message: 'Nome e tipo são obrigatórios'
    });
  }
  
  const newDashboard = {
    id: nextDashboardId++,
    name,
    type,
    color: color || 'blue',
    layout: layout || 'grid',
    metrics: metrics || [],
    filters: filters || [],
    userId: parseInt(userId),
    createdAt: new Date()
  };
  
  dashboards.push(newDashboard);
  
  res.status(201).json({
    success: true,
    message: 'Dashboard criado com sucesso',
    data: newDashboard
  });
});

// PUT /api/dashboards/:id - Atualizar dashboard
app.put('/api/dashboards/:id', (req, res) => {
  const index = dashboards.findIndex(d => d.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Dashboard não encontrado'
    });
  }
  
  dashboards[index] = {
    ...dashboards[index],
    ...req.body,
    id: dashboards[index].id,
    updatedAt: new Date()
  };
  
  res.json({
    success: true,
    message: 'Dashboard atualizado com sucesso',
    data: dashboards[index]
  });
});

// DELETE /api/dashboards/:id - Deletar dashboard
app.delete('/api/dashboards/:id', (req, res) => {
  const index = dashboards.findIndex(d => d.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Dashboard não encontrado'
    });
  }
  
  dashboards.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Dashboard deletado com sucesso'
  });
});

// ==================== ROTA DE HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'TalentMatch API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  console.log(`\n📝 Rotas disponíveis:`);
  console.log(`   GET    /api/health - Health check`);
  console.log(`   GET    /api/statistics - Estatísticas`);
  console.log(`   GET    /api/candidates - Listar candidatos`);
  console.log(`   POST   /api/candidates - Criar candidato`);
  console.log(`   GET    /api/vacancies - Listar vagas`);
  console.log(`   POST   /api/vacancies - Criar vaga`);
  console.log(`   GET    /api/dashboards - Listar dashboards`);
  console.log(`   POST   /api/dashboards - Criar dashboard`);
});

module.exports = app;





// packjson
{
  "name": "talentmatch-backend",
  "version": "1.0.0",
  "description": "API Backend para o sistema TalentMatch de recrutamento",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --coverage"
  },
  "keywords": [
    "recruitment",
    "hr",
    "api",
    "backend"
  ],
  "author": "TalentMatch Team",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "morgan": "^1.10.0",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}