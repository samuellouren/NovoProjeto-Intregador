import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import StarField from '../components/StarField'
import './Cadastro.css'

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos os campos são obrigatórios.')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Digite um email válido.')
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (!formData.terms) {
      setError('Você deve aceitar os termos de uso para continuar.')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email.toLowerCase(),
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.message || 'Erro no cadastro.')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.')
      console.error('Erro ao cadastrar:', err)
    }
  }

  return (
    <div className="cadastro-page">
      <StarField />

      <div className="cadastro-container">
        <div className="cadastro-header">
          <div className="logo">Talent<span>Match</span></div>
          <h1>Crie sua conta</h1>
          <p>Preencha os dados abaixo para se cadastrar</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <div className="input-with-icon">
              <i className="icon fas fa-user"></i>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <i className="icon fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <i className="icon fas fa-lock"></i>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua senha"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <div className="input-with-icon">
              <i className="icon fas fa-lock"></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
              />
            </div>
          </div>

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              Concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
            </label>
          </div>

          <button type="submit" className="btn">
            Criar conta
          </button>
        </form>

        <div className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </div>
      </div>
    </div>
  )
}
