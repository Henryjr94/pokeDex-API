const gen_1 = 151
const gen_2 = 251
const gen_3 = 386
const gen_4 = 493
const currentGen = gen_4

const nextPageBtn = document.querySelector("#next-page-btn")
const prevPageBtn = document.querySelector("#prev-page-btn")

const pokemonBox1 = document.querySelector("#pokemon-box-1")
const pokemonBox2 = document.querySelector("#pokemon-box-2")
const pokemonBox3 = document.querySelector("#pokemon-box-3")
const pokemonBox4 = document.querySelector("#pokemon-box-4")
const pokemonBox5 = document.querySelector("#pokemon-box-5")
const pokemonBox6 = document.querySelector("#pokemon-box-6")
const pokemonBox7 = document.querySelector("#pokemon-box-7")
const pokemonBox8 = document.querySelector("#pokemon-box-8")

const boxSelect = [pokemonBox1,pokemonBox2,pokemonBox3,pokemonBox4,pokemonBox5,pokemonBox6,pokemonBox7,pokemonBox8]
let currentPage = 0

function boxUpdate (num, pokeID) {

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
        .then(response => {

            const pokeData = response.data

            boxSelect[num].children[0].src = pokeData.sprites.other["official-artwork"].front_default

            console.log(pokeData.name + "  " + pokeData.types.length)

            if (pokeData.types.length == 1){
                boxSelect[num].children[1].innerHTML = `name: ${pokeData.name} <br> number: ${pokeData.id} <br> type: ${pokeData.types[0].type.name}`
            } else {
                boxSelect[num].children[1].innerHTML = `name: ${pokeData.name} <br> number: ${pokeData.id} <br> type: ${pokeData.types[0].type.name} / ${pokeData.types[1].type.name}`
            }

        })

}

nextPageBtn.onclick = () => {
        
    if(currentPage * 8 <= currentGen){
       currentPage++
    }

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

for (let i = 0; i < 8; i++){

    boxUpdate(i,i+1)

}
