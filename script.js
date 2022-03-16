const btnSearch = document.querySelector("#btn-search")

btnSearch.onclick = () => {

    const userInput = document.querySelector("#user-input").value

    axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
        .then(response => {

            const pokemon = response.data
            let pokeAvatar = document.querySelector('#sprite')
            let pokeID = document.querySelector('#number')
            let pokeName = document.querySelector('#name')
            let pokeType = document.querySelector('#type-input')
            let pokeHeight = document.querySelector('#height-input')
            let pokeWeight = document.querySelector('#weight-input')
            
            pokeAvatar.src = pokemon.sprites.other['official-artwork'].front_default
            pokeID.innerText = `# ${pokemon.id}`
            pokeName.innerText = pokemon.name
            pokeType.innerText = pokemon.types[0].type.name
            pokeHeight.innerText = `${pokemon.height} ft`
            pokeWeight.innerText = `${pokemon.weight/10} kg`

        }
    )

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
        .then(response => {

            const pokemon = response.data

            let pokeTrivia = document.querySelector('#poke-trivia')

            pokeTrivia.innerText = pokemon.flavor_text_entries[6].flavor_text

        }
    )
}


