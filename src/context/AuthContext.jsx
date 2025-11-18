import { createContext, useState, useContext, useEffect } from 'react'

// ===== O QUE É CONTEXTO? =====
// Contexto permite compartilhar dados entre componentes sem passar props manualmente
// Neste caso, compartilha informações de autenticação (token, usuário)

// Cria contexto de autenticação
const AuthContext = createContext()

// ===== PROVIDER (PROVEDOR) =====
// Componente que envolve toda a aplicação e fornece o contexto
export function AuthProvider({ children }) {
  
  // ===== ESTADOS =====
  
  // Token JWT (pega do localStorage se existir)
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token')
    console.log('[v0] Token recuperado do localStorage:', savedToken ? 'Sim' : 'Não')
    return savedToken
  })
  
  // Informações do usuário logado
  const [user, setUser] = useState(null)
  
  // Indica se está carregando
  const [loading, setLoading] = useState(false)

  // ===== EFEITO: SINCRONIZA TOKEN COM LOCALSTORAGE =====
  // Sempre que token mudar, salva ou remove do localStorage
  useEffect(() => {
    if (token) {
      console.log('[v0] Salvando token no localStorage')
      localStorage.setItem('token', token)
    } else {
      console.log('[v0] Removendo token do localStorage')
      localStorage.removeItem('token')
    }
  }, [token])  // Executa quando token mudar

  // ===== FUNÇÃO DE LOGIN =====
  const login = (newToken) => {
    console.log('[v0] Login: salvando token')
    setToken(newToken)
    // Aqui você poderia decodificar o token para pegar dados do usuário
    // const decoded = jwt_decode(newToken)
    // setUser(decoded)
  }

  // ===== FUNÇÃO DE LOGOUT =====
  const logout = () => {
    console.log('[v0] Logout: removendo token e dados do usuário')
    setToken(null)
    setUser(null)
  }

  // ===== VERIFICA SE ESTÁ AUTENTICADO =====
  const isAuthenticated = () => {
    return !!token  // Retorna true se token existir
  }

  // ===== VALOR DO CONTEXTO =====
  // Estes valores e funções estarão disponíveis em toda a aplicação
  const value = {
    token,        // Token JWT
    user,         // Dados do usuário
    loading,      // Estado de carregamento
    login,        // Função para fazer login
    logout,       // Função para fazer logout
    isAuthenticated  // Função para verificar se está logado
  }

  // Retorna Provider com os valores
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ===== HOOK PERSONALIZADO =====
// Facilita uso do contexto em outros componentes
export function useAuth() {
  const context = useContext(AuthContext)
  
  // Se tentar usar fora do Provider, mostra erro
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  
  return context
}

// ===== COMO USAR EM OUTROS COMPONENTES =====
/*
import { useAuth } from './context/AuthContext'

function MeuComponente() {
  const { token, user, login, logout, isAuthenticated } = useAuth()
  
  if (isAuthenticated()) {
    return <div>Olá, {user?.name}!</div>
  }
  
  return <div>Faça login</div>
}
*/
