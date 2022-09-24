//git
const nome = document.getElementById('nome')
const banner = document.getElementById('banner')
const atracoes = document.getElementById('atracoes')
const descricao = document.getElementById('descricao')
const date = document.getElementById('data')
const lotacao = document.getElementById('lotacao')

const searchBar = window.location.search
const parametroURL = new URLSearchParams(searchBar)
const id = parametroURL.get('id')

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const urlId = `${BASE_URL}/events/${id}`
console.log(id);

const btnEdita = document.getElementsByClassName('btn-primary')
const editarBtn = btnEdita[0]
editarBtn.setAttribute("id", "editarBottom")
console.log(editarBtn);


// função EXIBIR DADOS no formulário -- OK
async function mostrarInformacoes() {

    try {
        const response = await fetch(urlId);
        const data = await response.json();
       

        //transforma a data de ISO para data local
    
        // pega a informações e atribuem cada uma ao seu respectivo campo por ordem
        nome.value = data.name
        banner.value = data.poster
        atracoes.value = data.attractions
        descricao.value = data.description
        date.value = data.scheduled.toLocaleString()
        lotacao.value = data.number_tickets

    } catch (error) {
        console.log(error);
    }
}


async function editar() {
    
    try {
        //transforma a data de ISO para data local
   
    // pega a informações e atribuem cada uma ao seu respectivo campo por ordem
    const evento = {
        name: nome.value,
        poster: banner.value,
        attractions: [atracoes.value],
        description: descricao.value,
        scheduled: new Date(date.value).toISOString(),
        number_tickets: lotacao.value
    }
        const response = confirm(`Deseja Realmente EDITAR o evento ${id}`)
        if (response) {
            const response = await fetch(urlId, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(evento),
              })
            const dados = await response.json();
            console.log(dados);
            console.log(response.status)
            console.log('Editado!')
            alert(`Você Editou o evento ${evento.name}`)
        }
    }
    catch (error) {
        console.log(error);
    }
}


// inicializador de eventos
//window.addEventListener('load', getEvents())
//editarBtn.onclick = editar() 

mostrarInformacoes()

editarBtn.onclick = (event) => {
    event.preventDefault()
    editar();
}