import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import './AddJob.css'

export default function AddJob() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Tempo Integral',
    salary: '',
    description: '',
    requirements: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await axios.post('http://localhost:3000/api/jobs', formData)
      alert('Vaga adicionada com sucesso!')
      navigate('/jobs')
    } catch (error) {
      console.error('[v0] Erro ao adicionar vaga:', error)
      setError(error.response?.data?.message || 'Erro ao adicionar vaga')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-job-container">
      <Header />
      
      <main className="add-job-main">
        <div className="form-wrapper">
          <h2>Adicionar Nova Vaga</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
              <label htmlFor="title">Título da Vaga *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Desenvolvedor Full Stack"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Empresa *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Nome da empresa"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Localização *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Ex: São Paulo, SP"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Tipo de Contrato *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Tempo Integral">Tempo Integral</option>
                  <option value="Meio Período">Meio Período</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salário</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Ex: R$ 5.000 - R$ 8.000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição da Vaga *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Descreva as responsabilidades e atividades da vaga"
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requisitos</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="4"
                placeholder="Liste os requisitos necessários para a vaga"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/jobs')}
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
                {loading ? 'Salvando...' : 'Adicionar Vaga'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
