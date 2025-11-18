import { useState } from 'react'
import axios from 'axios'
import './Modal.css'

export default function EditCandidateModal({ candidate, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: candidate.name || '',
    email: candidate.email || '',
    phone: candidate.phone || '',
    skills: candidate.skills || '',
    experience: candidate.experience || '',
    education: candidate.education || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      alert('Nome e email são obrigatórios')
      return
    }

    setLoading(true)

    try {
      await axios.put(`http://localhost:3000/api/candidates/${candidate.id}`, formData)
      alert('Candidato atualizado com sucesso!')
      onSuccess()
    } catch (error) {
      console.error('[v0] Erro ao atualizar candidato:', error)
      alert(error.response?.data?.message || 'Erro ao atualizar candidato')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Candidato</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Nome Completo *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Habilidades</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Experiência</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Formação</label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
