//=============ATIVAR MODAL DE SUCESSO NA GRAVAÇÃO DOS DADOS==================
const openModalSuccess = () => document.getElementById('modalSuccess').classList.add('active')

const closeModalSuccess = () => {
    document.getElementById('modalSuccess').classList.remove('active');
}
//==================================================================


//=============== EVENTOS DE CLICK DOS BOTÕES SUCCESS
document.getElementById('modalCloseSuccess')
   .addEventListener('click', closeModalSuccess)

document.getElementById('cancelarModalSuccess')
    .addEventListener('click', closeModalSuccess)
//==============================================


const registrosUl = document.querySelector('#registros');
const metaSemana = document.querySelector('#metaSemanal');
const listarAcumulado = document.querySelector('#acumulado');
const listarRestante = document.querySelector('#restante');
const form = document.querySelector('#form');
const inputDiaSemana = document.querySelector('#dia');
const inputDuracao = document.querySelector('#duracao');


//===================================================================================*
//Meta semanal armazenada de forma estática por enquanto                             *
const testeMetaSemanal = [                                       
    {id: 1, meta: 120}                                           
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
//=====================================================================================



//Armazena no localStorage do navegador
const localStorageValores = JSON.parse(localStorage.getItem('valores')); 
let valores = localStorage.getItem('valores') !== null ? localStorageValores : [];

//Remove os valores da tela
const removeValores = ID => {
    valores = valores.filter(valor => valor.id !== ID);
    atualizarLocalStorage();
    init();
}

//Adiciona o valores ao DOM
const addValoresDom = valores => {

    const li = document.createElement('li');
    li.innerHTML = `
        ${valores.name}
        <span>${valores.duracao} minutos</span>
        <button class="delete-btn" onClick="removeValores(${valores.id})">x</button>         
    `
    registrosUl.append(li);
}

const atualizaRegistros = () => {
    const valoresDuracao = valores.map(valores => valores.duracao);
    const totalMinutos = valoresDuracao.reduce((accumulator, valores ) => accumulator + valores, 0 );
    const metaDuracao = testeMetaSemanal.map(valor => valor.meta);
    const restante = metaDuracao - totalMinutos;

    if(restante == 0){
        openModalSuccess();
    }

    metaSemana.textContent = `${metaDuracao} min`;
    listarAcumulado.textContent = `${totalMinutos} min`;
    listarRestante.textContent = `${restante} min`;

}

//quando a página for carregada faz o loop nos regitros e  adiciona no DOM
const init = () => {
    registrosUl.innerHTML = '';
    valores.forEach(addValoresDom);
    atualizaRegistros();
}

init();

//Atualiza os registros no localStorage
const atualizarLocalStorage = () => {
    localStorage.setItem('valores', JSON.stringify(valores));
}


//Gera um id com um número aleatório para o valor
const gerarID = () => Math.round(Math.random() * 1000);


//Adiciona os valores em um novo array
const addToArray = (diaNome, duracaoNome) =>{
    valores.push({id: gerarID(), name: diaNome, duracao: Number(duracaoNome)});

}

//Limpar os inputs após o cadastro dos valores
cleanInputs = () => {
     inputDiaSemana.value = '';
     inputDuracao.value = '';
}

//Função para envio do form 
const formSubmit =  event => {

    event.preventDefault();

    const diaNome = inputDiaSemana.value.trim();
    const duracaoNome = inputDuracao.value.trim();    
    emptyInputs = diaNome === '' || duracaoNome === '';

    if(emptyInputs){
        alert('Digite todos os campos!');
        return;
    }

    addToArray(diaNome, duracaoNome);
    init();
    atualizarLocalStorage();
    cleanInputs();
   
}

form.addEventListener('submit', formSubmit);