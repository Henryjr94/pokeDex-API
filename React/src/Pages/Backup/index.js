import "./style.css"
import axios from "axios"
import { useState,useEffect, useContext } from "react";
import { DadosGlobais } from "../../App";
let setupInit = true
let pokeBoxQtd = 12
let renderSetup = true
const typeColor =
{
normal:  "#ACAC9B", fire:    "#FF4422", water:  "#3399FF",
electric:"#FFCC33", grass:   "#77CC55", ice:    "#66CCFF",
fighting:"#BB5544", poison:  "#AA5599", ground: "#DDBB55",
flying:  "#8899FF", psychic: "#FF5599", bug:    "#AABB22",
rock:    "#BBAA66", ghost:   "#6666BB", dragon: "#7766EE",
dark:    "#775544", steel:   "#AAAABB", fairy:  "#EE99EE"
}

function Home() {
    const [dados, setDados] = useContext(DadosGlobais)
    let [pokeData, setPokeData] = useState([])
    let [listRender, setListRender] = useState([])
    

    function addDiv(pokeID) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`).then(res => {
                
                let pokeDB = res.data 
                
                setPokeData(arr => [...arr, pokeDB])
            })  

    } 

    useEffect(() => {
        if(setupInit){

            setPokeData([])
            setListRender([])

            for(let i = 0; i < pokeBoxQtd; i++)
            addDiv(dados.starterPoke + i)

            setupInit = false            
        }        
    }, [dados])

    useEffect(() => {
        if(renderSetup && pokeData.length == pokeBoxQtd){
            pokeData.sort((a,b) => a.id - b.id)

            for(let i = 0; i < pokeBoxQtd; i++){
                let type2Style = "visible"
                let type2Color = typeColor["fire"]

                let setType2 = (bol) => {
                    if(bol){
                        type2Color = typeColor[pokeData[i].types[1].type.name]
                        return pokeData[i].types[1].type.name
                    }
                    else
                    type2Style = "hidden" 
                }

                setListRender(arr => [...arr, (
                    <div className="pokemon-box">
                        <img src={pokeData[i].sprites.other["official-artwork"].front_default} />
                        <div className="poke-info">
                            <div className="poke-name">{pokeData[i].name}</div>
                            <div id="type-box">
                                <div id="type-1" style={{backgroundColor: typeColor[pokeData[i].types[0].type.name]}}>{pokeData[i].types[0].type.name}</div>
                                <div id="type-2" style={{visibility: type2Style, backgroundColor: type2Color}}>{pokeData[i].types[1] ?  setType2(true) : setType2(false)}</div>
                            </div>
                            <div id="stats">
                                ID: {pokeData[i].id} <br />
                                Height: {pokeData[i].height*10 + " cm"} <br />
                                Weight: {pokeData[i].weight/10 + " kg"} <br />
                            </div>                            
                        </div>                
                    </div>
                )])

            }
            
            renderSetup = false            
        }

    }, [pokeData])

    return(
        <main>
            <div id="nav-menu">
                <div className="nav-btn" onClick={() => {
                    if(dados.starterPoke > pokeBoxQtd)
                    setDados(arr => ({...arr, starterPoke: arr.starterPoke -= pokeBoxQtd}))
                    else
                    setDados(arr => ({...arr, starterPoke: 1}))

                    setupInit = true
                    renderSetup = true
                }}>Prev Page</div>
                <div className="nav-btn"onClick={() => {
                    setDados(arr => ({...arr, starterPoke: arr.starterPoke += pokeBoxQtd}))
                    
                    setupInit = true
                    renderSetup = true
                 }}>Next Page</div>
            </div>

            <div id="current-page">
            {listRender}     
            </div>

            
        </main>
    )


        
}

 
export default Home