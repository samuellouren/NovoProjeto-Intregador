import React, { useState, useMemo } from "react";
import "./Dashboard.css";

const STATS = [
  { title: "CANDIDATURAS", value: "347", change: "+12%", positive: true },
  { title: "VAGAS ABERTAS", value: "14", change: "+3 vagas", positive: true },
  { title: "TEMPO MÉDIO", value: "12 dias", change: "-40%", positive: true },
  { title: "QUALIFICADOS", value: "86%", change: "+8%", positive: true },
];

const CANDIDATES = [
  {
    id: 1,
    initials: "PM",
    name: "Paulo Mendes",
    email: "paulo@email.com",
    position: "Desenvolvedor Full-stack",
    status: "interview",
    statusLabel: "Entrevista",
    date: "Hoje, 14:30",
    compatibility: 95,
  },
  {
    id: 2,
    initials: "CR",
    name: "Carla Ribeiro",
    email: "carla@email.com",
    position: "Product Manager",
    status: "screening",
    statusLabel: "Triagem",
    date: "Ontem, 10:15",
    compatibility: 88,
  },
  {
    id: 3,
    initials: "LS",
    name: "Lucas Silva",
    email: "lucas@email.com",
    position: "UX Designer",
    status: "new",
    statusLabel: "Novo",
    date: "25 Abr, 2025",
    compatibility: 78,
  },
  {
    id: 4,
    initials: "MF",
    name: "Maria Fernandes",
    email: "maria@email.com",
    position: "Desenvolvedor Frontend",
    status: "hired",
    statusLabel: "Contratado",
    date: "20 Abr, 2025",
    compatibility: 92,
  },
  {
    id: 5,
    initials: "RS",
    name: "Roberto Santos",
    email: "roberto@email.com",
    position: "Product Manager",
    status: "rejected",
    statusLabel: "Rejeitado",
    date: "18 Abr, 2025",
    compatibility: 65,
  },
];

const StatCard = ({ title, value, change, positive }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p className="stat-value">{value}</p>
    <p className={`stat-change ${positive ? "positive" : "negative"}`}>{change}</p>
  </div>
);

const CandidateAvatar = ({ initials }) => <div className="candidate-avatar">{initials}</div>;

const StatusBadge = ({ status, label }) => (
  <span className={`status-badge status-${status}`}>{label}</span>
);

const CompatibilityBar = ({ percentage }) => (
  <div className="compatibility-container">
    <p className="compatibility-percentage">{percentage}%</p>
    <div className="compatibility-bar">
      <div className="compatibility-fill" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

const CandidateCard = ({ candidate, onView, onEdit, onMessage }) => (
  <div className="candidate-card">
    <div className="candidate-header">
      <CandidateAvatar initials={candidate.initials} />
      <div>
        <h4>{candidate.name}</h4>
        <p className="candidate-email">{candidate.email}</p>
      </div>
    </div>

    <div className="candidate-details">
      <Detail label="Vaga" value={candidate.position} />
      <Detail
        label="Status"
        value={<StatusBadge status={candidate.status} label={candidate.statusLabel} />}
      />
      <Detail label="Data" value={candidate.date} />
      <Detail
        label="Compatibilidade"
        value={<CompatibilityBar percentage={candidate.compatibility} />}
      />
    </div>

    <div className="candidate-actions">
      <button onClick={() => onView(candidate)} className="btn btn-primary">
        Visualizar
      </button>
      <button onClick={() => onEdit(candidate)} className="btn btn-secondary">
        Editar
      </button>
      <button onClick={() => onMessage(candidate)} className="btn btn-secondary">
        Enviar mensagem
      </button>
    </div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="detail-item">
    <p className="detail-label">{label}</p>
    <p className="detail-value">{value}</p>
  </div>
);

const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-icon">🔍</div>
    <h3>Nenhum candidato encontrado</h3>
    <p>Tente ajustar os filtros ou buscar por outro termo</p>
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
          📬<span className="notification-badge">3</span>
        </button>
        <div className="avatar">JD</div>
      </div>
    </nav>
  </header>
);

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [vacancy, setVacancy] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return CANDIDATES.filter((c) => {
      const matchesSearch =
        !search || c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s);
      const matchesVacancy =
        vacancy === "all" || c.position.toLowerCase().includes(vacancy.toLowerCase());
      const matchesStatus = status === "all" || c.status === status;
      return matchesSearch && matchesVacancy && matchesStatus;
    });
  }, [search, vacancy, status]);

  const handleView = (c) =>
    alert(`Visualizando:\n\n${c.name}\n${c.email}\nVaga: ${c.position}\nCompatibilidade: ${c.compatibility}%`);

  const handleEdit = (c) => alert(`Editando candidato: ${c.name}`);
  const handleMessage = (c) => alert(`Enviando mensagem para:\n\n${c.name}\n${c.email}`);

  return (
    <div className="dashboard">
      <Header />

      <main className="main-content">
        <header className="page-header">
          <h2>Dashboard</h2>
          <p>Visão geral dos candidatos e vagas</p>
        </header>

        <section className="stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </section>

        <section className="content-card">
          <div className="content-header">
            <h3>Candidatos Recentes</h3>

            <div className="filters-container">
              <select value={vacancy} onChange={(e) => setVacancy(e.target.value)}>
                <option value="all">Todas as vagas</option>
                <option value="desenvolvedor">Desenvolvedor</option>
                <option value="product">Product Manager</option>
                <option value="designer">UX Designer</option>
              </select>

              <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
                placeholder="Pesquisar por nome ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="results-count">
              {filtered.length === CANDIDATES.length ? (
                <span>
                  Mostrando <strong>todos os {CANDIDATES.length}</strong> candidatos
                </span>
              ) : (
                <span>
                  Encontrados <strong>{filtered.length}</strong> de {CANDIDATES.length} candidatos
                </span>
              )}
            </div>

            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="candidates-list">
                {filtered.map((c) => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    onView={handleView}
                    onEdit={handleEdit}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
