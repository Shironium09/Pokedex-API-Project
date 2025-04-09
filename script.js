const submit = document.getElementById('submit').onclick = () => {

let input = document.getElementById('searchPokemon').value;
input = input.toUpperCase();

const screen = document.getElementById('screen');

console.log(input);

screen.innerHTML = '';

fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302')
.then(response => {
    if(!response.ok){
        throw new Error('Failed to fetch data');
    }
return response.json();
})
.then(pokemon => {
    pokemon.results.forEach(mon =>{
        fetch(mon.url)
        .then(res => res.json())
        .then(data => {

            let pokemonName = data.name;
            pokemonName = pokemonName.toUpperCase();

            let flag = false;

            if(pokemonName === input){
                flag = true;
            }

            if(flag){

                const name = document.createElement('h1');
                name.textContent = pokemonName;

                let shiny = Math.floor(Math.random()*10) + 1;

                let image;

                if(shiny == 1){

                    image = document.createElement('img');
                    image.src = data.sprites.front_shiny;
                    image.alt = pokemonName;

                }
                else{

                    image = document.createElement('img');
                    image.src = data.sprites.front_default;
                    image.alt = pokemonName;

                }

                screen.appendChild(image);
                screen.appendChild(name);

            }
            else{

                const none = document.createElement('h1');
                none.textContent = 'No Pokemon Found';

            }

        })
    })
})
.catch(error => {

    console.log('Failed to load');

})

}

