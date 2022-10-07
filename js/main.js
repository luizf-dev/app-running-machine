/*
! =============Ativa o modal de sucesso=========== */
const openModalSuccess = () => document.getElementById('modalSuccess').classList.add('active')

const closeModalSuccess = () => {
    document.getElementById('modalSuccess').classList.remove('active');
}
/*
! ================================================ */


/*
! =============== Eventos de click ============== */
document.getElementById('modalCloseSuccess')
   .addEventListener('click', closeModalSuccess)

document.getElementById('cancelarModalSuccess')
    .addEventListener('click', closeModalSuccess)
/*
!============================================== */


/*
! ================= Captura os IDs dos elementos HTML ======= */

const duracaoUL = document.querySelector('#duracao');
const metaSemanalUL = document.querySelector('#metaSemanal');
const acumulado = document.querySelector('#acumulado');
const restante = document.querySelector('#restante');
const metaZerada = document.querySelector('#metaZerada');
const saldoPositivo = document.querySelector('#saldoPositivo');
const form = document.querySelector('#form');
const inputDia = document.querySelector('#dia');
const inputDuracao = document.querySelector('#diaDuracao');
const msg = document.querySelector('#msg');

/*
! =========META SEMANAL==============*/
/*
? TRAZ OS VALORES DO LOCAL STORAGE E TRANSFORMA COM O PARSE */
const getMetaSemanal =  JSON.parse(localStorage.getItem('metaSemanal'));


/*
? ATRIBUI UMA LET AO RESULTADO VINDO DO LOCAL STORAGE E VERIFICA SE O VALOR É NULO, SE FOR NULO, OU SEJA
? SE O LOCAL STORAGE DESSE REGISTRO ESTIVER VAZIO, ATRIBUI UM OBJETO COM O VALOR ZERO */
let metaSemanal = localStorage.getItem('metaSemanal') !== null ? getMetaSemanal : [{id: 0, metaDuracao: 0}];


/*
? FAZ UM LOOP COM O FOREACH NOS REGISTROS DA META DA SEMANA NO LOCAL STORAGE */
const initMetaSemanal = () => {
    metaSemanal.forEach(addMetaDOM);

}

/*
? REMOVE O VALOR DA META SEMANAL DO LOCAL STORAGE E  DA O REFRESH NA PÁGINA */
const removeMeta = () => {
    localStorage.removeItem('metaSemanal');
    location.reload();
}

/*
? ADICIONA O VALOR DA META SEMANAL NO DOM   */
const addMetaDOM = valorMeta => {

    const li  = document.createElement('li');

    li.innerHTML = `<p class="metaSemanal">${valorMeta.metaDuracao}min</p>`

    if(valorMeta.metaDuracao === 0){
        li.innerHTML = `${valorMeta.metaDuracao}min`
    }

    metaSemanalUL.append(li);
    
}

initMetaSemanal();


/* 
! ==================================*/



//Armazena no localStorage do navegador
const localStorageValores = JSON.parse(localStorage.getItem('valores')); 
let valores = localStorage.getItem('valores') !== null ? localStorageValores : [];

//Remove os valores da tela
const removeValores = ID => {
    valores = valores.filter(valor => valor.id !== ID);
    atualizarLocalStorage();
    init();
}

/*
? FUNÇÃO PARA ADICIONAR A DURAÇÃO DO EXERCÍCIO EM MINUTOS NO DOM */
const addDuracaoDom = valores => {

    const li = document.createElement('li');

    li.innerHTML = `
        ${valores.name}
        <span>${valores.duracao} minutos</span>
        <button class="delete-btn" onClick="removeValores(${valores.id})">x</button>         
    `
    duracaoUL.append(li);
}

/*
? ATUALIZA OS VALORES DOS MINUTOS DIÁRIOS NO DOM, ASSIM COMO A META SEMANAL, O ACUMULADO DE 
? EXERCÍCIOS E O QUE FALTA PARA ATINGIR A META */
const updateValues = () => {

    const duracaoValores = valores.map(valores => valores.duracao);
    const metaValores = metaSemanal.map(valorMeta => valorMeta.metaDuracao);
    const totalAcumulado = duracaoValores.reduce((acumulado, valores) => acumulado + valores, 0);
    const minutosRestantes = metaValores  - totalAcumulado;    
    const minutosSobrando = totalAcumulado - metaValores;
/*
    ? VERIFICA SE O USUÁRIO BATEU A META SEMANAL*/
    if(metaValores == 0 && totalAcumulado == 0){
       const h1 = document.createElement('h1');
       h1.innerHTML = `Seja bem-vindo! `;
       msg.append(h1);
    }else if(totalAcumulado >= metaValores ){
        openModalSuccess();
    }

    acumulado.textContent = `${totalAcumulado} min`;    

    /*    
    ? VERIFICA SE O USUÁRIO JÁ POSSUI MINUTOS ALÉM DA SUA META */
    if(minutosRestantes < 0){
        restante.textContent = ``;
         metaZerada.textContent = `Meta Alcançada!! `;
         saldoPositivo.textContent = `${Math.abs(minutosSobrando)} min`; 
    }else{
        restante.textContent = `${Math.abs(minutosRestantes)} min`;
        metaZerada.textContent = ``;
        saldoPositivo.textContent = `0 min`; 
    }

}

//quando a página for carregada faz o loop nos regitros e  adiciona no DOM
const init = () => {
    duracaoUL.innerHTML = '';
    valores.forEach(addDuracaoDom);
    updateValues();
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
    valores.push({id: gerarID(), name: diaNome, duracao:Number(duracaoNome)});

}

//Limpar os inputs após o cadastro dos valores
cleanInputs = () => {
     inputDia.value = '';
     inputDuracao.value = '';
}

//Função para envio do form 
const formSubmit =  event => {

    event.preventDefault();

    const diaNome = inputDia.value.trim();
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






