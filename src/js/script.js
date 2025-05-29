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
    loginForm.classList.remove('esconder');
  });

  btnCad.addEventListener('click', () => {
    hideAll();
    registerForm.classList.remove('esconder');
  });

  backFromLogin.addEventListener('click', () => {
    hideAll();
    initialOptions.classList.remove('esconder');
    loginMessage.textContent = '';
    loginMessage.className = 'message';
  });

  backFromRegister.addEventListener('click', () => {
    hideAll();
    initialOptions.classList.remove('esconder');
    registerMessage.textContent = '';
    registerMessage.className = 'message';
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    hideAll();
    initialOptions.classList.remove('esconder');
  });

  function hideAll() {
    loginForm.classList.add('esconder');
    registerForm.classList.add('esconder');
    userInfo.classList.add('esconder');
    initialOptions.classList.add('esconder');
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
      userInfo.classList.remove('esconder');
    } else {
      loginMessage.textContent = 'Usuário ou senha incorretos.';
      loginMessage.className = 'message error';
    }
  });
});



