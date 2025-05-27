//Criando o slideShow para apresentação de imagens na página do simulador

//Declarando o array de imagens
let imagens = [
    'src/assets/imagem1',  //onde tá escrito imagem1 é para colocar o nome do arquivo da imagem
    'src/assets/imagem2',
    'src/assets/imagem3'
];

//Declarando array de legendas de cada imagem
let legendas = ['nome da imagem — fonte da imagem', //Aqui são as legendas de cada imagem
    'nome da imagem — fonte da imagem',
    'nome da imagem — fonte da imagem'
    
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

