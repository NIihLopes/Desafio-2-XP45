// LINK DA API
const url = 'https://xp41-soundgarden-api.herokuapp.com/events/'
//git

function redirecionar() {
    // função para redirecionar o usuário para a página admin.html ao terminar
    window.location.href = 'admin.html'
}

// inserindo LISTA DE EVENTOS NA TELA
async function listandoEvento() {
    ;
    try {
        const eventos = document.querySelector("#tabelaEventos");
        const responseEvento = await fetch(url)
        let ind = 1
        const listaEventos = await responseEvento.json()
        listaEventos.forEach((evento) => {
            
            let formatoData = new Date(evento.scheduled).toLocaleString()
            const card =  `
            <th scope="row">${ind}</th>
            <td>${formatoData}</td>
            <td>${evento.name}</td>
            <td>${evento.attractions}</td>
            <td>
                <a href="eventos.html" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?id=${evento._id}" id="${evento._id}" onclick="mostrarInformacoes()" class="btn btn-secondary">
                    editar
                </a>
                <a href="excluir-evento.html?id=${evento._id}" id="${evento._id}" onclick="mostrarInformacoes()" class="btn btn-danger">
                    excluir
                </a>
            </td>
        `
        eventos.innerHTML += card
        ind++
        });
    } catch {
        console.log('erro ao listar html');
    }
}

listandoEvento()
