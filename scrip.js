let listaQuizzes =[];

function buscarQuizzes(){
    const pedido = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    pedido.then(renderizarQuizzes);
    pedido.catch(TratarErro);
}
buscarQuizzes();

function renderizarQuizzes(resposta){

    listaQuizzes = resposta.data 

 const quizz =document.querySelector('.listaQuizzes');

 quizz.innerHTML= ""
 for(let i=0; i<listaQuizzes.length; i++){
    quizz.innerHTML += `<div class="itemListaMain" onclick="abrirQuizz('${listaQuizzes[i].id}',this)">
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

function abrirQuizz (id,quizzEscolhido){

    const valorId = Number(id)
    const quizz = quizzEscolhido
    console.log(valorId)
}

