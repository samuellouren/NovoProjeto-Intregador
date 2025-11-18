import { useState } from 'react'  // Hook do React para criar variáveis de estado
import { useNavigate, Link } from 'react-router-dom'  // Para navegação entre páginas
import { useAuth } from '../context/AuthContext'  // Contexto de autenticação
import StarField from '../components/StarField'  // Componente de fundo animado
import './Login.css'  // Estilos da página

export default function Login() {
  // ===== ESTADOS =====
  // Estados são variáveis que, quando mudam, atualizam a tela automaticamente
  
  const [email, setEmail] = useState('')          // Armazena email digitado
  const [password, setPassword] = useState('')    // Armazena senha digitada
  const [error, setError] = useState('')          // Armazena mensagem de erro
  const [remember, setRemember] = useState(false) // Checkbox "Lembrar-me"
  const [loading, setLoading] = useState(false)   // Indica se está carregando

  // ===== HOOKS =====
  const navigate = useNavigate()  // Permite redirecionar para outras páginas
  const { login } = useAuth()     // Pega função login do contexto

  // ===== FUNÇÃO DE SUBMIT DO FORMULÁRIO =====
  const handleSubmit = async (e) => {
    // Previne comportamento padrão (recarregar página)
    e.preventDefault()
    
    // Limpa erro anterior
    setError('')
    
    console.log('[v0] Iniciando processo de login')

    // VALIDAÇÃO: Verifica se campos foram preenchidos
    if (!email || !password) {
      console.log('[v0] Campos vazios')
      setError('Por favor, preencha email e senha.')
      return  // Para execução aqui
    }

    // Validação básica de formato de email
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      console.log('[v0] Email inválido')
      setError('Digite um email válido.')
      return
    }

    // Inicia loading
    setLoading(true)

    try {
      console.log('[v0] Enviando requisição de login...')
      
      // Faz requisição POST para API de login
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',  // Tipo da requisição
        headers: { 
          'Content-Type': 'application/json'  // Indica que está enviando JSON
        },
        body: JSON.stringify({ email, password })  // Converte dados para JSON
      })

      console.log('[v0] Resposta recebida, status:', response.status)

      // Converte resposta para objeto JavaScript
      const data = await response.json()
      console.log('[v0] Dados recebidos:', data)

      // Se resposta não for OK (status 200-299)
      if (!response.ok) {
        console.log('[v0] Erro no login:', data.message)
        setError(data.message || 'Erro ao fazer login.')
        setLoading(false)
        return
      }

      // ===== LOGIN BEM-SUCEDIDO =====
      console.log('[v0] Login bem-sucedido!')
      
      // Salva token no contexto (e no localStorage)
      login(data.token)
      
      // Redireciona para página de candidatos
      navigate('/candidatos')

    } catch (err) {
      // Se der erro na conexão com o servidor
      console.error('[v0] Erro ao conectar:', err)
      setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.')
    } finally {
      // Sempre executa, deu certo ou errado
      setLoading(false)
    }
  }

  // ===== RENDERIZAÇÃO (JSX) =====
  return (
    <div className="login-page">
      {/* Fundo animado com estrelas */}
      <StarField />

      <div className="login-container">
        {/* Cabeçalho */}
        <div className="login-header">
          <div className="logo">
            Talent<span>Match</span>
          </div>
          <h1>Bem-vindo de volta</h1>
          <p>Entre com suas credenciais para acessar o sistema</p>
        </div>

        {/* Mensagem de erro (só aparece se tiver erro) */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Formulário de login */}
        <form onSubmit={handleSubmit}>
          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <i className="icon fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Atualiza estado
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <i className="icon fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Checkbox "Lembrar-me" */}
          <div className="remember-forgot">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember">Lembrar-me</label>
            </div>
          </div>

          {/* Botão de submit */}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para página de cadastro */}
        <div className="signup-link">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}
