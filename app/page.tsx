import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Talent<span className="text-purple-400">Match</span>
          </h1>
          <p className="text-white/70 text-lg">
            Sistema de Recrutamento - React/Vite + API MVC
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            Projeto Convertido para React/Vite
          </h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            Este projeto foi convertido de HTML/JS vanilla para React/Vite com uma API REST seguindo arquitetura MVC (Model-View-Controller).
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Como executar o Frontend (React/Vite)
            </h3>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-green-400 mb-3">
              <div className="mb-2"># Instalar dependências</div>
              <div className="mb-2">npm install</div>
              <div className="mb-2"># Executar em desenvolvimento</div>
              <div>npm run dev</div>
            </div>
            <p className="text-white/70 text-sm">
              O app estará disponível em <span className="text-purple-400 font-semibold">http://localhost:5173</span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              Como executar o Backend (API MVC)
            </h3>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-green-400 mb-3">
              <div className="mb-2"># Ir para a pasta do servidor</div>
              <div className="mb-2">cd server</div>
              <div className="mb-2"># Instalar dependências</div>
              <div className="mb-2">npm install</div>
              <div className="mb-2"># Executar em desenvolvimento</div>
              <div>npm run dev</div>
            </div>
            <p className="text-white/70 text-sm">
              A API estará disponível em <span className="text-purple-400 font-semibold">http://localhost:3000</span>
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">📂</span>
              Estrutura do Projeto
            </h3>
            <div className="space-y-2 text-white/80 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">src/</span>
                <span>Frontend React com páginas de Login, Cadastro e Candidatos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">server/</span>
                <span>Backend API com arquitetura MVC (Model-View-Controller)</span>
              </div>
              <div className="flex items-start gap-3 pl-6">
                <span className="text-purple-300">→ models/</span>
                <span>Gerenciamento de dados (SQLite)</span>
              </div>
              <div className="flex items-start gap-3 pl-6">
                <span className="text-purple-300">→ controllers/</span>
                <span>Lógica de negócio</span>
              </div>
              <div className="flex items-start gap-3 pl-6">
                <span className="text-purple-300">→ routes/</span>
                <span>Definição de endpoints</span>
              </div>
              <div className="flex items-start gap-3 pl-6">
                <span className="text-purple-300">→ middlewares/</span>
                <span>Autenticação JWT</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Funcionalidades
            </h3>
            <div className="grid grid-cols-2 gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Cadastro de usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Login com JWT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Listagem de candidatos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Sistema de filtros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Favoritos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Design responsivo</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Importante
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Este projeto usa Vite como bundler, não Next.js. Para visualizar a aplicação completa, 
              você precisa executar os comandos acima em um terminal. O preview do v0 mostra apenas 
              esta página informativa, mas o app React completo está na pasta <span className="text-purple-400 font-mono">src/</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Para mais detalhes, consulte o arquivo <span className="text-purple-400 font-mono">README.md</span>
          </p>
        </div>
      </div>
    </div>
  )
}
