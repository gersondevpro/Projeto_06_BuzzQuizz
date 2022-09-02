
let valorURL;
let numeroquestoes;
let url;
let quizz = {};
let titulo;
const infosQuizz = []
function validarURLquizz(){
    try {
         url = new URL(document.querySelector('.url-quizz').value);
        valorURL = true
      } catch(err) {
          valorURL = false
      }
}

// A função irá analisar as condições necessárias para liberar a tela de criação de perguntas
function validacaocriarQuizz(){

    validarURLquizz()
     titulo = document.querySelector('.titlequizz').value
    const stringvazia = titulo.replace(/ /g,'') // pega todos os espaços em branco e cria uma string vazia.
    numeroquestoes = Number(document.querySelector('.question-Number').value)
    const numeroniveis = Number(document.querySelector(".level-Number").value)
    if ((titulo.length>=25 && titulo.length<=65) && (stringvazia!=false) && valorURL && numeroquestoes >= 3 && numeroniveis >=2) {
        return true
    } else {
       return false
    }   
}

// Se a função  acima retornar true, então a tela seguinte será liberada.
function liberarTela3_2(){
    if (validacaocriarQuizz()){
        document.querySelector('.screen3-1').classList.add('hidden')
        document.querySelector('.screen3-2').classList.remove('hidden')
        adicionarPerguntas();
        /* infosQuizz.push(titulo)
        infosQuizz.push(url) */
        quizz.title = titulo;
        quizz.image = url;
        console.log(quizz)
    }
    else {
        alert('Os campos não foram preenchidos corretamente')
    }
    limparInputs();
}

// Essa função irá adicionar o números de questões escolhidas pelo usuário

function adicionarPerguntas(){
    const perguntas = document.querySelector('.screen3-2 main')
    perguntas.innerHTML=''
    for (let i=1; i<=numeroquestoes; i++){
        perguntas.innerHTML+= `<div class="more-questions ">
        <label for="fname">Pergunta ${i}</label>
        <figure botom=${i}>
            <img src="/arquivos/Vector.png" alt="">
        </figure>
    </div>
    <form action="" class="f-makeQuestions hidden pergunta${i}" >
        <div>
            <label for="fname">Pergunta ${i}</label>
            <input type="text" class="text" placeholder="Texto da pergunta">
            <input type="text" class="backgroundcolor" placeholder="Cor de fundo da pergunta">
        </div>
        <div>
            <label for="fname">Resposta correta</label>
            <input type="text" class="right-answer" placeholder="Resposta correta">
            <input type="text" class="URL-image" placeholder="URL da imagem">
        </div>
        <div>
            <label for="fname">Respostas incorretas</label>
            <input type="text" class="wrong-answer-1" placeholder="Resposta incorreta 1">
            <input type="text" class="URL-imagem-1" placeholder="URL da imagem 1">
            <input type="text" class="wrong-answer-2" placeholder="Resposta incorreta 2">
            <input type="text" class="URL-imagem-2" placeholder="URL da imagem 2">
            <input type="text" class="wrong-answer-3" placeholder="Resposta incorreta 3">
            <input type="text" class="URL-imagem-3" placeholder="URL da imagem 3">     
        </div>
    </form>`
    }
   
}

function limparInputs(){
    const limparinput = document.querySelectorAll('.screen3-1 input')
    for (let i=0; i< limparinput.length;i++){
       limparinput[i].value =''
    }
}
let inputLista=[];
function input(){
    console.log(document.querySelector("input").value)
}
/* 
onclick="input() */
