const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector(".main");

document.addEventListener('DOMContentLoaded', function () {
    fetchTrainers();
})

function fetchTrainers() {
    return fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(json => {
            renderTrainers(json);            
        })
}

function renderTrainers(json) {
    json.forEach(trainer => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("data-id", `${trainer.id}`);
        

        const p = document.createElement("p");
        p.textContent = `${trainer.name}`;
        card.appendChild(p);

        const addButton = document.createElement("button");
        addButton.dataset["id"] = trainer.id;
        addButton.classList.add("add");
        addButton.innerText = "Add Pokemon";

        const trainerList = document.createElement("ul");
        card.appendChild(trainerList);

        trainer.pokemons.forEach((pokemon) => {
			const pokemonElement = document.createElement("li");
			pokemonElement.innerText = pokemon.nickname;

			const releaseButton = document.createElement("button");			
			releaseButton.classList.add("release");
			releaseButton.dataset["id"] = pokemon.id;
			releaseButton.innerText = "Release";
			pokemonElement.appendChild(releaseButton);
			card.appendChild(pokemonElement);
        });        
        main.appendChild(card);        
    });
}

document.addEventListener("click", ({target}) => {
    target.class === "release" && fetch(POKEMONS_URL + "/" + target["data-pokemon-id"], {method: "DELETE"})
    .then(resp => resp.json())
    .then(({text}) => {
      console.log(text);
      target.parentElement.remove();
    })
    target.class === "add" && fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trainer_id: target["data-trainer-id"]})
    })
    .then(resp => resp.json())
    .then(pokemon => {
      li = document.createElement("li");
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      const releaseButton = document.createElement("button");
      li.append(releaseButton);
      releaseButton.classList.add("release");      
      releaseButton.dataset["id"] = pokemon.id;
      releaseButton.innerText = "Release"
      target.parentElement.querySelector("ul").appendChild(li)
    })
  })