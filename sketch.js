
const perfis = [
  {
    id: 1,
    nome: "Engenheiro de Sistemas",
    categoria: "Construção",
    chave: "construcao", // Chave de busca simplificada sem acentos
    descricao: "Gosta de construir, corrigir falhas e encontrar soluções práticas. Transforma problemas em soluções.",
    recomendacao: "Foque na manutenção estrutural da nave Aura e na montagem dos laboratórios de solo.",
    imagem: "img/perfil-1.jpg"
  },
  {
    id: 2,
    nome: "Cientista Explorador",
    categoria: "Investigação",
    chave: "investigacao",
    descricao: "Gosta de pesquisar, analisar evidências e descobrir como as coisas funcionam.",
    recomendacao: "Lidere a análise laboratorial de elementos biológicos e minerais coletados na superfície.",
    imagem: "img/perfil-2.jpg"
  },
  {
    id: 3,
    nome: "Explorador de Campo",
    categoria: "Exploração",
    chave: "exploracao",
    descricao: "Gosta de descobrir lugares, experimentar alternativas e lidar com situações novas.",
    recomendacao: "Seja o primeiro a descer nas expedições externas tripuladas usando o veículo Rover.",
    imagem: "img/perfil-3.jpg"
  },
  {
    id: 4,
    nome: "Estrategista da Missão",
    categoria: "Planejamento",
    chave: "planejamento",
    descricao: "Gosta de organizar informações, coordenar pessoas e decidir os próximos passos.",
    recomendacao: "Gerencie os cronogramas de risco e garanta a segurança da equipe de comunicação orbital.",
    imagem: "img/perfil-4.jpg"
  }
];

// Mapeamento extra para tratar empates perfeitamente
const empatePerfil = {
  nome: "Especialista Multitarefa",
  categoria: "Suporte Geral",
  descricao: "Você possui habilidades equilibradas em múltiplas frentes, adaptando-se a qualquer necessidade.",
  recomendacao: "Atue como braço direito do comandante, preenchendo lacunas críticas conforme a demanda da missão.",
  imagem: "img/empate.jpg" // Padronizado para a pasta img/
};

// Seleção de elementos do DOM
const quizForm = document.getElementById('quiz-form');
const resultBox = document.getElementById('result-box');
const btnRefazer = document.getElementById('btn-refazer');

// Lógica de envio do formulário
quizForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o recarregamento automático da página

  const nomeInput = document.getElementById('nome').value;
  const dataNascInput = document.getElementById('data-nascimento').value;

  // 2. Validação e cálculo da idade baseados na data atual
  const dataAtual = new Date();
  const dataNascimento = new Date(dataNascInput);

  // Impede o uso de datas futuras
  if (dataNascimento > dataAtual) {
    alert("Erro cronológico! Não é permitido registrar viajantes do tempo com data de nascimento futura.");
    return;
  }

  let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = dataAtual.getMonth();
  const diaAtual = dataAtual.getDate();
  const mesNasc = dataNascimento.getMonth();
  const diaNasc = dataNascimento.getDate();

  // Ajusta a idade se o aniversário ainda não aconteceu no ano atual
  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    id--;
  }

  // Coleta as respostas das 4 perguntas
  const r1 = document.querySelector('input[name="p1"]:checked').value;
  const r2 = document.querySelector('input[name="p2"]:checked').value;
  const r3 = document.querySelector('input[name="p3"]:checked').value;
  const r4 = document.querySelector('input[name="p4"]:checked').value;
  const respostas = [r1, r2, r3, r4];

  // Contagem de pontuação por categoria
  const contagem = { construcao: 0, investigacao: 0, exploracao: 0, planejamento: 0 };
  respostas.forEach(resposta => {
    contagem[resposta]++;
  });

  // Identifica qual categoria teve a maior pontuação
  let maiorPontuacao = 0;
  let categoriaVencedora = '';
  let houveEmpate = false;

  for (const categoria in contagem) {
    if (contagem[categoria] > maiorPontuacao) {
      maiorPontuacao = contagem[categoria];
      categoriaVencedora = categoria;
      houveEmpate = false; // Novo maior valor encontrado, zera indicador de empate
    } else if (contagem[categoria] === maiorPontuacao && maiorPontuacao > 0) {
      houveEmpate = true; // Detectou categorias com pesos idênticos
    }
  }

  // 4. Exibição e montagem dos dados na tela de resultado
  document.getElementById('res-nome').textContent = nomeInput;
  document.getElementById('res-idade').textContent = idade;

  if (houveEmpate) {
    // Trata o empate aplicando as mensagens apropriadas
    document.getElementById('res-perfil').textContent = empatePerfil.nome;
    document.getElementById('res-categoria').textContent = empatePerfil.categoria;
    document.getElementById('res-descricao').textContent = empatePerfil.descricao;
    document.getElementById('res-recomendacao').textContent = empatePerfil.recomendacao;
    document.getElementById('res-imagem').src = empatePerfil.imagem;
  } else {
    // Localiza e recupera os dados usando o atributo 'chave' para evitar quebras por acentuação
    const perfilFiltrado = perfis.find(p => p.chave === categoriaVencedora);
    
    if (perfilFiltrado) {
      document.getElementById('res-perfil').textContent = perfilFiltrado.nome;
      document.getElementById('res-categoria').textContent = perfilFiltrado.categoria;
      document.getElementById('res-descricao').textContent = perfilFiltrado.descricao;
      document.getElementById('res-recomendacao').textContent = perfilFiltrado.recomendacao;
      document.getElementById('res-imagem').src = perfilFiltrado.imagem;
    }
  }

  // Alterna visualmente as caixas na própria tela
  quizForm.classList.add('hidden');
  resultBox.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Move o scroll para o topo para facilitar a visualização
});

// Botão para refazer o teste com o texto "-refaça-"
btnRefazer.addEventListener('click', function() {
  quizForm.reset(); // Limpa todas as marcações e campos de texto
  resultBox.classList.add('hidden');
  quizForm.classList.remove('hidden');
});
