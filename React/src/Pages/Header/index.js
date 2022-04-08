import "./style.css"
import { useState,useEffect, useContext } from "react";
import { DadosGlobais } from "../../App";
import { useNavigate } from "react-router";
let pokeBox = 12

function Intro(){
    const [dados, setDados] = useContext(DadosGlobais)
    const navigate = useNavigate()

    function linkHandler(event, int) {
        event.preventDefault()
        dados.page = 2
        navigate(`/?page=${int}`)
    }

    function dropdown() {
        return(
            <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Generation
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">    
                    <a href="/?page=1"><li><a className="dropdown-item" >Generation 1</a></li></a>                    
                    <a href={`/?page=${Math.ceil(152/pokeBox)}`}><li><a className="dropdown-item" >Generation 2</a></li></a>                    
                    <a href={`/?page=${Math.ceil(253/pokeBox)}`}><li><a className="dropdown-item" >Generation 3</a></li></a>                    
                    <a href={`/?page=${Math.ceil(387/pokeBox)}`}><li><a className="dropdown-item" >Generation 4</a></li></a>                    
                    <a href={`/?page=${Math.ceil(494/pokeBox)}`}><li><a className="dropdown-item" >Generation 5</a></li></a>                    
                    <a href={`/?page=${Math.ceil(650/pokeBox)}`}><li><a className="dropdown-item" >Generation 6</a></li></a>                    
                    <a href={`/?page=${Math.ceil(722/pokeBox)}`}><li><a className="dropdown-item" >Generation 7</a></li></a>                    
                    <a href={`/?page=${Math.ceil(810/pokeBox)}`}><li><a className="dropdown-item" >Generation 8</a></li></a>                    
                
                
                </ul>
            </div>
        )
    }
    

    return (
    <header>
        <div id="intro">
            <h1>PokeDex React</h1>

            <div id="head-right">        
                {dropdown()}
                <form id="search-form">
                    <input type="text" placeholder="Search" name="pokeSearch"/>
                    <input type="submit" />                    
                </form>
            </div>    
        </div>
    </header>   
    
    )
}

export default Intro