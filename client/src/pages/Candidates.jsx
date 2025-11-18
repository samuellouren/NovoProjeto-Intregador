import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import './Candidates.css'
import Header from '../components/Header'
import CandidateDetailsModal from '../components/CandidateDetailsModal'
import EditCandidateModal from '../components/EditCandidateModal'

export default function Candidates() {
  const [candidates, setCandidates] = useState([])
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState(new Set())
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCandidates()
  }, [])

  useEffect(() => {
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCandidates(filtered)
  }, [searchTerm, candidates])

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/candidates')
      setCandidates(response.data)
      setFilteredCandidates(response.data)
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error)
      alert('Erro ao buscar candidatos. Verifique se o servidor está rodando.')
    }
  }

  const handleAddCandidate = () => {
    navigate('/add-candidate')
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const handleViewDetails = async (candidate) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/candidates/${candidate.id}`)
      setSelectedCandidate(response.data)
      setShowDetailsModal(true)
    } catch (error) {
      console.error('[v0] Erro ao buscar detalhes:', error)
      alert('Erro ao buscar detalhes do candidato')
    }
  }

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate)
    setShowEditModal(true)
  }

  const handleDelete = async (candidate) => {
    if (!confirm(`Tem certeza que deseja deletar o candidato ${candidate.name}?`)) {
      return
    }

    try {
      await axios.delete(`http://localhost:3000/api/candidates/${candidate.id}`)
      alert('Candidato deletado com sucesso!')
      fetchCandidates()
    } catch (error) {
      console.error('[v0] Erro ao deletar candidato:', error)
      alert('Erro ao deletar candidato')
    }
  }

  return (
    <div className="candidates-container">
      <Header />

      <main className="candidates-main">
        <div className="search-section">
          <div className="section-header">
            <h2>Candidatos</h2>
            <button onClick={handleAddCandidate} className="btn-add">
              + Adicionar Candidato
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="candidates-grid">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <div className="card-header">
                <div className="avatar">
                  {candidate.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => toggleFavorite(candidate.id)}
                  className={`favorite-button ${favorites.has(candidate.id) ? 'active' : ''}`}
                >
                  {favorites.has(candidate.id) ? '★' : '☆'}
                </button>
              </div>
              <h3>{candidate.name}</h3>
              <p className="email">{candidate.email}</p>
              <p className="date">
                Cadastrado em: {new Date(candidate.created_at).toLocaleDateString('pt-BR')}
              </p>
              <div className="card-actions">
                <button 
                  className="btn-details"
                  onClick={() => handleViewDetails(candidate)}
                >
                  Ver Detalhes
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(candidate)}
                >
                  Editar
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(candidate)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="no-results">
            <p>Nenhum candidato encontrado</p>
            <button onClick={handleAddCandidate} className="btn-add-empty">
              + Adicionar Primeiro Candidato
            </button>
          </div>
        )}
      </main>

      {showDetailsModal && (
        <CandidateDetailsModal 
          candidate={selectedCandidate} 
          onClose={() => setShowDetailsModal(false)} 
        />
      )}

      {showEditModal && (
        <EditCandidateModal 
          candidate={selectedCandidate} 
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false)
            fetchCandidates()
          }}
        />
      )}
    </div>
  )
}
