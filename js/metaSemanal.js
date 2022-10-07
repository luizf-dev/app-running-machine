const metaSemanalUl = document.querySelector('#metaSemanal');
const form = document.querySelector('#formMetaSemanal');
const input = document.querySelector('#inputMetaSemanal');

/*
? Limpa o input após o cadastro da meta semanal*/
cleanInput = () => {
     input.value = '';
}

/*
? Gerar um id aleatório */
const generateID = () => Math.round(Math.random() * 1000);

/*
? Listener de eventos do formulário*/
form.addEventListener('submit', evento =>{
    evento.preventDefault();

    const metaSemanalName = input.value.trim();

    if(metaSemanalName === ''){
        alert('Preencha corretamente o campo!');
        return;
    }

    const metaSemanal = [{id: generateID(), metaDuracao: metaSemanalName}];
    localStorage.setItem('metaSemanal', JSON.stringify(metaSemanal));
    cleanInput();
    window.location.href("https://luizf-dev.github.io/app-running-machine/");
    
})




