let listaQuizzes =[];
let valorId;

// Busca todos os quizzes no servidor
function buscarQuizzes(){
    const pedido = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    pedido.then(renderizarQuizzes);
    pedido.catch(TratarErro);
}
buscarQuizzes();


// Adiciona os quizzes na parte do todos

function renderizarQuizzes(resposta){

    listaQuizzes = resposta.data 

 const quizz =document.querySelector('.todos');

 quizz.innerHTML= ""
 for(let i=0; i<listaQuizzes.length; i++){
    quizz.innerHTML += `<div class="itemListaMain" onclick="abrirQuizz('${listaQuizzes[i].id}')">
    <div class="relativeIndex">

        <div class="gradient"></div>
        <img src="${listaQuizzes[i].image}" alt="">

    </div>

    <li class="itemLista">
        <p>${listaQuizzes[i].title}</p>
    </li>
</div>`
}

}

function TratarErro(erro){
    console.log(erro.response.data)
}

// seleciona o id do quizz clicado e busca a classe da tela 1

function abrirQuizz (id){

    valorId = Number(id);
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('hidden');
    const tela2 =document.querySelector('.tela2');
    tela2.classList.remove('hidden');
    console.log(valorId)
}





































































































































let valorURL;
let numeroquestoes;
let imgprincipal;
let quizz = {};
let titulo;
let numeroniveis;
let infos=[];
let perguntasUsuario =[];
const infosQuizz = []

function validarURLquizz(){
    try {
         imgprincipal = new URL(document.querySelector('.url-quizz').value);
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
     numeroniveis = Number(document.querySelector(".level-Number").value)
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
        quizz.image = imgprincipal
        
    }
    else {
        alert('Os campos não foram preenchidos corretamente')
       
    }
    limparInputs();
console.log(imgprincipal)
}


// Essa função irá adicionar o números de questões escolhidas pelo usuário
function adicionarPerguntas(){
    const perguntas = document.
    querySelector('.screen3-2 main');
    perguntas.innerHTML=''
    perguntas.innerHTML += `<div class="title">
    <span>Crie suas perguntas</span>
</div>`
    for (let i=1; i<= numeroquestoes; i++){
        perguntas.innerHTML+= `<div class="more-questions mqheader${i}">
        <label for="fname">Pergunta ${i}</label>
        <figure >
            <img  onclick="abrirPerguntas(this)" numero=${i} src="/arquivos/Vector.png" alt="">
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
    
    perguntas.innerHTML += `<div class="button" onclick="selecionarInfoquizz()">
    Prosseguir para criar níveis
</div>`
}


function limparInputs(){
    const limparinput = document.querySelectorAll('.screen3-1 input')
    for (let i=0; i< limparinput.length;i++){
       limparinput[i].value =''
    }
}

function abrirPerguntas(quest){
    const numero = quest.getAttribute('numero')
    document.querySelector(`.pergunta${numero}`).classList.remove('hidden')
    console.log(numero)
    document.querySelector(`.mqheader${numero}`).classList.add('hidden')
}



    function validarURLperguntas(valor){
        try {
            let url = new URL(valor);
            return  true
          } catch(err) {
              return false
          }
    }

    let questões=[]
    let imgEtituloRespota = {}
    let resposta = [] // recebe o objeto de cada resposta
    let objResposta = {}
    let Arrayquestions =[]
    function selecionarInfoquizz(){
        let infos =[]
       for (let i=1; i<=numeroquestoes;i++){ 
        infos = document.querySelectorAll(`.question${i}`)
        if(!infos[0].value ||infos[0].value.length < 20){
            return alert('Preencha os campos corretamente')             
        }
        else {
           imgEtituloRespota.title = infos[0].value
        }
        if (infos[1].value[0]!=='#' || !(infos[1].value.match('#[0-9A-Fa-f]+'))||infos[1].value.length!==7){
            return alert('Preencha os campos corretamente')
        }
        else{
            imgEtituloRespota.color=infos[1].value
           
        }
        if (!infos[2].value || infos[2].value.length< 20){
            return alert('Preencha os campos corretamente')
        }
        else{
            objResposta.text=infos[2].value
        }
        if(!validarURLperguntas(infos[3].value)){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.image = infos[3].value
            objResposta.isCorrectAnswer = true
            resposta.push(objResposta)
        }
        objResposta = {}
        if (!infos[4].value || infos[4].value.length< 20){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.text=infos[4].value
        }
        if(!validarURLperguntas(infos[5].value)){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.image = infos[5].value
            objResposta.isCorrectAnswer = false
            resposta.push(objResposta)
        }
        objResposta = {};
        if (!infos[6].value || infos[6].value.length < 20){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.text=infos[6].value
        }
        if(!validarURLperguntas(infos[7].value)){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.image = infos[7].value
            objResposta.isCorrectAnswer = false
            resposta.push(objResposta)
        }
        objResposta = {};
        if (!infos[8].value || infos[8].value.length< 20){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.text=infos[8].value
        }
        if(!validarURLperguntas(infos[9].value)){
            return alert('Preencha os campos corretamente')
        }
        else {
            objResposta.image = infos[9].value
            objResposta.isCorrectAnswer = false
            resposta.push(objResposta)
        }
       
        objResposta = {};
        imgEtituloRespota.answers = resposta;
        Arrayquestions.push(imgEtituloRespota);
        imgEtituloRespota ={};
        resposta = [];  
      }
       quizz.questions = Arrayquestions
        liberarScreen3_3()
        renderizarNiveis()
       console.log(quizz) 
    } 
    
    function liberarScreen3_3(){
        document.querySelector('.screen3-2').classList.add('hidden')
        document.querySelector('.screen3-3').classList.remove('hidden')
    }
    function renderizarNiveis(){
        const niveis = document.querySelector('.screen3-3 main')
        niveis.innerHTML=''
        niveis.innerHTML += `<div class="title">
        <span>Agora, decida os níveis</span>
        </div>
         `
        for (let i=1; i<=numeroniveis;i++){
            niveis.innerHTML += `
            <div class="more-levels nheader${i}">
                <label for="fname">Nível${i}</label>
                <figure>
                    <img codigo="${i}" onclick="abrirNiveis(this)" src="/arquivos/Vector.png" alt="">
                </figure>
            </div>
            <form action="" class="f-makeLevels n${i} hidden">
            <div class="box">
                <label for="fname">Nível ${i}</label>
                <input type="text" class="nivel${i}" placeholder="Título do nível">
                <input type="text" class="nivel${i}" placeholder="% de acerto mínimo">
                <input type="text" class="nivel${i}" placeholder="URL da imagem do nível">
                <input type="text" class="nivel${i}" placeholder="Descrição do nível">    
            </div>
            </form>`
        }
        niveis.innerHTML += `<div class="button" onclick="validarNiveis()">
        Finalizar Quizz
        </div>`
    }

    function abrirNiveis(nivel) {
        const codigoNivel = nivel.getAttribute('codigo')
        document.querySelector(`.n${codigoNivel}`).classList.remove('hidden')
        document.querySelector(`.nheader${codigoNivel}`).classList.add('hidden')
        
    }
    let NiveisArray = []
    let objLevels = {}
    function validarNiveis (){
        let nivel = [];
       for (let i=1; i<= numeroniveis; i++){ 
            nivel = document.querySelectorAll(`.nivel${i}`)
         if (nivel[0].value.length >=10){
            objLevels.title = nivel[0].value
        }
        else {
            return alert('Preencha os campos corretamente')
        }
        if (validarURLperguntas(nivel[2].value)){
            objLevels.image = nivel[2].value
        }
        else {
            return alert('Preencha os campos corretamente')
        }
         if (nivel[3].value.length >=30){
            objLevels.text = nivel[3].value
         }
         else {
            return alert('Preencha os campos corretamente')
         }
         if ( Number(nivel[1].value)>=0 && Number(nivel[1].value)<=100){
            objLevels.minValue = parseInt(nivel[1].value)
        } 
        else{
             return alert('Preencha os campos corretamente') 
        }

        NiveisArray.push(objLevels); 
        objLevels = {};
    } 
    
     quizz.levels = NiveisArray
    console.log(quizz)
    liberarTela3_4()
    criarQuizz() 
}
    
 function criarQuizz(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',quizz)
    promise.then(tratSucesso)
    promise.catch(TratarErro)
 }
 let quizzCriado;
 let ArrayId=[];
 function tratSucesso(sucesso){
    quizzCriado = sucesso.data
    ArrayId.push(quizzCriado.id)
    console.log(quizzCriado.id)
    console.log(ArrayId)
    
    const ultimatela = document.querySelector('.screen3-4 main')
    ultimatela.innerHTML=''
    ultimatela.innerHTML += `
            <div class="title">
            <span>Seu quizz está pronto</span>
        </div>
        <div class="img-final">
            <div class="togradiente"></div>
            <figure>
                <img src="${quizzCriado.image}" alt="">
            </figure>
            <p>${quizzCriado.title}</p>
        </div>
        <div class="button">
            Finalizar Quizz
        </div>
        <span class="home-back" onclick=" backHome()">
            Voltar para home 
        </span>
    </main>
    `
}


 function TratarErro(erro){
    console.log(erro.response.status)
 }

 
 function liberarTela3_4(){
    document.querySelector('.screen3-3').classList.add('hidden')
    document.querySelector('.screen3-4').classList.remove('hidden')
 } 

 function backHome(){
    document.querySelector('.tela1').classList.remove('hidden')
    document.querySelector('.screen3-4').classList.add('hidden')
 }