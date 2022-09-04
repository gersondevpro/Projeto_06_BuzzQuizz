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

    listaQuizzes = resposta.data;

    const quizz = document.querySelector('.todos');

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
            
            // RANDOM NÃO ESTÁ FUNCIONANDO BEM
            // SÓ EMBARALHA A 1ª PERGUNTA [i]
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
function validarResposta(palpite) {

        let alternativaEscolhida = palpite.querySelector("p");
        let lista = alternativaEscolhida.parentNode;

        let teste = document.querySelectorAll(".alinhaEscolhas");
        console.log(teste);
            
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
}