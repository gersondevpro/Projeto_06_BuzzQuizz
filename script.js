let listaQuizzes =[];
let valorId;
let quizzSelecionado = {};
let arrayAlternativas =[];

// Busca todos os quizzes no servidor
function buscarQuizzes(){

    const pedido = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    pedido.then(renderizarQuizzes);
    pedido.catch(tratarErro);
}
buscarQuizzes();

function tratarErro(erro){
    console.log(erro.response.data)
}

// Adiciona os quizzes na parte do todos

function renderizarQuizzes(resposta){

    const listaSerializada = localStorage.getItem('Id')
    const ArrayIdarmazenado = JSON.parse(listaSerializada)

    listaQuizzes = resposta.data;

    const quizz = document.querySelector('.todos');

    quizz.innerHTML= ""
    for(let i=0; i<listaQuizzes.length; i++){

        if(ArrayIdarmazenado.includes(listaQuizzes[i].id)) {
            let criarQuizz = document.querySelector(".criarQuizz")
            criarQuizz.classList.add("hidden")
            let seusQuizzes = document.querySelector(".seusQuizzes")
            seusQuizzes.classList.remove("hidden")
        }

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

    // scroll que retorna para o topo da home depois de realizar um quizz
    let scroll = document.getElementById("topoTela1");
    scroll.scrollIntoView({block: "center", behavior: "smooth"});
}

// seleciona o id do quizz clicado e busca a classe da tela 1

function abrirQuizz (id){

    valorId = Number(id);
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('hidden');
    const tela2 =document.querySelector('.tela2');
    tela2.classList.remove('hidden');

    buscarQuizzEscolhido();
}

function buscarQuizzEscolhido() {

    const buscarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${valorId}`);
    buscarQuizz.then(renderizarQuizzEscolhido);
    buscarQuizz.catch(tratarErro);

}

function renderizarQuizzEscolhido(parametro) {
    
    quizzSelecionado = parametro.data;
    // console.log(quizzSelecionado);
    const capaQuizSelecionado = document.querySelector('.capaQuizz');

    capaQuizSelecionado.innerHTML =
    `
    <div class="relative">
        <img src="${quizzSelecionado.image}" alt="">
    </div>

    <div class="absolute">
    </div>

    <div id="scrollTopo" class="tituloCabecalho">
        <h2>${quizzSelecionado.title}</h2>
    </div>
    `;

    carregarPerguntas(quizzSelecionado)
}



function carregarPerguntas(quizzSelecionado) {
    console.log(quizzSelecionado);
    const perguntas = document.querySelector('.perguntas');

    perguntas.innerHTML = "";
    for(let i = 0; i < quizzSelecionado.questions.length; i++) {
        
        perguntas.innerHTML +=`
        <div id="p${i+1}" class="enunciadoPergunta" style="background-color: ${quizzSelecionado.questions[i].color}">
            <h3>${quizzSelecionado.questions[i].title}</h3>
        </div>
        `;

        arrayAlternativas=[];

        for(let z = 0; z < quizzSelecionado.questions[i].answers.length; z++) {

            arrayAlternativas.push(`
            <div class="alinhaAlternativas">
                <div class="alinhaEscolhas">
                    <li class="pergunta0${i+1} ${quizzSelecionado.questions[i].answers[z].isCorrectAnswer} naoSelecionado alternativas" onclick="validarResposta(this)">
                        <img src=${quizzSelecionado.questions[i].answers[z].image} alt="">
                        <p class="p${z+1}">${quizzSelecionado.questions[i].answers[z].text}</p>
                    </li>
                </div>
            </div>
            `);
            
            if(z === quizzSelecionado.questions[i].answers.length - 1) {
                console.log(i);
                arrayAlternativas.sort(comparador);
                arrayAlternativas.forEach((p)=> perguntas.innerHTML += p);
            }
        }
    }
}

let ref;
let alternativa;
let contadorRespostas = 0;
let numeroDePerguntas = 0;
function validarResposta(palpite) {

    let alternativaEscolhida = palpite.querySelector("p");
    let lista = alternativaEscolhida.parentNode;

    // let teste = document.querySelectorAll(".alinhaEscolhas");
    // console.log(teste);
        
    lista.classList.add("escolhido");
    lista.classList.remove("naoSelecionado");
    ref = (lista.classList[0]);
    let num = (ref.slice(-2))
    let pergunta = document.querySelectorAll(`.${ref}.naoSelecionado`);


    if(lista.classList[0]) {
        
        let perg = document.querySelectorAll(`.pergunta${num}`);

        for(a = 0; a < perg.length; a++) {
            let condicao = document.querySelector(`.pergunta${num} .p${a+1}`);
            if(perg[a].classList.contains("true")) {
                condicao.classList.add("respostaCorreta");

            } else {
                condicao.classList.add("respostaErrada");
            }
        }
    }

    if(lista.classList[0]) {
        for(let i = 0; i < pergunta.length; i++) {
            pergunta[i].classList.add("transparencia");
        }
    };

    setTimeout(scrollPergunta, 2000);

    numeroDePerguntas = document.querySelectorAll(".enunciadoPergunta")
    console.log(numeroDePerguntas);
    contadorRespostas += 1;
    console.log(contadorRespostas);

    if (contadorRespostas === numeroDePerguntas.length) {
        resultadoDoQuizz()
    }    
}

function comparador() { 
	return Math.random() - 0.5; 
}

function scrollPergunta() {
    
    let num = Number(ref.slice(-2));
    let id = `p${num + 1}`;
    // console.log(num);
    // console.log(id);

    if(num) {
        let scroll = document.getElementById(`${id}`);
        scroll.scrollIntoView({block: "center", behavior: "smooth"});
    }
}

function resultadoDoQuizz() {
    console.log("entrei na funcao")

    let respostasErradas = document.querySelectorAll(".transparencia .respostaCorreta");
    console.log(respostasErradas);
    // essa variável pega o número de perguntas escondidas que estavam certas
    
    let resultadoPercentual = (100 / contadorRespostas) * (contadorRespostas - respostasErradas.length);
    let resultadoFinal = Math.ceil(resultadoPercentual);
    // console.log(resultadoFinal);

    const exibirResposta = document.querySelector(".listaResultado");

    console.log(quizzSelecionado);
    console.log(quizzSelecionado.levels)

    let level = {};
    let nivel = quizzSelecionado.levels;

    for (i = 0; i < nivel.length; i++) {
        
        if(resultadoFinal > nivel[i].minValue) {
            level = nivel[i];
            console.log(level)
        }
    }

    exibirResposta.innerHTML =
    `
    <div class="enunciadoResultado" style="background-color: #EC362D;">
        <h3>${level.title}</h3>
    </div>
    <li class="">
        <div class="infosResultado">
            <img src=${level.image} alt="">
            <p>${level.text}</p>
        </div>
    </li>
    `;


    let resultado = document.querySelector('.resultadoQuizz');
    resultado.classList.remove('hidden');
    
    


}

function voltarHome() {

    const tela1 = document.querySelector('.tela1');
    tela1.classList.remove('hidden');
    const tela2 =document.querySelector('.tela2');
    tela2.classList.add('hidden');

    buscarQuizzes();
}

function reiniciarQuizz() {

    let noTransp = document.querySelectorAll(".transparencia");
    console.log(noTransp.length);
    for(let i = 0; i < noTransp.length; i++) {
        noTransp[i].classList.remove("transparencia");
    }

    let respTrue = document.querySelectorAll(".respostaCorreta");
    console.log(respTrue.length);
    for(i = 0; i < respTrue.length; i++) {
        respTrue[i].classList.remove("respostaCorreta");
    }

    let respFalse = document.querySelectorAll(".respostaErrada");
    console.log(respFalse.length);
    for(i = 0; i < respFalse.length; i++) {
        respFalse[i].classList.remove("respostaErrada");
    }

    if(true) {
        let scroll = document.getElementById("scrollTopo");
        scroll.scrollIntoView({block: "center", behavior: "smooth"});
    }

    let resultado = document.querySelector('.resultadoQuizz');
    resultado.classList.add('hidden');
}






function irParaTelaTres (){
    document.querySelector('.tela1').classList.add('hidden')
    document.querySelector('.screen3-1').classList.remove('hidden')
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
        if (!infos[2].value){
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
        if (!infos[4].value){
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
        if (!infos[6].value){
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
        if (!infos[8].value){
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


