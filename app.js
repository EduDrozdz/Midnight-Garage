const cars = [
  { id: 'bmw', name: 'BMW M3 GTR', title: 'BMW M3 <em>GTR</em>', image: 'assets/bmw.png', origin: 'ALEMANHA / ÍCONE DAS RUAS', subtitle: 'Most Wanted edition', tagline: 'Algumas lendas não precisam de apresentação.', description: 'Prata, azul e uma presença impossível de ignorar. A lenda de Rockport ganha seu lugar na Midnight Garage.', className: 'S', stats: [96, 92, 88], skills: ['Pintura clássica', 'Aerofólio de pista', 'Kit de competição'] },
  { id: 'r34', name: 'Nissan Skyline R34', title: 'SKYLINE <em>R34</em>', image: 'assets/r34.png', origin: 'JAPÃO / PRECISÃO JDM', subtitle: 'Midnight purple edition', tagline: 'Roxo profundo. Presença que fala alto.', description: 'Roxo metálico, rodas escuras e detalhes em carbono. Um projeto japonês com precisão e personalidade em cada curva.', className: 'S', stats: [91, 94, 95], skills: ['Roxo metálico', 'Rodas escuras', 'Detalhes em carbono'] },
  { id: 'supra', name: 'Toyota Supra MK4', title: 'SUPRA <em>MK4</em>', image: 'assets/supra.png', origin: 'JAPÃO / CLÁSSICO A80', subtitle: 'Pearl red edition', tagline: 'Vermelho perolado. Alma de outra era.', description: 'As linhas arredondadas do A80, o aerofólio marcante e o vermelho perolado. Rodas prateadas completam esse clássico personalizado.', className: 'A', stats: [87, 89, 83], skills: ['Vermelho perolado', 'Rodas prateadas', 'Aerofólio marcante'] },
  { id: 'jetta', name: 'Volkswagen Jetta 2011', title: 'JETTA <em>2011</em>', image: 'assets/jetta.png', origin: 'ALEMANHA / ESTILO CLEAN', subtitle: 'Silver low edition', tagline: 'Discreto no visual. Marcante na presença.', description: 'Prata, suspensão baixa e uma frente cheia de personalidade. O Jetta da sua referência, com a elegância de um projeto sem excessos.', className: 'A', stats: [79, 83, 89], skills: ['Prata original', 'Suspensão baixa', 'Visual clean'] }
];
const races = [
  { name: 'Neon District', type: 'Circuito noturno', distance: '4,8 km', detail: 'Curvas técnicas entre luzes roxas.' },
  { name: 'Porto à Meia-noite', type: 'Sprint', distance: '6,2 km', detail: 'Retas longas e asfalto à beira do cais.' },
  { name: 'Serra Fantasma', type: 'Touge', distance: '3,6 km', detail: 'Precisão vale mais do que potência.' }
];
const questions = [
  { question: 'Qual carro da garagem é o ícone de Need for Speed: Most Wanted?', answers: ['Volkswagen Jetta 2011', 'BMW M3 GTR', 'Toyota Supra MK4'], correct: 1, explanation: 'A BMW M3 GTR prata e azul é o carro que marcou Most Wanted.' },
  { question: 'Qual é o código da geração do Toyota Supra MK4?', answers: ['A80', 'A60', 'A70'], correct: 0, explanation: 'O MK4 pertence à geração A80. A60 é o MK2; A70 é o MK3.' },
  { question: 'Qual fabricante criou o Skyline GT-R R34?', answers: ['Nissan', 'Toyota', 'Volkswagen'], correct: 0, explanation: 'O Skyline GT-R R34 é um clássico da Nissan.' }
];
const story = {
  start: { chapter: '01', location: '00:12 / MIDNIGHT GARAGE', title: 'A noite acabou de começar.', text: 'O portão se abre. Seu {car} está pronto. Chegam dois convites para eventos em pistas fechadas: um sprint no porto e um circuito técnico no Neon District. Onde você vai?', choices: [['Seguir para o porto →', 'port'], ['Entrar no Neon District →', 'district']] },
  port: { chapter: '02', location: '00:38 / CIRCUITO DO PORTO', title: 'O peso de uma decisão.', text: 'A pista está úmida. Antes da largada, a equipe oferece uma última volta de reconhecimento. Você pode estudar o traçado ou confiar no que já sabe e largar agora.', choices: [['Fazer a volta de reconhecimento →', 'prepared'], ['Confiar no instinto →', 'instinct']] },
  district: { chapter: '02', location: '00:41 / NEON DISTRICT', title: 'Potência ou precisão?', text: 'As curvas fechadas exigem uma escolha de acerto. Seu {car} pode priorizar a saída das curvas ou a estabilidade nas mudanças de direção.', choices: [['Priorizar estabilidade →', 'precision'], ['Priorizar aceleração →', 'power']] },
  prepared: { chapter: '03', location: '01:05 / LINHA DE CHEGADA', title: 'Conhecimento vira vantagem.', text: 'Você reconhece a parte úmida, ajusta a trajetória e encontra espaço na última curva. Primeiro lugar. A melhor preparação aconteceu antes da largada.', end: true },
  instinct: { chapter: '03', location: '01:07 / ÁREA DOS BOXES', title: 'Uma volta para aprender.', text: 'A pista surpreende na primeira curva. Você recupera o ritmo e termina em terceiro. Volta para a garagem com uma certeza: conhecer o traçado faz diferença.', end: true },
  precision: { chapter: '03', location: '01:10 / NEON DISTRICT', title: 'Sua linha. Sua vitória.', text: 'O carro contorna cada curva com equilíbrio. Uma sequência limpa, sem correções desnecessárias, garante a vitória. Hoje, a precisão decidiu tudo.', end: true },
  power: { chapter: '03', location: '01:12 / NEON DISTRICT', title: 'Por uma fração de segundo.', text: 'Você ganha nas retas, mas perde tempo nas mudanças de direção. Segundo lugar em uma chegada apertada. Na próxima noite, um novo acerto pode mudar a história.', end: true }
};
let selectedCar = cars[0];
let favoriteRace = 0;
let xp = 0;
let questionIndex = 0;
let quizScore = 0;
let answered = false;
let storyNode = 'start';
const $ = selector => document.querySelector(selector);
function navigate(page, updateHash = true) {
  const target = ['garagem', 'corridas', 'desafios', 'historia'].includes(page) ? page : 'garagem';
  document.querySelectorAll('.page').forEach(section => section.hidden = section.id !== target);
  document.querySelectorAll('.nav-item').forEach(button => {
    const active = button.dataset.page === target;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  $('#breadcrumb').textContent = { garagem: 'GARAGEM', corridas: 'CORRIDAS', desafios: 'DESAFIOS', historia: 'DEPOIS DA MEIA-NOITE' }[target];
  if (updateHash && location.hash !== '#' + target) location.hash = target;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function selectCar(id) {
  selectedCar = cars.find(car => car.id === id) || cars[0];
  $('#hero-image').src = selectedCar.image;
  $('#hero-image').alt = selectedCar.name + ' personalizado';
  $('#hero-image').style.objectPosition = id === 'jetta' ? 'center 68%' : 'center 45%';
  $('#car-name').innerHTML = selectedCar.title;
  $('#car-origin').textContent = selectedCar.origin;
  $('#car-index').textContent = '0' + (cars.indexOf(selectedCar) + 1) + ' / 04';
  $('#car-tagline').textContent = selectedCar.tagline;
  $('#car-description').textContent = selectedCar.description;
  $('#car-class').textContent = selectedCar.className;
  $('#car-stats').innerHTML = selectedCar.stats.map((value, index) => `<div class="stat"><div><span>${['Velocidade', 'Aceleração', 'Controle'][index]}</span><b>${value}<span> / 100</span></b></div><progress max="100" value="${value}" aria-label="${['Velocidade', 'Aceleração', 'Controle'][index]} ${value} de 100"></progress></div>`).join('');
  $('#car-skills').innerHTML = selectedCar.skills.map(skill => `<li>${skill}</li>`).join('');
  document.querySelectorAll('.car-card').forEach(button => {
    const active = button.dataset.car === id;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
    button.querySelector('.selected-marker').hidden = !active;
  });
  renderStory();
}
function renderRaces() {
  $('#race-list').innerHTML = races.map((race, index) => `<li class="${index === favoriteRace ? 'favorite' : ''}"><div><h3>${race.name}</h3><p>${race.type} · ${race.distance}<br>${race.detail}</p>${index === favoriteRace ? '<span class="favorite-label">SUA FAVORITA</span>' : ''}</div><button class="favorite-button" data-race="${index}" aria-label="Favoritar ${race.name}" aria-pressed="${index === favoriteRace}">${index === favoriteRace ? '★' : '☆'}</button></li>`).join('');
}
function updateXp(amount) {
  xp = Math.max(0, xp + amount);
  $('#xp-value').value = xp;
  $('#header-xp').textContent = xp + ' XP';
  const level = Math.floor(xp / 100);
  $('#rank').textContent = ['Piloto iniciante', 'Nome nas ruas', 'Respeito conquistado', 'Lenda da garagem'][Math.min(level, 3)];
  $('#xp-progress').value = xp % 100;
  $('#xp-next').textContent = (100 - xp % 100) + ' XP para o próximo nível';
  $('#xp-feedback').textContent = amount > 0 ? '+10 XP. Mais uma volta na sua história.' : xp === 0 ? 'Você está em 0 XP. Hora de voltar à pista.' : '−5 XP. Ajuste a rota e tente de novo.';
}
function renderQuiz() {
  answered = false;
  $('#quiz-feedback').textContent = '';
  $('#quiz-next').hidden = true;
  $('#quiz-score').textContent = quizScore + (quizScore === 1 ? ' ACERTO' : ' ACERTOS');
  $('#quiz-progress').value = questionIndex;
  if (questionIndex === questions.length) {
    $('#quiz-step').textContent = 'DESAFIO CONCLUÍDO';
    $('#quiz-content').innerHTML = `<p class="result-number">${quizScore}<span> / 3</span></p><h2>${quizScore === 3 ? 'Você conhece sua garagem.' : 'Toda lenda começa aprendendo.'}</h2><p>${quizScore === 3 ? 'Pontuação máxima. Respeito conquistado.' : 'Uma nova tentativa, uma chance de acertar mais.'}</p><button id="quiz-restart" class="primary">Tentar novamente ↺</button>`;
    $('#quiz-restart').addEventListener('click', () => { questionIndex = 0; quizScore = 0; renderQuiz(); });
    return;
  }
  const question = questions[questionIndex];
  $('#quiz-step').textContent = 'PERGUNTA 0' + (questionIndex + 1) + ' / 03';
  $('#quiz-content').innerHTML = `<h2>${question.question}</h2><div class="answers">${question.answers.map((answer, index) => `<button class="answer" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>`;
  document.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => answerQuestion(Number(button.dataset.answer))));
}
function answerQuestion(index) {
  if (answered) return;
  answered = true;
  const question = questions[questionIndex];
  const correct = index === question.correct;
  if (correct) quizScore++;
  document.querySelectorAll('.answer').forEach(button => {
    button.disabled = true;
    const answer = Number(button.dataset.answer);
    button.classList.toggle('correct', answer === question.correct);
    button.classList.toggle('wrong', answer === index && !correct);
  });
  $('#quiz-score').textContent = quizScore + (quizScore === 1 ? ' ACERTO' : ' ACERTOS');
  $('#quiz-feedback').textContent = (correct ? 'Acertou! ' : 'Não foi dessa vez. ') + question.explanation;
  $('#quiz-next').textContent = questionIndex === 2 ? 'Ver resultado →' : 'Próxima pergunta →';
  $('#quiz-next').hidden = false;
}
function renderStory(focus = false) {
  const node = story[storyNode];
  $('#story-image').src = selectedCar.image;
  $('#story-image').alt = selectedCar.name + ' selecionado para a história';
  $('#story-chapter').textContent = 'CAPÍTULO ' + node.chapter;
  $('#story-location').textContent = node.location;
  $('#story-heading').textContent = node.title;
  $('#story-text').textContent = node.text.replace('{car}', selectedCar.name);
  $('#story-choices').innerHTML = (node.choices || []).map(([label, destination], index) => `<button class="${index === 0 ? 'primary' : 'secondary'}" data-destination="${destination}">${label}</button>`).join('');
  $('#story-restart').hidden = storyNode === 'start';
  if (focus) $('#story-heading').focus({ preventScroll: true });
}
$('#car-grid').innerHTML = cars.map(car => `<button class="car-card" data-car="${car.id}" aria-pressed="false"><img src="${car.image}" alt="${car.name} personalizado"><span class="selected-marker" hidden>✓</span><span class="card-copy"><strong>${car.name}</strong><small>${car.subtitle}</small></span></button>`).join('');
document.querySelectorAll('.car-card').forEach(button => button.addEventListener('click', () => selectCar(button.dataset.car)));
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => navigate(button.dataset.page)));
window.addEventListener('hashchange', () => navigate(location.hash.slice(1), false));
$('#race-list').addEventListener('click', event => {
  const button = event.target.closest('[data-race]');
  if (!button) return;
  favoriteRace = Number(button.dataset.race);
  renderRaces();
  $(`[data-race="${favoriteRace}"]`).focus();
});
$('#theme-toggle').addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  document.body.classList.remove('night-mode');
  $('#theme-toggle').setAttribute('aria-pressed', String(isLight));
  $('#theme-toggle').innerHTML = '<span>◐</span> Ativar tema ' + (isLight ? 'escuro' : 'claro');
  $('#night-toggle').setAttribute('aria-pressed', 'false');
  $('#night-toggle').innerHTML = 'Ativar modo noturno <span>↗</span>';
  $('#night-message').textContent = 'A cidade está esperando.';
});
$('#night-toggle').addEventListener('click', () => {
  const active = document.body.classList.toggle('night-mode');
  $('#night-toggle').setAttribute('aria-pressed', String(active));
  $('#night-toggle').innerHTML = (active ? 'Desativar modo noturno' : 'Ativar modo noturno') + ' <span>↗</span>';
  $('#night-message').textContent = active ? 'Modo noturno ativado. Neon aceso, garagem pronta.' : 'A cidade está esperando.';
});
$('#add-xp').addEventListener('click', () => updateXp(10));
$('#remove-xp').addEventListener('click', () => updateXp(-5));
$('#quiz-next').addEventListener('click', () => { if (answered) { questionIndex++; renderQuiz(); } });
$('#story-choices').addEventListener('click', event => {
  const button = event.target.closest('[data-destination]');
  if (button) { storyNode = button.dataset.destination; renderStory(true); }
});
$('#story-restart').addEventListener('click', () => { storyNode = 'start'; renderStory(true); });
selectCar('bmw');
renderRaces();
renderQuiz();
navigate(location.hash.slice(1), false);


