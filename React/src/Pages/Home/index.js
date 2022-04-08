import "./style.css"
import axios from "axios"
import { useState,useEffect, useContext } from "react";
import { DadosGlobais } from "../../App";
import { Link,useNavigate, useLocation } from "react-router-dom";
const typeColor =
{
    normal:  "#ACAC9B", fire:    "#FF4422", water:  "#3399FF",
    electric:"#FFCC33", grass:   "#77CC55", ice:    "#66CCFF",
    fighting:"#BB5544", poison:  "#AA5599", ground: "#DDBB55",
    flying:  "#8899FF", psychic: "#FF5599", bug:    "#AABB22",
    rock:    "#BBAA66", ghost:   "#6666BB", dragon: "#7766EE",
    dark:    "#775544", steel:   "#AAAABB", fairy:  "#EE99EE"
}
// Gets a object from the current URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageUrl = parseInt(urlParams.get("page"))

function Home() {
    const [dados, setDados] = useContext(DadosGlobais)
    // Page is a variable that uses the current URL, if the current URL does not have a object it returns 1.
    const [page, setPage] = useState(pageUrl ? pageUrl : 1)
    const [pokeData, setPokeData] = useState([])
    const [listRender, setListRender] = useState([])
    const navigate = useNavigate()
    // pokeBox is a variable that determines the number of containers on the screen.
    const pokeBox = 12
    let initialSetup = true
    const location = useLocation()

    function pageHandle(e, direction) {
        // Directs to a page using the "page" variable and increase/decrease the variable
        // the navigate function aways triggers before setPage, thats why it directs to "page+1"
        e.preventDefault()
        if(direction == "next"){
            setPage(e => e+1)
            navigate(`/?page=${page+1}`)
        } else {
            setPage(e => e > 1? e-1 : 1)
            navigate(page == 1 ? `/?page=${page}`: `/?page=${page-1}`)
        }
    }

    function getPokeData(pokeID) {
        // getPokeData gets pokemon info by a provided id or name, then feeds it into pokeData(var:array)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`).then(res => {
                
                let pokeDB = res.data 
                
                setPokeData(arr => [...arr, pokeDB])

            })  
    }
    
    function renderDisplay (id) {

        let type2Style = "visible"
        let type2Color = typeColor["fire"]

        let setType2 = (bol) => {
            if(bol){
                type2Color = typeColor[pokeData[id].types[1].type.name]
                return pokeData[id].types[1].type.name
            }
            else
            type2Style = "hidden" 
        }

        setListRender(arr => [...arr, (
            <div className="pokemon-box">
                <img src={pokeData[id].sprites.other["official-artwork"].front_default} />
                <div className="poke-info">
                    <div className="poke-name">{pokeData[id].name}</div>
                    <div id="type-box">
                        <div id="type-1" style={{backgroundColor: typeColor[pokeData[id].types[0].type.name]}}>{pokeData[id].types[0].type.name}</div>
                        <div id="type-2" style={{visibility: type2Style, backgroundColor: type2Color}}>{pokeData[id].types[1] ?  setType2(true) : setType2(false)}</div>
                    </div>
                    <div id="stats">
                        ID: {pokeData[id].id} <br />
                        Height: {pokeData[id].height*10 + " cm"} <br />
                        Weight: {pokeData[id].weight/10 + " kg"} <br />
                    </div>                            
                </div>                
            </div>
        )])
    }    


    // this use hook trigger on any changes to the "page" variable
    useEffect(() => {
        if(initialSetup) {
            // Resets pokeData, then feeds it data from the API
            // loops for the amout of containers specified on pokeBox
            setPokeData([])
            setListRender([])
            for(let i = 0; i < pokeBox; i++)
            getPokeData((page == 1 ? page : (page-1)*pokeBox)+i)

            initialSetup = false
        }
    },[page])

    // This hook trigger on any changes to "pokeData", and execute if pokeData is 
    useEffect(() => {
        if(pokeData.length == pokeBox){

            pokeData.sort((a,b) => a.id - b.id)
            for(let i = 0; i < pokeBox; i++)
            renderDisplay(i)

        }
    },[pokeData])

    return(
        <main>
            <div id="nav-menu">
                <div onClick={e => pageHandle(e,"prev")} className="nav-btn"> Previous Page </div>               
                <div onClick={e => pageHandle(e,"next")} className="nav-btn"> Next Page </div>               
            </div>

            <div id="current-page">
                {listRender}
            </div>
            
        </main>
    )
        
}
 
export default Home