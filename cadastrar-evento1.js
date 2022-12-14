//git
async function creatEvent(event) {
  event.preventDefault();
  try {
    const scheduledDate = new Date(document.getElementById("data").value);
    arrayEvent = {
      name: document.getElementById("nome").value,
      poster: "Miau",
      attractions: [document.getElementById("atracoes").value],
      description: document.getElementById("descricao").value,
      scheduled: scheduledDate.toISOString(),
      number_tickets: document.getElementById("lotacao").value,
    };

    const response = confirm(`Deseja Realmente criar o evento ?`)
    if(response){
    const response = await fetch(
      "https://xp41-soundgarden-api.herokuapp.com/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrayEvent),
      })
      const dados = await response.json();
      alert(`Você criou o evento ${arrayEvent.name}`)
    };
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("botao").onclick = creatEvent;
