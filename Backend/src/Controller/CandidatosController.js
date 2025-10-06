// controllers/candidatoController.js
// Controller para gerenciar operações de candidatos

const Candidato = require('../models/Candidato');
const Vaga = require('../models/Vaga');
const { calcularCompatibilidade } = require('../utils/compatibilidade');
const { enviarEmailCandidato, emailConfirmacaoCandidatura } = require('../utils/email');

// @desc    Listar todos os candidatos com filtros e paginação
// @route   GET /api/candidatos
// @access  Private
exports.listarCandidatos = async (req, res, next) => {
  try {
    const { 
      vaga, 
      status, 
      busca, 
      pagina = 1, 
      limite = 10,
      ordenar = '-dataCandidatura'
    } = req.query;
    
    // Construir query dinâmica
    let query = { ativo: true };
    
    // Filtro por vaga
    if (vaga && vaga !== 'all') {
      query.vaga = vaga;
    }
    
    // Filtro por status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Busca por texto (nome ou email)
    if (busca && busca.trim()) {
      query.$text = { $search: busca };
    }
    
    // Paginação
    const skip = (parseInt(pagina) - 1) * parseInt(limite);
    
    // Executar query
    const candidatos = await Candidato.find(query)
      .sort(ordenar)
      .skip(skip)
      .limit(parseInt(limite))
      .lean(); // Converte para objeto JavaScript simples (mais performático)
    
    // Contar total de documentos
    const total = await Candidato.countDocuments(query);
    
    res.status(200).json({
      sucesso: true,
      dados: candidatos,
      paginacao: {
        paginaAtual: parseInt(pagina),
        totalPaginas: Math.ceil(total / parseInt(limite)),
        totalItens: total,
        itensPorPagina: parseInt(limite)
      }
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Buscar candidato por ID
// @route   GET /api/candidatos/:id
// @access  Private
exports.buscarCandidato = async (req, res, next) => {
  try {
    const candidato = await Candidato.findById(req.params.id);
    
    if (!candidato) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Candidato não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      dados: candidato
    });
  } catch (erro) {
    // Se o ID for inválido, retorna 400
    if (erro.name === 'CastError') {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID de candidato inválido'
      });
    }
    next(erro);
  }
};

// @desc    Criar novo candidato
// @route   POST /api/candidatos
// @access  Private
exports.criarCandidato = async (req, res, next) => {
  try {
    const { nome, email, vaga, telefone, curriculo, observacoes } = req.body;
    
    // Verificar se email já existe
    const candidatoExistente = await Candidato.findOne({ email, ativo: true });
    if (candidatoExistente) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Já existe um candidato cadastrado com este email'
      });
    }
    
    // Verificar se vaga existe e está aberta
    const vagaExiste = await Vaga.findById(vaga);
    if (!vagaExiste) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Vaga não encontrada'
      });
    }
    
    if (vagaExiste.status !== 'aberta') {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Esta vaga não está mais aberta para candidaturas'
      });
    }
    
    // Calcular compatibilidade
    const compatibilidade = await calcularCompatibilidade(req.body, vagaExiste);
    
    // Criar candidato
    const candidato = await Candidato.create({
      nome,
      email,
      vaga,
      telefone,
      curriculo,
      observacoes,
      compatibilidade
    });
    
    // Atualizar contador de candidatos na vaga
    await vagaExiste.adicionarCandidato();
    
    // Enviar email de confirmação (não aguardar)
    enviarEmailCandidato(
      candidato,
      'Confirmação de Candidatura - TalentMatch',
      emailConfirmacaoCandidatura(candidato, vagaExiste)
    ).catch(err => console.error('Erro ao enviar email:', err));
    
    res.status(201).json({
      sucesso: true,
      mensagem: 'Candidato criado com sucesso',
      dados: candidato
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Atualizar candidato
// @route   PUT /api/candidatos/:id
// @access  Private
exports.atualizarCandidato = async (req, res, next) => {
  try {
    // Campos que não podem ser atualizados por esta rota
    delete req.body.email;
    delete req.body.vaga;
    delete req.body.ativo;
    
    const candidato = await Candidato.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Retorna o documento atualizado
        runValidators: true // Executa validações do schema
      }
    );
    
    if (!candidato) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Candidato não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Candidato atualizado com sucesso',
      dados: candidato
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Atualizar status do candidato
// @route   PATCH /api/candidatos/:id/status
// @access  Private
exports.atualizarStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    // Validar status
    const statusValidos = ['new', 'screening', 'interview', 'hired', 'rejected'];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Status inválido',
        statusValidos
      });
    }
    
    const candidato = await Candidato.findById(req.params.id);
    
    if (!candidato) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Candidato não encontrado'
      });
    }
    
    // Usar método do model para atualizar status
    await candidato.atualizarStatus(status);
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Status atualizado com sucesso',
      dados: candidato
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Deletar candidato (soft delete)
// @route   DELETE /api/candidatos/:id
// @access  Private
exports.deletarCandidato = async (req, res, next) => {
  try {
    const candidato = await Candidato.findByIdAndUpdate(
      req.params.id,
      { ativo: false },
      { new: true }
    );
    
    if (!candidato) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Candidato não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Candidato removido com sucesso'
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Buscar candidatos qualificados
// @route   GET /api/candidatos/qualificados
// @access  Private
exports.buscarQualificados = async (req, res, next) => {
  try {
    const candidatos = await Candidato.buscarQualificados();
    
    res.status(200).json({
      sucesso: true,
      total: candidatos.length,
      dados: candidatos
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Obter estatísticas de candidatos
// @route   GET /api/candidatos/estatisticas
// @access  Private
exports.obterEstatisticas = async (req, res, next) => {
  try {
    const estatisticas = await Candidato.obterEstatisticas();
    
    // Calcular totais gerais
    const total = await Candidato.countDocuments({ ativo: true });
    const qualificados = await Candidato.countDocuments({
      ativo: true,
      status: { $in: ['screening', 'interview', 'hired'] }
    });
    
    res.status(200).json({
      sucesso: true,
      dados: {
        total,
        qualificados,
        percentualQualificados: total > 0 ? Math.round((qualificados / total) * 100) : 0,
        porStatus: estatisticas
      }
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Enviar mensagem para candidato
// @route   POST /api/candidatos/:id/mensagem
// @access  Private
exports.enviarMensagem = async (req, res, next) => {
  try {
    const { assunto, mensagem } = req.body;
    
    if (!assunto || !mensagem) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Assunto e mensagem são obrigatórios'
      });
    }
    
    const candidato = await Candidato.findById(req.params.id);
    
    if (!candidato) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Candidato não encontrado'
      });
    }
    
    // Enviar email
    const resultado = await enviarEmailCandidato(candidato, assunto, mensagem);
    
    if (!resultado.sucesso) {
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao enviar mensagem',
        erro: resultado.erro
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Mensagem enviada com sucesso'
    });
  } catch (erro) {
    next(erro);
  }
};