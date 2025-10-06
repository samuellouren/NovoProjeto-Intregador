const mongoose = require('mongoose');

const candidatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [3, 'Nome deve ter no mínimo 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  telefone: {
    type: String,
    match: [/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato inválido. Use: (99) 99999-9999']
  },
  iniciais: {
    type: String,
    required: true,
    maxlength: 2,
    uppercase: true
  },
  vaga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaga',
    required: [true, 'Vaga é obrigatória']
  },
  status: {
    type: String,
    enum: {
      values: ['new', 'screening', 'interview', 'hired', 'rejected'],
      message: 'Status inválido'
    },
    default: 'new'
  },
  compatibilidade: {
    type: Number,
    min: [0, 'Compatibilidade deve ser no mínimo 0'],
    max: [100, 'Compatibilidade deve ser no máximo 100'],
    default: 0
  },
  dataCandidatura: {
    type: Date,
    default: Date.now
  },
  curriculo: {
    type: String,
    trim: true
  },
  observacoes: {
    type: String,
    maxlength: [1000, 'Observações não podem exceder 1000 caracteres']
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

candidatoSchema.index({ email: 1 });
candidatoSchema.index({ status: 1 });
candidatoSchema.index({ vaga: 1 });
candidatoSchema.index({ dataCandidatura: -1 });
candidatoSchema.index({ nome: 'text', email: 'text' });

candidatoSchema.virtual('nomeCompleto').get(function() {
  return this.nome.split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(' ');
});

candidatoSchema.virtual('diasDesdeCandidatura').get(function() {
  const hoje = new Date();
  const diferenca = hoje - this.dataCandidatura;
  return Math.floor(diferenca / (1000 * 60 * 60 * 24));
});

candidatoSchema.pre('save', function(next) {
  if (this.isModified('nome')) {
    const palavras = this.nome.trim().split(' ');
    this.iniciais = (palavras[0][0] + (palavras[1]?.[0] || palavras[0][1] || '')).toUpperCase();
  }
  next();
});

candidatoSchema.pre(/^find/, function(next) {
  this.populate({ path: 'vaga', select: 'titulo departamento status' });
  next();
});

candidatoSchema.methods.atualizarStatus = async function(novoStatus) {
  const statusValidos = ['new', 'screening', 'interview', 'hired', 'rejected'];
  if (!statusValidos.includes(novoStatus)) throw new Error('Status inválido');
  this.status = novoStatus;
  return await this.save();
};

candidatoSchema.methods.estaQualificado = function() {
  return ['screening', 'interview', 'hired'].includes(this.status);
};

candidatoSchema.statics.buscarQualificados = function() {
  return this.find({
    status: { $in: ['screening', 'interview', 'hired'] },
    ativo: true
  });
};

candidatoSchema.statics.obterEstatisticas = async function() {
  const stats = await this.aggregate([
    { $match: { ativo: true } },
    {
      $group: {
        _id: '$status',
        total: { $sum: 1 },
        mediaCompatibilidade: { $avg: '$compatibilidade' }
      }
    }
  ]);
  return stats;
};

module.exports = mongoose.model('Candidato', candidatoSchema);
