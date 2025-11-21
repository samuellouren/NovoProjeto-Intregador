import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const db = new Database(join(__dirname, '../data/users.db'))

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create candidates table
db.exec(`
  CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    skills TEXT,
    experience TEXT,
    education TEXT,
    status TEXT DEFAULT 'novo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create jobs table
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    salary TEXT,
    description TEXT NOT NULL,
    requirements TEXT,
    keywords TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create applications table
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    compatibility INTEGER DEFAULT 0,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    UNIQUE(candidate_id, job_id)
  )
`)

// Migration: Add status column to candidates table if it doesn't exist
try {
  db.exec(`ALTER TABLE candidates ADD COLUMN status TEXT DEFAULT 'novo'`)
} catch (error) {
  // Column already exists, ignore error
}

// Migration: Add compatibility column to applications table if it doesn't exist
try {
  db.exec(`ALTER TABLE applications ADD COLUMN compatibility INTEGER DEFAULT 0`)
} catch (error) {
  // Column already exists, ignore error
}

// Migration: Add keywords column to jobs table if it doesn't exist
try {
  db.exec(`ALTER TABLE jobs ADD COLUMN keywords TEXT`)
  console.log('[v0] Coluna keywords adicionada à tabela jobs')
} catch (error) {
  // Coluna já existe
}

// Migration: Add max_candidates column to jobs table if it doesn't exist
try {
  db.exec(`ALTER TABLE jobs ADD COLUMN max_candidates INTEGER DEFAULT 10`)
  console.log('[v0] Coluna max_candidates adicionada à tabela jobs')
} catch (error) {
  if (!error.message.includes('duplicate column')) {
    console.log('[v0] Coluna max_candidates já existe ou erro ignorado:', error.message)
  }
}

export default db
