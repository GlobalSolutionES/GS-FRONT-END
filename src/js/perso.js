//Parte do seletor de cores
document.addEventListener('DOMContentLoaded', function () {
    const temas = {
        'tema-classico': { fundo: '#FFFFFF', destaque: '#2C3E50' },
        'tema-aqua': { fundo: '#e9f5f9', destaque: '#2a9d8f' },
        'tema-quente': { fundo: '#fff8e6', destaque: '#e07a5f' },
        'tema-lilas': { fundo: '#f5e9f9', destaque: '#6a4c93' },
        'noturno': { fundo: '#7070a0', destaque: '#2f2f5c'}
    };

    const botoesTema = document.querySelectorAll('[data-tema]');

    // Aplica o tema salvo ao carregar
    const temaSalvo = localStorage.getItem('temaAtivo');
    if (temaSalvo && temas[temaSalvo]) {
        aplicarTema(temaSalvo);
    }

    // Ativa os cliques para qualquer botão com data-tema
    botoesTema.forEach(botao => {
        botao.addEventListener('click', () => {
            const temaId = botao.dataset.tema;
            if (temas[temaId]) {
                aplicarTema(temaId);
            }
        });
    });

    function aplicarTema(temaId) {
        const tema = temas[temaId];

        document.documentElement.style.setProperty('--cor-fundo', tema.fundo);
        document.documentElement.style.setProperty('--cor-destaque', tema.destaque);

        //Atualiza visual
        botoesTema.forEach(botao => botao.classList.remove('ativa'));
        document.querySelectorAll(`[data-tema="${temaId}"]`).forEach(botao => botao.classList.add('ativa'));

        localStorage.setItem('temaAtivo', temaId);
    }
});

//Aparecer suave nas seções ao rolar (scroll reveal)

const secoes = document.querySelectorAll('.container-secao');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aparecer');
    }
  });
}, { threshold: 0.1 });

secoes.forEach(secao => observer.observe(secao));
