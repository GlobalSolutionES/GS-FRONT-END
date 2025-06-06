//Criando o slideShow para apresentação de imagens na página do simulador

//Declarando o array de imagens
let imagens = [
    '../imgs/enchente1.webp',  //onde tá escrito imagem1 é para colocar o nome do arquivo da imagem
    '../imgs/enchente2.webp',
    '../imgs/enchente3.jpeg'
];

//Declarando array de legendas de cada imagem
let legendas = ['Pessoas caminham em uma rua inundada devido a fortes enchentes no bairro propenso a inundações de Jardim Pantanal, em São Paulo, Brasil, 4 de fevereiro de 2025. REUTERS/Tuane Fernandes', //Aqui são as legendas de cada imagem
    'Enchentes provocadas pelas chuvas deixaram 1,4 milhão de pessoas desabrigadas, segundo IBGE. Antonio Cruz/Agência Brasil',
    'O Acre sobre com enchentes (foto); mais de 32.000 pessoas foram afetadas pelas cheias do Rio Acre. Foto - Poder360'
];

//Declarando as variáveis
let i = 0; 
let tempo = 3000; //3 segundos para visualização de cada imagem

//Criando a função slideShow para as imagens e legendas
function slideShow(){
    document.getElementById('imagens').src=imagens[i];
    document.getElementById('legenda').textContent = legendas[i];
    i++;

    if(i == imagens.length){
        i = 0;
    }
   
    setTimeout("slideShow()", tempo);

}

//Chamando a função
slideShow();

//Parte do formulário (com registro de info no localStorage e exibição delas)

document.addEventListener('DOMContentLoaded', () => {
  const initialOptions = document.getElementById('opcaoInicial');
  const loginForm = document.getElementById('formLogin');
  const registerForm = document.getElementById('formCad');
  const userInfo = document.getElementById('infoUser');

  const btnLogin = document.getElementById('btnLogin');
  const btnCad = document.getElementById('btnCad');
  const backFromLogin = document.getElementById('voltarLogin');
  const backFromRegister = document.getElementById('voltarCad');
  const logoutButton = document.getElementById('btnSair');

  const loginMessage = document.getElementById('mensagemLogin');
  const registerMessage = document.getElementById('mensagemCad');

  btnLogin.addEventListener('click', () => {
    hideAll();
    loginForm.classList.remove('hidden');
  });

  btnCad.addEventListener('click', () => {
    hideAll();
    registerForm.classList.remove('hidden');
  });

  backFromLogin.addEventListener('click', () => {
    hideAll();
    initialOptions.classList.remove('hidden');
    loginMessage.textContent = '';
    loginMessage.className = 'message';
  });

  backFromRegister.addEventListener('click', () => {
    hideAll();
    initialOptions.classList.remove('hidden');
    registerMessage.textContent = '';
    registerMessage.className = 'message';
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    hideAll();
    initialOptions.classList.remove('esconder');
  });

  function hideAll() {
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    userInfo.classList.add('hidden');
    initialOptions.classList.add('hidden');
  }

  // Cadastro
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const idade = document.getElementById('cadIdade').value;
    const local = document.getElementById('cadLocal').value;
    const emailOuUser = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;

    if (localStorage.getItem(`user_${emailOuUser}`)) {
      registerMessage.textContent = 'Usuário já existe.';
      registerMessage.className = 'message error';
    } else {
      localStorage.setItem(`user_${emailOuUser}`, senha);
      localStorage.setItem(`nome_${emailOuUser}`, nome);
      localStorage.setItem(`idade_${emailOuUser}`, idade);
      localStorage.setItem(`local_${emailOuUser}`, local);
      registerMessage.textContent = 'Cadastro realizado com sucesso!';
      registerMessage.className = 'message success';
      registerForm.reset();
    }
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginSenha').value;

    const storedPassword = localStorage.getItem(`user_${username}`);
    if (storedPassword && storedPassword === password) {
      const nome = localStorage.getItem(`nome_${username}`) || 'Não informado';
      const idade = localStorage.getItem(`idade_${username}`) || 'Não informada';
      const local = localStorage.getItem(`local_${username}`) || 'Não informado';

      document.getElementById('info-nome').textContent = nome;
      document.getElementById('info-idade').textContent = idade;
      document.getElementById('info-local').textContent = local;
      document.getElementById('info-email').textContent = username;

      hideAll();
      userInfo.classList.remove('hidden');
    } else {
      loginMessage.textContent = 'Usuário ou senha incorretos.';
      loginMessage.className = 'message error';
    }
  });
});


//Parte do Quiz
document.addEventListener('DOMContentLoaded', () => {
  const pergunta = document.getElementById('pergunta');
  const respostaInput = document.getElementById('resposta');
  const selectEstado = document.getElementById('select-estado');
  const proximaPergunta = document.getElementById("proximo");
  const mensagem = document.getElementById('message');
  const containerPerguntas = document.getElementById('container-perguntas');
  const containerResultado = document.getElementById('container-resultado');
  const listaResultado = document.getElementById('lista-resultado');
  const riscoTexto = document.getElementById('risco-enchente');
  const reiniciarBotao = document.getElementById('inicio-btn');

  const questoes = [
    "Qual seu nome?",
    "Qual sua idade?",
    "Em qual estado você mora?",
    "Você já presenciou enchentes na sua região?",
    "Sua casa fica próxima a rios ou córregos?",
    "Existe sistema de drenagem eficiente na sua rua?",
    "A região onde você mora sofre com alagamentos frequentes?",
    "Você ou sua família já foi prejudicada por enchentes?",
    "O que pode causar o entupimento de bueiros e aumentar o risco de enchentes nas cidades?",
    "Por que é perigoso tentar atravessar ruas alagadas durante uma enchente?",
    "Qual o papel das áreas verdes na prevenção de enchentes urbanas?",
    "Que atitude simples a população pode adotar para ajudar a prevenir enchentes?",
    "O que deve ser feito com aparelhos eletrônicos durante uma enchente iminente?",
    "O que é um sistema de alerta de enchentes e para que serve?",
    "Na sua opinião, você tem o conhecimento esperado para agir diante de uma situação de Enchente?"
  ];

  const tiposResposta = [
    "texto", "texto", "estado", "texto", "texto", "texto", "texto", "texto", "texto", "texto", "texto", "texto", "texto", "texto", "texto" 
  ];

  let perguntas = 0;
  const respostas = [];

  function mostrarPergunta() {
    if (perguntas < questoes.length) {
      pergunta.textContent = questoes[perguntas];
      mensagem.textContent = '';

      if (tiposResposta[perguntas] === "estado") {
        respostaInput.classList.add('hidden');
        selectEstado.classList.remove('hidden');
        selectEstado.value = "";
      } else {
        respostaInput.classList.remove('hidden');
        selectEstado.classList.add('hidden');
        respostaInput.value = "";
      }
    } else {
      mostrarResultado();
    }
  }

  function avaliarRisco(estado) {
    const alto = ["Minas Gerais", "São Paulo", "Rio de Janeiro", "Espírito Santo", "Santa Catarina", "Rio Grande do Sul", "Bahia", "Maranhão", "Pernambuco", "Pará", "Amazonas"];
    const medio = ["Paraná", "Ceará", "Mato Grosso", "Mato Grosso do Sul"];

    if (alto.includes(estado)) {
      return "Alto risco de enchentes no seu estado!";
    } else if (medio.includes(estado)) {
      return "Médio risco de enchentes no seu estado.";
    } else {
      return "Baixo risco de enchentes no seu estado.";
    }
  }

  function mostrarResultado() {
    containerPerguntas.classList.add('hidden');
    containerResultado.classList.remove('hidden');
    listaResultado.innerHTML = '';

    questoes.forEach((q, index) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${q}</strong><br>Sua Resposta: <span>${respostas[index]}</span>`;
      listaResultado.appendChild(item);
    });

    const estadoUsuario = respostas[2].trim();
    riscoTexto.textContent = `⚠️ ${avaliarRisco(estadoUsuario)}`;
  }

  function nextQuestao() {
    let respostaAtual = "";

    if (tiposResposta[perguntas] === "estado") {
      respostaAtual = selectEstado.value.trim();
      if (respostaAtual === "") {
        mensagem.textContent = "Por favor, selecione um estado.";
        return;
      }
    } else {
      respostaAtual = respostaInput.value.trim();
      if (respostaAtual === "") {
        mensagem.textContent = "Por favor, digite sua resposta.";
        return;
      }
    }

    respostas.push(respostaAtual);
    perguntas++;
    mostrarPergunta();
  }

  function reiniciarQuiz() {
    perguntas = 0;
    respostas.length = 0;
    containerResultado.classList.add('hidden');
    containerPerguntas.classList.remove('hidden');
    mostrarPergunta();
  }

  proximaPergunta.addEventListener('click', nextQuestao);
  reiniciarBotao.addEventListener('click', reiniciarQuiz);

  mostrarPergunta();
});


const map = L.map('mapaid').setView([-23.5505, -46.6333], 5);  

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const dadosRios = [
    {
        nome: "Rio Amazonas",
        regiao: "Norte",
        coordenadas: [-3.1, -60.0],
        nivel: "Alto"
    },
    {
        nome: "Rio São Francisco",
        regiao: "Nordeste",
        coordenadas: [-10.0, -40.0],
        nivel: "Normal"
    },
    {
        nome: "Rio Paraná",
        regiao: "Sul",
        coordenadas: [-23.3, -51.2],
        nivel: "Baixo"
    },
    {
        nome: "Rio Paraíba do Sul",
        regiao: "Sudeste",
        coordenadas: [-22.5, -44.6],
        nivel: "Normal"
    },
    {
        nome: "Rio Araguaia",
        regiao: "Centro-Oeste",
        coordenadas: [-13.3, -50.6],
        nivel: "Normal"
    }
];


function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function mapa(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    const locationInfo = document.getElementById('localizacao');

    let rioMaisProximo = null;
    let menorDistancia = Infinity;

    dadosRios.forEach(rio => {
        const [latRio, lonRio] = rio.coordenadas;
        const dist = calcularDistancia(lat, lon, latRio, lonRio);

        if (dist < menorDistancia) {
            menorDistancia = dist;
            rioMaisProximo = rio;
        }
    });

    let mensagem = `Localização: Latitude ${lat.toFixed(5)}, Longitude ${lon.toFixed(5)}.`;

    // Definindo um limite de 500 km para considerar "próximo"
    if (rioMaisProximo && menorDistancia < 500) {
        mensagem += `<br>Rio mais próximo: <strong>${rioMaisProximo.nome}</strong> (${rioMaisProximo.regiao})<br>Nível atual: <strong>${rioMaisProximo.nivel}</strong>`;
    } else {
        mensagem += "<br><strong>Nenhum rio conhecido está próximo deste ponto.</strong>";
    }

    locationInfo.innerHTML = mensagem;

    L.marker(e.latlng).addTo(map)
        .bindPopup(mensagem)
        .openPopup();
}

map.on('click', mapa);

dadosRios.forEach(rio => {
    L.marker(rio.coordenadas)
     .addTo(map)
     .bindPopup(`<strong>${rio.nome}</strong><br>Região: ${rio.regiao}<br>Nível: ${rio.nivel}`);
});
