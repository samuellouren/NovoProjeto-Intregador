import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import './AddCandidate.css'

export default function AddCandidate() {
  const navigate = useNavigate()
  
  // Estados para armazenar dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Função que atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função que envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault() // Previne reload da página
    setError('')
    setLoading(true)

    try {
      await axios.post('http://localhost:3000/api/candidates', formData)
      
      // Mostra mensagem de sucesso
      alert('Candidato adicionado com sucesso!')
      
      // Volta para página de candidatos
      navigate('/candidates')
    } catch (error) {
      console.error('[v0] Erro ao adicionar candidato:', error)
      setError(error.response?.data?.message || 'Erro ao adicionar candidato')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-candidate-container">
      <Header />
      
      <main className="add-candidate-main">
        <div className="form-wrapper">
          <h2>Adicionar Novo Candidato</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="candidate-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digite o nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Habilidades</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Ex: JavaScript, React, Node.js"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experiência</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                placeholder="Descreva a experiência profissional"
              />
            </div>

            <div className="form-group">
              <label htmlFor="education">Formação</label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Ex: Bacharelado em Ciência da Computação"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/candidates')}
                className="btn-cancel"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Adicionar Candidato'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
