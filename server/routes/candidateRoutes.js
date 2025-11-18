import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Listar todos os candidatos
router.get('/candidates', (req, res) => {
  try {
    console.log('[v0] Buscando candidatos...')
    const candidates = db.prepare('SELECT * FROM candidates ORDER BY created_at DESC').all()
    res.json(candidates)
  } catch (error) {
    console.error('[v0] Erro ao buscar candidatos:', error)
    res.status(500).json({ message: 'Erro ao buscar candidatos' })
  }
})

// Adicionar novo candidato
router.post('/candidates', (req, res) => {
  try {
    const { name, email, phone, skills, experience, education } = req.body

    // Validação básica
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' })
    }

    console.log('[v0] Adicionando candidato:', name)

    // Insere candidato no banco
    const stmt = db.prepare(`
      INSERT INTO candidates (name, email, phone, skills, experience, education)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    
    const result = stmt.run(name, email, phone, skills, experience, education)
    
    res.status(201).json({ 
      message: 'Candidato adicionado com sucesso',
      id: result.lastInsertRowid 
    })
  } catch (error) {
    console.error('[v0] Erro ao adicionar candidato:', error)
    
    // Verifica se é erro de email duplicado
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }
    
    res.status(500).json({ message: 'Erro ao adicionar candidato' })
  }
})

// Atualizar candidato
router.put('/candidates/:id', (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, skills, experience, education } = req.body

    // Validação básica
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' })
    }

    console.log('[v0] Atualizando candidato:', id)

    // Atualiza candidato no banco
    const stmt = db.prepare(`
      UPDATE candidates 
      SET name = ?, email = ?, phone = ?, skills = ?, experience = ?, education = ?
      WHERE id = ?
    `)
    
    const result = stmt.run(name, email, phone, skills, experience, education, id)
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' })
    }
    
    res.json({ message: 'Candidato atualizado com sucesso' })
  } catch (error) {
    console.error('[v0] Erro ao atualizar candidato:', error)
    
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }
    
    res.status(500).json({ message: 'Erro ao atualizar candidato' })
  }
})

// Deletar candidato
router.delete('/candidates/:id', (req, res) => {
  try {
    const { id } = req.params
    console.log('[v0] Deletando candidato:', id)

    // Remove aplicações do candidato primeiro
    db.prepare('DELETE FROM applications WHERE candidate_id = ?').run(id)
    
    // Remove candidato
    const stmt = db.prepare('DELETE FROM candidates WHERE id = ?')
    const result = stmt.run(id)
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' })
    }
    
    res.json({ message: 'Candidato removido com sucesso' })
  } catch (error) {
    console.error('[v0] Erro ao deletar candidato:', error)
    res.status(500).json({ message: 'Erro ao deletar candidato' })
  }
})

// Buscar candidato específico
router.get('/candidates/:id', (req, res) => {
  try {
    const { id } = req.params
    console.log('[v0] Buscando candidato:', id)
    
    const candidate = db.prepare('SELECT * FROM candidates WHERE id = ?').get(id)
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidato não encontrado' })
    }
    
    // Buscar vagas que o candidato se aplicou
    const applications = db.prepare(`
      SELECT 
        j.*,
        a.status,
        a.applied_at
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.candidate_id = ?
      ORDER BY a.applied_at DESC
    `).all(id)
    
    res.json({ ...candidate, applications })
  } catch (error) {
    console.error('[v0] Erro ao buscar candidato:', error)
    res.status(500).json({ message: 'Erro ao buscar candidato' })
  }
})

// Candidatar um candidato a uma vaga específica
router.post('/candidates/:candidateId/apply/:jobId', (req, res) => {
  try {
    const { candidateId, jobId } = req.params
    console.log('[v0] Candidatando candidato', candidateId, 'para vaga', jobId)
    
    const stmt = db.prepare(`
      INSERT INTO applications (candidate_id, job_id)
      VALUES (?, ?)
    `)
    
    const result = stmt.run(candidateId, jobId)
    
    res.status(201).json({ 
      message: 'Candidato adicionado à vaga com sucesso',
      id: result.lastInsertRowid 
    })
  } catch (error) {
    console.error('[v0] Erro ao candidatar:', error)
    
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Candidato já está nesta vaga' })
    }
    
    res.status(500).json({ message: 'Erro ao candidatar à vaga' })
  }
})

export default router
