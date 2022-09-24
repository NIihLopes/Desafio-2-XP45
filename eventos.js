


async function listarEventos(){
    try{
        
    const headers = {
        'Content-Type': 'application/json',
    }

    const init = {
        headers: headers,
        method: 'GET',
    }

    let response = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, init);
    let responseData = await response.json();

    divEventos = document.getElementsByClassName('container d-flex justify-content-center align-items-center flex-wrap').item(0);
    
    responseData.forEach(element => {
        let html = 
        `<article class="evento card p-5 m-3">
            <h2>${element.name} - ${element.scheduled}</h2>
            <p>${element.description}</p>
            
            <button type="button" id="${element._id}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Reservar Ingresso</button>
        </article>`
        divEventos.innerHTML += html;
    });

    reservar(responseData)
    
    } catch(e){
        console.log('Error getting events! ', e);
    }
}

function reservar(responseData){
    const displayModal = document.getElementById('exampleModal');
    const buttonModal = document.getElementsByClassName('btn-primary');
    for(let index = 1 ; index < buttonModal.length; index++) {
        buttonModal.item(index).onclick = (e) => {
            // console.log("1: ", responseData[index-1])
            displayModal.style.visibility = 'visible';
            validarForm(responseData[index-1])
        };
    } 
}

function validarForm(dadosEvento){
    const clienteReserva = []
    const inputNome = document.getElementById('recipient-name');
    const inputEmail = document.getElementById('recipient-email');
    const btnConcluirReservas = document.getElementById("btn-concluir-reserva");
    const btnReservar = document.getElementById('form-btn-reservar');
    const divCont = document.getElementById('qtdReservas');

    divCont.style.visibility = 'hidden';
    let contadorDeReservas = 0;
    inputNome.value = ""
    inputEmail.value = ""
    let qtdReservas = 0

    btnConcluirReservas.onclick = (e) => {
        
        const novoCliente = 
        {
            owner_name: inputNome.value,
            owner_email: inputEmail.value,
            number_tickets: qtdReservas,
            event_id: dadosEvento._id,
        }
        clienteReserva.push(novoCliente)
        criarReserva(clienteReserva);
        e.preventDefault();
    };  

    btnReservar.onclick = (e) => {
        divCont.style.visibility = 'visible';
        function reservar(){
            html = contadorDeReservas = contadorDeReservas + 1
            divCont.innerHTML = `Quantidade: ${html}`;
            return contadorDeReservas
        }
        qtdReservas = reservar()
        e.preventDefault();
    };
    
}



    

async function criarReserva(clienteReserva){
    let jsonClienteReservas = {};
    jsonClienteReservas = JSON.stringify(clienteReserva);
    jsonClienteReservas = jsonClienteReservas.replace("[","");
    jsonClienteReservas = jsonClienteReservas.replace("]","");
    
    console.log(jsonClienteReservas)
    try{
        
    const headers = {
        'Content-Type': 'application/json',
    }

    const init = {
        headers: headers,
        method: 'POST',
        body: jsonClienteReservas
    }

    let response = await fetch('https://xp41-soundgarden-api.herokuapp.com/bookings', init);
    console.log(response)
    let requireData = await response.json();

    console.log(requireData)

    }catch(e){
        console.log('Error getting events! ', e);
    }
}

const btnReservas = document.getElementById("btn-listar-reserva");

btnReservas.addEventListener("click", () => {
    listarReserva();

    async function listarReserva(){
    const divModalReserva = document.getElementById("modal-listar-reservas");
    const btnFechar = document.getElementById("btn-fechar");
    let pConteudoReservas = document.getElementById("conteudo-reservas");
    divModalReserva.style.display = 'block';
    btnFechar.onclick = () =>{
        divModalReserva.style.display = 'none';
    }

    try{
        
    const headers = {
        'Content-Type': 'application/json',
    }

    const init = {
        headers: headers,
        method: 'GET',
    }

    let response = await fetch('https://xp41-soundgarden-api.herokuapp.com/bookings', init);
    let requireData = await response.json();
    requireData.forEach(item => {
        let html = `<br>
        <strong>id do evento:</strong> ${item._id}<br>
        <strong>nome:</strong> ${item.owner_name}<br>
        <strong>email:</strong> ${item.owner_email}<br>
        <strong>quantidade de ingressos:</strong> ${item.number_tickets}<br>
        `
        pConteudoReservas.innerHTML += html;
    });
    console.log(requireData)

    }catch(e){
        console.log('Error getting events! ', e);
    }
    }
});

listarEventos();