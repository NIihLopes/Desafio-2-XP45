const urll = 'https://xp41-soundgarden-api.herokuapp.com/events/'



const btnDelete = document.getElementsByClassName('btn btn-danger')
const deleteBtn = btnDelete[0]
deleteBtn.setAttribute("id","deleteBottom")
console.log(deleteBtn);


const searchBar = window.location.search
const parametroURL = new URLSearchParams(searchBar)
const id = parametroURL.get('id')
const urlId = urll + id
console.log(id);

function zerarCampos () {
    document.getElementById('nome').value = ""
    document.getElementById('banner').value = ""
    document.getElementById('atracoes').value = ""
    document.getElementById('descricao').value = ""
    document.getElementById('data').value = ""
    document.getElementById('lotacao').value = ""
}

function redireciona(){
    window.location.assign("/admin.html");    
}


const nomeEvento = ""

async function mostrarInformacoes() {

    try {
        const response = await fetch(urlId);
        const data = await response.json();

        //transforma a data de ISO para data local
        let eventDate = new Date(data.scheduled).toLocaleString()
        // pega a informações e atribuem cada uma ao seu respectivo campo por ordem
        document.getElementById('nome').value = data.name
        document.getElementById('banner').value = data.poster
        document.getElementById('atracoes').value = data.attractions
        document.getElementById('descricao').value = data.description
        document.getElementById('data').value = eventDate
        document.getElementById('lotacao').value = data.number_tickets
        nomeEvento = data.name
            
    } catch (error) {
        console.log(error);
    }
}

// função DELETE ok
async function deletar() {

    try {

    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    const response = confirm(`Deseja Realmente excluir o evento ${id}`)
        if (response) {
            await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, init);
            
        }
        console.log(response.status)
        console.log('excluiu')
        alert(`Você excluiu o evento ${nomeEvento}`)
        zerarCampos();
    } catch (error) {
        console.log(error);
    }
}

mostrarInformacoes()

deleteBtn.onclick = (event) =>{
    event.preventDefault()
    deletar()
}