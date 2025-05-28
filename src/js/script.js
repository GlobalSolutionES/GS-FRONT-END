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

