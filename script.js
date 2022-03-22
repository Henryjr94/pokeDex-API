// const gen_1 = 151
// const gen_2 = 251
// const gen_3 = 386
const gen_4 = 493
const currentGen = gen_4

// Query for nav buttons
const nextPageBtn = document.querySelector("#next-page-btn")
const prevPageBtn = document.querySelector("#prev-page-btn")

// Query for pokemon containers
const pokemonBox1 = document.querySelector("#pokemon-box-1")
const pokemonBox2 = document.querySelector("#pokemon-box-2")
const pokemonBox3 = document.querySelector("#pokemon-box-3")
const pokemonBox4 = document.querySelector("#pokemon-box-4")
const pokemonBox5 = document.querySelector("#pokemon-box-5")
const pokemonBox6 = document.querySelector("#pokemon-box-6")
const pokemonBox7 = document.querySelector("#pokemon-box-7")
const pokemonBox8 = document.querySelector("#pokemon-box-8")

// Variable to manipulate the containers
const boxSelect = [pokemonBox1,pokemonBox2,pokemonBox3,pokemonBox4,pokemonBox5,pokemonBox6,pokemonBox7,pokemonBox8]
let currentPage = 0

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

        if (pokeData.types.length == 1){

            boxSelect[boxID].children[1].innerHTML = `name: ${pokeData.name} <br> ID: ${pokeData.id} <br> type: ${pokeData.types[0].type.name}`
        } else {

            boxSelect[boxID].children[1].innerHTML = `name: ${pokeData.name} <br> ID: ${pokeData.id} <br> type: ${pokeData.types[0].type.name} / ${pokeData.types[1].type.name}`
        }
    })

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`)
    .then(response => {
        //.then is a promise(code will not stop at this point)

        const pokeData = response.data

        boxSelect[boxID].children[0].style.backgroundColor = pokeData.color.name
    })

}

// initial page update with info, starting from id "1"
for (let i = 0; i < 8; i++){
    boxUpdate(i,i+1)
}

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

function addElement () {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${1}`)
    .then(response => {
        //.then is a promise(code will not stop at this point)

        const pokeData = response.data

        pokemonBox1.children[0].style.backgroundColor = pokeData.color.name
    })
}

addElement()
