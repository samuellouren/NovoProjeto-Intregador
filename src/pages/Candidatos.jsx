import { useState } from 'react'
import './Candidatos.css'

const candidatosData = [
  {
    id: 1,
    avatar: 'PM',
    nome: 'Paulo Mendes',
    email: 'paulo@email.com',
    vaga: 'Desenvolvedor Full-stack',
    status: 'interview',
    statusLabel: 'Entrevista',
    compatibilidade: 95,
    candidatura: '18 Abr, 2025',
    habilidades: [
      { nome: 'JavaScript', nivel: 'expert' },
      { nome: 'React', nivel: 'expert' },
      { nome: 'Node.js', nivel: 'intermediate' },
      { nome: 'Python', nivel: 'intermediate' }
    ],
    bookmarked: false
  },
  {
    id: 2,
    avatar: 'CR',
    nome: 'Carla Ribeiro',
    email: 'carla@email.com',
    vaga: 'Product Manager',
    status: 'screening',
    statusLabel: 'Triagem',
    compatibilidade: 88,
    candidatura: '20 Abr, 2025',
    habilidades: [
      { nome: 'Product Management', nivel: 'expert' },
      { nome: 'Scrum', nivel: 'expert' },
      { nome: 'UX Design', nivel: 'intermediate' },
      { nome: 'Marketing', nivel: 'intermediate' }
    ],
    bookmarked: true
  },
  {
    id: 3,
    avatar: 'LS',
    nome: 'Lucas Silva',
    email: 'lucas@email.com',
    vaga: 'UX Designer',
    status: 'new',
    statusLabel: 'Novo',
    compatibilidade: 78,
    candidatura: '25 Abr, 2025',
    habilidades: [
      { nome: 'UI Design', nivel: 'expert' },
      { nome: 'Figma', nivel: 'expert' },
      { nome: 'HTML/CSS', nivel: 'intermediate' },
      { nome: 'JavaScript', nivel: 'beginner' }
    ],
    bookmarked: false
  },
  {
    id: 4,
    avatar: 'AM',
    nome: 'Ana Moreira',
    email: 'ana@email.com',
    vaga: 'Desenvolvedor Full-stack',
    status: 'hired',
    statusLabel: 'Contratado',
    compatibilidade: 92,
    candidatura: '15 Abr, 2025',
    habilidades: [
      { nome: 'JavaScript', nivel: 'expert' },
      { nome: 'React', nivel: 'expert' },
      { nome: 'Node.js', nivel: 'expert' },
      { nome: 'TypeScript', nivel: 'intermediate' }
    ],
    bookmarked: false
  },
  {
    id: 5,
    avatar: 'RO',
    nome: 'Rafael Oliveira',
    email: 'rafael@email.com',
    vaga: 'Desenvolvedor Back-end',
    status: 'rejected',
    statusLabel: 'Rejeitado',
    compatibilidade: 65,
    candidatura: '12 Abr, 2025',
    habilidades: [
      { nome: 'Java', nivel: 'intermediate' },
      { nome: 'Spring Boot', nivel: 'intermediate' },
      { nome: 'Python', nivel: 'beginner' },
      { nome: 'MySQL', nivel: 'beginner' }
    ],
    bookmarked: false
  }
]

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState(candidatosData)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleBookmark = (id) => {
    setCandidatos(prev =>
      prev.map(c => c.id === id ? { ...c, bookmarked: !c.bookmarked } : c)
    )
  }

  return (
    <div className="candidatos-page">
      <header className="candidatos-header">
        <div className="container">
          <nav>
            <div className="logo">Talent<span>Match</span></div>
            <div className="header-actions">
              <div style={{ position: 'relative' }}>
                📬
                <span className="notification-badge">3</span>
              </div>
              <div className="avatar-user">JD</div>
            </div>
          </nav>
        </div>
      </header>

      <main className="candidatos-main">
        <div className="page-header">
          <h1>Candidatos</h1>
          <button className="btn-export">Exportar</button>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar candidatos por nome, habilidades ou vaga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters">
          <select className="filter-select">
            <option value="">Todas as vagas</option>
            <option value="dev">Desenvolvedor</option>
            <option value="product">Product Manager</option>
            <option value="design">UX Designer</option>
          </select>

          <select className="filter-select">
            <option value="">Todos os status</option>
            <option value="new">Novo</option>
            <option value="screening">Triagem</option>
            <option value="interview">Entrevista</option>
            <option value="hired">Contratado</option>
            <option value="rejected">Rejeitado</option>
          </select>

          <select className="filter-select">
            <option value="">Todas as habilidades</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
          </select>
        </div>

        <div className="candidate-list">
          {candidatos.map((candidato) => (
            <div key={candidato.id} className={`candidate-card ${candidato.status}`}>
              <div
                className={`bookmark ${candidato.bookmarked ? 'active' : ''}`}
                onClick={() => toggleBookmark(candidato.id)}
              >
                {candidato.bookmarked ? '★' : '☆'}
              </div>

              <div className="candidate-header">
                <div className="avatar">{candidato.avatar}</div>
                <div className="candidate-info">
                  <div className="name">{candidato.nome}</div>
                  <div className="email">{candidato.email}</div>
                </div>
              </div>

              <div className="candidate-details">
                <div className="detail-item">
                  <div className="label">Vaga</div>
                  <div className="value">{candidato.vaga}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Status</div>
                  <span className={`status status-${candidato.status}`}>
                    {candidato.statusLabel}
                  </span>
                </div>
                <div className="detail-item">
                  <div className="label">Compatibilidade</div>
                  <div className="value">{candidato.compatibilidade}%</div>
                  <div className="skills-match-bar">
                    <div
                      className="skills-match-progress"
                      style={{ width: `${candidato.compatibilidade}%` }}
                    ></div>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="label">Candidatura</div>
                  <div className="value">{candidato.candidatura}</div>
                </div>
              </div>

              <div className="label">Habilidades</div>
              <div className="tag-list">
                {candidato.habilidades.map((hab, idx) => (
                  <span key={idx} className={`skill-tag ${hab.nivel}`}>
                    {hab.nome}
                  </span>
                ))}
              </div>

              <div className="candidate-actions">
                <button className="action-btn primary">Ver Detalhes</button>
                <button className="action-btn">Ver Currículo</button>
                <button className="action-btn">Enviar Mensagem</button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination-btn">←</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">→</button>
        </div>
      </main>

      <div className="bottom-nav">
        <a href="#dashboard">📊<br />Dashboard</a>
        <a href="#candidates" className="active">👥<br />Candidatos</a>
        <a href="#jobs">💼<br />Vagas</a>
        <a href="#analytics">📈<br />Análises</a>
        <a href="#settings">⚙️<br />Config</a>
      </div>
    </div>
  )
}
