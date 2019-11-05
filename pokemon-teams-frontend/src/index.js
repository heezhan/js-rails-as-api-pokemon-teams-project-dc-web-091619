const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    getAllTrainers();

})

function getAllTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainersArray => trainersArray.forEach(trainer => {

        let main = document.querySelector('main');

        let div = document.createElement('div');
        div.setAttribute('data-id',trainer.id)
        div.classList.add('card');
        
        let p = document.createElement('p');
        p.innerText = trainer.name;

        let button = document.createElement('button');
        button.innerText = "Add Pokemon";
        button.setAttribute("data-trainer-id", trainer.id)
        button.addEventListener("click", addPokemon)

        let ul = document.createElement('ul');

        trainer.pokemons.forEach(function(pokemon){
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            ul.appendChild(li);
            let releaseButton = document.createElement('button');
            releaseButton.innerText = "Release Pokemon";
            releaseButton.classList.add('release');
            releaseButton.setAttribute("data-pokemon-id", pokemon.id)
            li.appendChild(releaseButton);
            releaseButton.addEventListener("click", deletePokemon)
        })        
        
        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    }))
}

function addPokemon(e){
    if (e.target.nextElementSibling.childElementCount < 6) {

        let trainer_id = e.target.parentElement.attributes[0].value;

        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id
            })
        }).then(response => response.json())
            .then(newPokemon => showPokemon(e,newPokemon))
        } else {
            getAllTrainers()
        }

}

function showPokemon(e, pokemon){
    
    let ul = e.target.nextElementSibling;
    // let selected = e.target.attributes[0].value;

    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    ul.appendChild(li);
    let releaseButton = document.createElement('button');
    releaseButton.innerText = "Release Pokemon";
    releaseButton.classList.add('release');
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    li.appendChild(releaseButton);
    releaseButton.addEventListener("click", deletePokemon)

}

function deletePokemon(e) {
    
    let pokemon_id = e.target.attributes[1].value 
    let parent = e.target.parentElement
    
    fetch(`${POKEMONS_URL}/${pokemon_id}`, {
        method: "DELETE"
    }).then(resp => randomFunction(parent))
}

function randomFunction(parent) {
    parent.remove() 
}