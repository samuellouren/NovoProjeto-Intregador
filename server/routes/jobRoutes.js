import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Listar todas as vagas
router.get('/jobs', (req, res) => {
  try {
    console.log('[v0] Buscando vagas...')
    const jobs = db.prepare('SELECT * FROM jobs ORDER BY created_at DESC').all()
    res.json(jobs)
  } catch (error) {
    console.error('[v0] Erro ao buscar vagas:', error)
    res.status(500).json({ message: 'Erro ao buscar vagas' })
  }
})

// Adicionar nova vaga
router.post('/jobs', (req, res) => {
  try {
    const { title, company, location, type, salary, description, requirements } = req.body

    // Validação básica
    if (!title || !company || !location || !description) {
      return res.status(400).json({ 
        message: 'Título, empresa, localização e descrição são obrigatórios' 
      })
    }

    console.log('[v0] Adicionando vaga:', title)

    // Insere vaga no banco
    const stmt = db.prepare(`
      INSERT INTO jobs (title, company, location, type, salary, description, requirements)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    
    const result = stmt.run(
      title, 
      company, 
      location, 
      type, 
      salary, 
      description, 
      requirements
    )
    
    res.status(201).json({ 
      message: 'Vaga adicionada com sucesso',
      id: result.lastInsertRowid 
    })
  } catch (error) {
    console.error('[v0] Erro ao adicionar vaga:', error)
    res.status(500).json({ message: 'Erro ao adicionar vaga' })
  }
})

// Atualizar vaga
router.put('/jobs/:id', (req, res) => {
  try {
    const { id } = req.params
    const { title, company, location, type, salary, description, requirements } = req.body

    // Validação básica
    if (!title || !company || !location || !description) {
      return res.status(400).json({ 
        message: 'Título, empresa, localização e descrição são obrigatórios' 
      })
    }

    console.log('[v0] Atualizando vaga:', id)

    // Atualiza vaga no banco
    const stmt = db.prepare(`
      UPDATE jobs 
      SET title = ?, company = ?, location = ?, type = ?, salary = ?, description = ?, requirements = ?
      WHERE id = ?
    `)
    
    const result = stmt.run(
      title, 
      company, 
      location, 
      type, 
      salary, 
      description, 
      requirements,
      id
    )
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Vaga não encontrada' })
    }
    
    res.json({ message: 'Vaga atualizada com sucesso' })
  } catch (error) {
    console.error('[v0] Erro ao atualizar vaga:', error)
    res.status(500).json({ message: 'Erro ao atualizar vaga' })
  }
})

// Deletar vaga
router.delete('/jobs/:id', (req, res) => {
  try {
    const { id } = req.params
    console.log('[v0] Deletando vaga:', id)

    // Remove aplicações da vaga primeiro
    db.prepare('DELETE FROM applications WHERE job_id = ?').run(id)
    
    // Remove vaga
    const stmt = db.prepare('DELETE FROM jobs WHERE id = ?')
    const result = stmt.run(id)
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Vaga não encontrada' })
    }
    
    res.json({ message: 'Vaga removida com sucesso' })
  } catch (error) {
    console.error('[v0] Erro ao deletar vaga:', error)
    res.status(500).json({ message: 'Erro ao deletar vaga' })
  }
})

// Buscar detalhes de uma vaga
router.get('/jobs/:id', (req, res) => {
  try {
    const { id } = req.params
    console.log('[v0] Buscando vaga:', id)
    
    const job = db.prepare('SELECT * FROM jobs WHERE id = ?').get(id)
    
    if (!job) {
      return res.status(404).json({ message: 'Vaga não encontrada' })
    }
    
    // Buscar candidatos aplicados nesta vaga
    const applications = db.prepare(`
      SELECT 
        c.*,
        a.status,
        a.applied_at
      FROM applications a
      JOIN candidates c ON a.candidate_id = c.id
      WHERE a.job_id = ?
      ORDER BY a.applied_at DESC
    `).all(id)
    
    res.json({ ...job, applications })
  } catch (error) {
    console.error('[v0] Erro ao buscar vaga:', error)
    res.status(500).json({ message: 'Erro ao buscar vaga' })
  }
})

export default router
