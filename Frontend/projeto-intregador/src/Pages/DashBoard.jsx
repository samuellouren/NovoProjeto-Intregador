import React, { useState, useMemo } from 'react';
import './Dashboard.css';

// Constantes
const STATS_DATA = [
  { title: 'CANDIDATURAS', value: '347', change: '+12%', positive: true },
  { title: 'VAGAS ABERTAS', value: '14', change: '+3 vagas', positive: true },
  { title: 'TEMPO MÉDIO', value: '12 dias', change: '-40%', positive: true },
  { title: 'QUALIFICADOS', value: '86%', change: '+8%', positive: true }
];

const CANDIDATES_DATA = [
  {
    id: 1,
    initials: 'PM',
    name: 'Paulo Mendes',
    email: 'paulo@email.com',
    position: 'Desenvolvedor Full-stack',
    status: 'interview',
    statusLabel: 'Entrevista',
    date: 'Hoje, 14:30',
    compatibility: 95
  },
  {
    id: 2,
    initials: 'CR',
    name: 'Carla Ribeiro',
    email: 'carla@email.com',
    position: 'Product Manager',
    status: 'screening',
    statusLabel: 'Triagem',
    date: 'Ontem, 10:15',
    compatibility: 88
  },
  {
    id: 3,
    initials: 'LS',
    name: 'Lucas Silva',
    email: 'lucas@email.com',
    position: 'UX Designer',
    status: 'new',
    statusLabel: 'Novo',
    date: '25 Abr, 2025',
    compatibility: 78
  },
  {
    id: 4,
    initials: 'MF',
    name: 'Maria Fernandes',
    email: 'maria@email.com',
    position: 'Desenvolvedor Frontend',
    status: 'hired',
    statusLabel: 'Contratado',
    date: '20 Abr, 2025',
    compatibility: 92
  },
  {
    id: 5,
    initials: 'RS',
    name: 'Roberto Santos',
    email: 'roberto@email.com',
    position: 'Product Manager',
    status: 'rejected',
    statusLabel: 'Rejeitado',
    date: '18 Abr, 2025',
    compatibility: 65
  }
];

// Componentes
const StatCard = ({ title, value, change, positive }) => (
  <div className="stat-card">
    <h3 className="stat-title">{title}</h3>
    <p className="stat-value">{value}</p>
    <p className={`stat-change ${positive ? 'positive' : 'negative'}`}>
      {change}
    </p>
  </div>
);

const CandidateAvatar = ({ initials }) => (
  <div className="candidate-avatar">
    {initials}
  </div>
);

const StatusBadge = ({ status, label }) => (
  <span className={`status-badge status-${status}`}>
    {label}
  </span>
);

const CompatibilityBar = ({ percentage }) => (
  <div className="compatibility-container">
    <p className="compatibility-percentage">{percentage}%</p>
    <div className="compatibility-bar">
      <div
        className="compatibility-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const CandidateCard = ({ candidate, onView, onEdit, onMessage }) => (
  <div className="candidate-card">
    <div className="candidate-header">
      <CandidateAvatar initials={candidate.initials} />
      <div className="candidate-info">
        <h4 className="candidate-name">{candidate.name}</h4>
        <p className="candidate-email">{candidate.email}</p>
      </div>
    </div>

    <div className="candidate-details">
      <div className="detail-item">
        <p className="detail-label">Vaga</p>
        <p className="detail-value">{candidate.position}</p>
      </div>

      <div className="detail-item">
        <p className="detail-label">Status</p>
        <StatusBadge status={candidate.status} label={candidate.statusLabel} />
      </div>

      <div className="detail-item">
        <p className="detail-label">Data</p>
        <p className="detail-value">{candidate.date}</p>
      </div>

      <div className="detail-item">
        <p className="detail-label">Compatibilidade</p>
        <CompatibilityBar percentage={candidate.compatibility} />
      </div>
    </div>

    <div className="candidate-actions">
      <button 
        onClick={() => onView(candidate)}
        className="btn btn-primary"
        aria-label={`Visualizar ${candidate.name}`}
      >
        Visualizar
      </button>
      <button 
        onClick={() => onEdit(candidate)}
        className="btn btn-secondary"
        aria-label={`Editar ${candidate.name}`}
      >
        Editar
      </button>
      <button 
        onClick={() => onMessage(candidate)}
        className="btn btn-secondary"
        aria-label={`Enviar mensagem para ${candidate.name}`}
      >
        Enviar mensagem
      </button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-icon">🔍</div>
    <h3 className="empty-title">Nenhum candidato encontrado</h3>
    <p className="empty-text">
      Tente ajustar os filtros ou buscar por outro termo
    </p>
  </div>
);

const Header = () => (
  <header className="header">
    <nav className="nav">
      <h1 className="logo">
        Talent<span className="logo-accent">Match</span>
      </h1>
      <div className="header-actions">
        <button className="notification-btn" aria-label="Notificações">
          <span className="notification-icon">📬</span>
          <span className="notification-badge">3</span>
        </button>
        <div className="avatar">JD</div>
      </div>
    </nav>
  </header>
);

// Componente Principal
export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVacancy, setFilterVacancy] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCandidates = useMemo(() => {
    return CANDIDATES_DATA.filter(candidate => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower);

      const matchesVacancy = filterVacancy === 'all' || 
        candidate.position.toLowerCase().includes(filterVacancy.toLowerCase());

      const matchesStatus = filterStatus === 'all' || 
        candidate.status === filterStatus;

      return matchesSearch && matchesVacancy && matchesStatus;
    });
  }, [searchTerm, filterVacancy, filterStatus]);

  const handleView = (candidate) => {
    alert(`Visualizando:\n\nNome: ${candidate.name}\nEmail: ${candidate.email}\nVaga: ${candidate.position}\nCompatibilidade: ${candidate.compatibility}%`);
  };

  const handleEdit = (candidate) => {
    alert(`Editando candidato: ${candidate.name}`);
  };

  const handleMessage = (candidate) => {
    alert(`Enviando mensagem para:\n\n${candidate.name}\n${candidate.email}`);
  };

  return (
    <div className="dashboard">
      <Header />

      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Visão geral dos candidatos e vagas</p>
        </div>

        <div className="stats-grid">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="content-card">
          <div className="content-header">
            <div className="content-header-top">
              <h3 className="content-title">Candidatos Recentes</h3>
            </div>
            
            <div className="filters-container">
              <select
                className="filter-select"
                value={filterVacancy}
                onChange={(e) => setFilterVacancy(e.target.value)}
                aria-label="Filtrar por vaga"
              >
                <option value="all">Todas as vagas</option>
                <option value="desenvolvedor">Desenvolvedor</option>
                <option value="product">Product Manager</option>
                <option value="designer">UX Designer</option>
              </select>

              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filtrar por status"
              >
                <option value="all">Todos os status</option>
                <option value="new">Novo</option>
                <option value="screening">Triagem</option>
                <option value="interview">Entrevista</option>
                <option value="hired">Contratado</option>
                <option value="rejected">Rejeitado</option>
              </select>
            </div>
          </div>

          <div className="content-body">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Pesquisar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Pesquisar candidatos"
              />
              <span className="search-icon" aria-hidden="true">🔍</span>
            </div>

            <div className="results-count">
              {filteredCandidates.length === CANDIDATES_DATA.length ? (
                <span>Mostrando <strong>todos os {CANDIDATES_DATA.length}</strong> candidatos</span>
              ) : (
                <span>Encontrados <strong>{filteredCandidates.length}</strong> de {CANDIDATES_DATA.length} candidatos</span>
              )}
            </div>

            {filteredCandidates.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="candidates-list">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onView={handleView}
                    onEdit={handleEdit}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}