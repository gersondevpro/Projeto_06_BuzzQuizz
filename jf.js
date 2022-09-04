
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
        quizz.title = titulo;
        quizz.image = url
        
    }
    else {
        alert('Os campos não foram preenchidos corretamente')
       
    }
    limparInputs();
    console.log(titulo)
}


// Essa função irá adicionar o números de questões escolhidas pelo usuário
function adicionarPerguntas(){
    const perguntas = document.querySelector('.screen3-2 main')
    perguntas.innerHTML=''

    for (let i=1; i<= numeroquestoes; i++){
        perguntas.innerHTML+= `<div class="more-questions ">
        <label for="fname">Pergunta ${i}</label>
        <figure >
            <img  onclick="abrirPerguntas(this)"numero=${i} src="/arquivos/Vector.png" alt="">
        </figure>
    </div>
    <form action="" class="f-makeQuestions hidden pergunta${i}" >
        <div>
            <label for="fname">Pergunta ${i}</label>
            <input type="text"  class="question${i}" placeholder="Texto da pergunta">
            <input type="text" class="question${i}" placeholder="Cor de fundo da pergunta">
        </div>
        <div>
            <label for="fname">Resposta correta</label>
            <input type="text" class="question${i}" placeholder="Resposta correta">
            <input type="text" class="question${i}" placeholder="URL da imagem">
        </div>
        <div>
            <label for="fname">Respostas incorretas</label>
            <input type="text" class="question${i}" placeholder="Resposta incorreta 1">
            <input type="text" class="question${i}" placeholder="URL da imagem 1">
            <input type="text" class="question${i}" placeholder="Resposta incorreta 2">
            <input type="text" class="question${i}" placeholder="URL da imagem 2">
            <input type="text" class="question${i}" placeholder="Resposta incorreta 3">
            <input type="text" class="question${i}" placeholder="URL da imagem 3">     
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

function abrirPerguntas(quest){
    const numero = quest.getAttribute('numero')
    console.log(numero)
    document.querySelector(`.pergunta${numero}`).classList.toggle('hidden')
}

