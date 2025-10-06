const Candidato = require("../models/Candidato");
const Vaga = require("../models/Vaga");
const { calcularCompatibilidade } = require("../utils/compatibilidade");
const { enviarEmailCandidato, emailConfirmacaoCandidatura } = require("../utils/email");

exports.listarCandidatos = async (req, res, next) => {
  try {
    const { vaga, status, busca, pagina = 1, limite = 10, ordenar = "-dataCandidatura" } = req.query;
    const query = { ativo: true };

    if (vaga && vaga !== "all") query.vaga = vaga;
    if (status && status !== "all") query.status = status;
    if (busca?.trim()) query.$text = { $search: busca };

    const skip = (pagina - 1) * limite;
    const candidatos = await Candidato.find(query).sort(ordenar).skip(skip).limit(limite).lean();
    const total = await Candidato.countDocuments(query);

    res.status(200).json({
      sucesso: true,
      dados: candidatos,
      paginacao: {
        paginaAtual: +pagina,
        totalPaginas: Math.ceil(total / limite),
        totalItens: total,
        itensPorPagina: +limite,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.buscarCandidato = async (req, res, next) => {
  try {
    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) return res.status(404).json({ sucesso: false, mensagem: "Candidato não encontrado" });
    res.status(200).json({ sucesso: true, dados: candidato });
  } catch (e) {
    if (e.name === "CastError")
      return res.status(400).json({ sucesso: false, mensagem: "ID de candidato inválido" });
    next(e);
  }
};

exports.criarCandidato = async (req, res, next) => {
  try {
    const { nome, email, vaga, telefone, curriculo, observacoes } = req.body;
    const existente = await Candidato.findOne({ email, ativo: true });
    if (existente) return res.status(400).json({ sucesso: false, mensagem: "Candidato já cadastrado" });

    const vagaExiste = await Vaga.findById(vaga);
    if (!vagaExiste) return res.status(404).json({ sucesso: false, mensagem: "Vaga não encontrada" });
    if (vagaExiste.status !== "aberta")
      return res.status(400).json({ sucesso: false, mensagem: "Vaga não está aberta" });

    const compatibilidade = await calcularCompatibilidade(req.body, vagaExiste);
    const candidato = await Candidato.create({ nome, email, vaga, telefone, curriculo, observacoes, compatibilidade });

    await vagaExiste.adicionarCandidato();
    enviarEmailCandidato(
      candidato,
      "Confirmação de Candidatura - TalentMatch",
      emailConfirmacaoCandidatura(candidato, vagaExiste)
    ).catch((err) => console.error("Erro ao enviar email:", err));

    res.status(201).json({ sucesso: true, mensagem: "Candidato criado", dados: candidato });
  } catch (e) {
    next(e);
  }
};

exports.atualizarCandidato = async (req, res, next) => {
  try {
    ["email", "vaga", "ativo"].forEach((f) => delete req.body[f]);
    const candidato = await Candidato.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!candidato) return res.status(404).json({ sucesso: false, mensagem: "Candidato não encontrado" });
    res.status(200).json({ sucesso: true, mensagem: "Candidato atualizado", dados: candidato });
  } catch (e) {
    next(e);
  }
};

exports.atualizarStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validos = ["new", "screening", "interview", "hired", "rejected"];
    if (!validos.includes(status))
      return res.status(400).json({ sucesso: false, mensagem: "Status inválido", statusValidos: validos });

    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) return res.status(404).json({ sucesso: false, mensagem: "Candidato não encontrado" });

    await candidato.atualizarStatus(status);
    res.status(200).json({ sucesso: true, mensagem: "Status atualizado", dados: candidato });
  } catch (e) {
    next(e);
  }
};

exports.deletarCandidato = async (req, res, next) => {
  try {
    const candidato = await Candidato.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    if (!candidato) return res.status(404).json({ sucesso: false, mensagem: "Candidato não encontrado" });
    res.status(200).json({ sucesso: true, mensagem: "Candidato removido" });
  } catch (e) {
    next(e);
  }
};

exports.buscarQualificados = async (req, res, next) => {
  try {
    const candidatos = await Candidato.buscarQualificados();
    res.status(200).json({ sucesso: true, total: candidatos.length, dados: candidatos });
  } catch (e) {
    next(e);
  }
};

exports.obterEstatisticas = async (req, res, next) => {
  try {
    const estatisticas = await Candidato.obterEstatisticas();
    const total = await Candidato.countDocuments({ ativo: true });
    const qualificados = await Candidato.countDocuments({
      ativo: true,
      status: { $in: ["screening", "interview", "hired"] },
    });

    res.status(200).json({
      sucesso: true,
      dados: {
        total,
        qualificados,
        percentualQualificados: total ? Math.round((qualificados / total) * 100) : 0,
        porStatus: estatisticas,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.enviarMensagem = async (req, res, next) => {
  try {
    const { assunto, mensagem } = req.body;
    if (!assunto || !mensagem)
      return res.status(400).json({ sucesso: false, mensagem: "Assunto e mensagem são obrigatórios" });

    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) return res.status(404).json({ sucesso: false, mensagem: "Candidato não encontrado" });

    const resultado = await enviarEmailCandidato(candidato, assunto, mensagem);
    if (!resultado.sucesso)
      return res.status(500).json({ sucesso: false, mensagem: "Erro ao enviar mensagem", erro: resultado.erro });

    res.status(200).json({ sucesso: true, mensagem: "Mensagem enviada" });
  } catch (e) {
    next(e);
  }
};
