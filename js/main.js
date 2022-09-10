const registrosUl = document.querySelector('#registros');
const metaSemana = document.querySelector('#metaSemanal');
const listarAcumulado = document.querySelector('#acumulado');
const listarRestante = document.querySelector('#restante');
const form = document.querySelector('#form');
const inputDiaSemana = document.querySelector('#dia');
const inputDuracao = document.querySelector('#duracao');


const testeMetaSemanal = [
    {id: 1, meta: 150}
]


const testeValores = [
    {id: 1, name: 'Segunda', duracao: 20},
    {id: 2, name: 'Terça', duracao: 30},
    {id: 3, name: 'Quarta', duracao: 25},
    {id: 4, name: 'Quinta', duracao: 35}
]

//adiciona meta semamal ao dom
const addmetaSemanal = valor =>{

    const h1 = document.createElement('h1');
    h1.innerHTML = `
        ${valor.meta}    
    `
    metaSemana.append(h1);
}

//quando a página for carregada faz o loop nos regitros e  adiciona no DOM
const initMetaSemanal = () => {
    testeMetaSemanal.forEach(addmetaSemanal);
}

initMetaSemanal();



//Adiciona o valores ao DOM
const addValoresDom = valores => {

    const li = document.createElement('li');
    li.innerHTML = `
        ${valores.name} <span>${valores.duracao} minutos</span><button class="delete-btn">x</button>     
    
    `
    registrosUl.append(li);
}

const atualizaRegistros = () => {
    const valoresDuracao = testeValores.map(valores => valores.duracao);
    const totalMinutos = valoresDuracao.reduce((accumulator, valores ) => accumulator + valores, 0 );
    const metaDuracao = testeMetaSemanal.map(valor => valor.meta);
    const restante = metaDuracao - totalMinutos;

    if(restante == 0){
        alert('Parabéns! Você atingiu a meta da semana!!');
    }

    metaSemana.textContent = `${metaDuracao} min`;
    listarAcumulado.textContent = `${totalMinutos} min`;
    listarRestante.textContent = `${restante} min`;

}

//quando a página for carregada faz o loop nos regitros e  adiciona no DOM
const init = () => {
    testeValores.forEach(addValoresDom);
    atualizaRegistros();
}

init();

form.addEventListener('submit', event => {

    event.preventDefault();

    const diaNome = inputDiaSemana.value.trim();
    const duracaoNome = inputDuracao.value.trim();
    

    if(diaNome === '' || duracaoNome === ''){
        alert('Digite todos os campos!');
        return;
    }


})