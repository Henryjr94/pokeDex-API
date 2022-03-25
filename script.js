// const gen_1 = 151
// const gen_2 = 251
// const gen_3 = 386
const gen_4 = 898
const currentGen = gen_4
const typeColor =
{
normal: "#ACAC9B",fire: "#FF4422",water: "#3399FF",
electric: "#FFCC33",grass: "#77CC55", ice: "#66CCFF",
fighting: "#BB5544", poison: "#AA5599", ground: "#DDBB55",
flying: "#8899FF", psychic: "#FF5599", bug: "#AABB22",
rock: "#BBAA66", ghost: "#6666BB", dragon: "#7766EE",
dark: "#775544", steel: "#AAAABB", fairy: "#EE99EE"
}

// Query for nav buttons
const nextPageBtn = document.querySelector("#next-page-btn")
const prevPageBtn = document.querySelector("#prev-page-btn")
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

// Query for containers
const pokemonBox = document.querySelectorAll(".pokemon-box")
const focusBox = document.querySelector("#focus-box")
const mainBox = document.querySelector("#main-box")
const type1 = document.querySelector("#type-1")
const type2 = document.querySelector("#type-2")
const pokeStats = document.querySelector("#poke-stats")

// Variable to manipulate the containers
const boxSelect = []
for (i = 0; i < pokemonBox.length; i++){
    boxSelect.push(pokemonBox[i])
}
let currentPage = 0

function focusBoxUpdate (id) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {     

        const pokeData = response.data

        focusBox.children[0].src = pokeData.sprites.other["official-artwork"].front_default
        focusBox.children[1].children[0].innerText = pokeData.name
        type1.innerText = pokeData.types[0].type.name
        type1.style.backgroundColor = typeColor[pokeData.types[0].type.name]

        if (pokeData.types.length == 2){
            type2.innerText = pokeData.types[1].type.name
            type2.style.visibility = "visible"
            type2.style.backgroundColor = typeColor[pokeData.types[1].type.name]
        }   
        else{
            type2.style.visibility = "hidden"
        }

        for (i = 0; i < 6; i++)
        pokeStats.children[i].innerText = `${pokeData.stats[i].stat.name}: ${pokeData.stats[i].base_stat}`

    })
}

// function to update the page pokemon basic info
function boxUpdate (boxID, pokeID) {
    //boxID  type: int | desc: id of the container that will be updated
    //pokeID type: int | desc: id of the pokemon

    //api that gets pokemon info
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
    .then(response => {
        //.then is a promise(code will not stop at this point)
        const pokeData = response.data

        boxSelect[boxID].children[0].src = pokeData.sprites.other["official-artwork"].front_default
        boxSelect[boxID].children[2].innerHTML = pokeData.id


        if (pokeData.types.length == 1){

            boxSelect[boxID].children[1].innerHTML = `name: ${pokeData.name} <br> ID: ${pokeData.id} <br> type: ${pokeData.types[0].type.name}`
        } else {

            boxSelect[boxID].children[1].innerHTML = `name: ${pokeData.name} <br> ID: ${pokeData.id} <br> type: ${pokeData.types[0].type.name} / ${pokeData.types[1].type.name}`
        }
    })

    // axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`)
    // .then(response => {
    //     //.then is a promise(code will not stop at this point)

    //     const pokeData = response.data

    //     boxSelect[boxID].children[0].style.backgroundColor = pokeData.color.name
    // })

}

// search function
searchBtn.onclick = () => {
    console.log(searchInput.value)
    focusBox.style.visibility = "visible"
    focusBoxUpdate(searchInput.value)  
    searchInput.value = ""  
}

// initial page update with info, starting from id "1"
boxSelect.map((e,i) => boxUpdate(i,i+1))

// checks if the next page have itens to be placed
// updates the containers with info using boxUpdate() function
nextPageBtn.onclick = () => {
        
    if(currentPage * 8 <= currentGen)

    currentPage++

    if(currentPage * 8 <= currentGen){

        for(let i = 0; i < 8; i++){

            if((i+1) + currentPage * 8 <= currentGen){
                
                boxUpdate(i, (i+1) + currentPage * 8) 

            } else {

                boxSelect[i].style.visibility = "hidden"
            }            
        }
    } else {

        currentPage--
    }
}

// checks if the current page is not 1
prevPageBtn.onclick = () => {
       
    if(currentPage > 0){

       currentPage--

        for(let i = 0; i < 8; i++){

            if((i+1) + currentPage * 8 <= currentGen){

                boxUpdate(i, (i+1) + currentPage * 8)
                boxSelect[i].style.visibility = "visible"

            } else {

                boxSelect[i].style.visibility = "hidden"

            }            
        }   
    }    
}

// goes through every container to check for mouse click
boxSelect.map((e,i) => boxSelect[i].onclick = () => {
    let currentPoke = boxSelect[i].children[2].innerHTML
    focusBox.style.visibility = "visible"
    focusBoxUpdate(currentPoke)
})

focusBox.onclick = () => {
    focusBox.style.visibility = "hidden"
    type2.style.visibility = "hidden"
}
