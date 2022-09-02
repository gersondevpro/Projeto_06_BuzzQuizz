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
 