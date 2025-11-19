import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import axios from 'axios'
import './Settings.css'

export default function Settings() {
  const { user } = useAuth()
  
  // Estado para editar perfil
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  
  // Estado para alterar senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Estado para configurações do sistema
  const [systemSettings, setSystemSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false
  })

  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  // Função para atualizar perfil
  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      console.log('[v0] Atualizando perfil:', profileData)
      
      const response = await axios.put('http://localhost:3000/api/auth/profile', profileData)
      
      // Atualiza localStorage com novos dados
      const updatedUser = { ...user, ...profileData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' })
      console.log('[v0] Perfil atualizado:', response.data)
    } catch (error) {
      console.error('[v0] Erro ao atualizar perfil:', error)
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil' })
    } finally {
      setLoading(false)
    }
  }

  // Função para alterar senha
  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    // Validação simples
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' })
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres' })
      setLoading(false)
      return
    }

    try {
      console.log('[v0] Alterando senha...')
      
      await axios.put('http://localhost:3000/api/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      
      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      console.log('[v0] Senha alterada com sucesso')
    } catch (error) {
      console.error('[v0] Erro ao alterar senha:', error)
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao alterar senha' 
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar configurações do sistema
  const handleSystemSettingsChange = (setting) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
    
    // Salvar no localStorage
    const newSettings = {
      ...systemSettings,
      [setting]: !systemSettings[setting]
    }
    localStorage.setItem('systemSettings', JSON.stringify(newSettings))
    console.log('[v0] Configuração alterada:', setting, newSettings[setting])
  }

  return (
    <div className="settings-page">
      <Header />
      
      <div className="settings-container">
        <h2 className="settings-title">Configurações</h2>

        {message.text && (
          <div className={`settings-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Seção: Editar Perfil */}
        <section className="settings-section">
          <h3 className="section-title">Meu Perfil</h3>
          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        </section>

        {/* Seção: Alterar Senha */}
        <section className="settings-section">
          <h3 className="section-title">Alterar Senha</h3>
          <form onSubmit={handleChangePassword} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Senha atual</label>
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Nova senha</label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar nova senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </button>
          </form>
        </section>

        {/* Seção: Preferências do Sistema */}
        <section className="settings-section">
          <h3 className="section-title">Preferências</h3>
          
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notificações</h4>
                <p>Receber notificações no sistema</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={systemSettings.notifications}
                  onChange={() => handleSystemSettingsChange('notifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Alertas por Email</h4>
                <p>Receber alertas importantes por email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={systemSettings.emailAlerts}
                  onChange={() => handleSystemSettingsChange('emailAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Modo Escuro</h4>
                <p>Ativar tema escuro (em breve)</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={systemSettings.darkMode}
                  onChange={() => handleSystemSettingsChange('darkMode')}
                  disabled
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Seção: Informações do Sistema */}
        <section className="settings-section">
          <h3 className="section-title">Sobre o Sistema</h3>
          <div className="system-info">
            <p><strong>Versão:</strong> 1.0.0</p>
            <p><strong>Sistema:</strong> TalentMatch - Gestão de Candidatos e Vagas</p>
            <p><strong>Desenvolvido para:</strong> Recrutamento Agil e Pratico </p>
          </div>
        </section>
      </div>
    </div>
  )
}
