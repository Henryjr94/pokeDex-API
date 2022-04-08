import * as React from 'react';
import { ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import "./style.css"
import { DadosGlobais } from "../../App";
let setupInit = true
function counter(e) {

}

function Example() {
    const [show, setShow] = React.useState(true);
    const [dados, setDados] = React.useContext(DadosGlobais)

    React.useEffect(() => {
        if(setupInit){
            setupInit = false
        }
    }, [dados])

    return (
        <>
            <style type="text/css">
                {`
                .btn-flat {
                background-color: red;
                color: white;
                }

                .btn-xxl {
                padding: 1rem 1.5rem;
                font-size: 1.5rem;
                }

                .btn:focus {
                    outline: none;
                    box-shadow: none;        
                }
                `}
            </style>

            <Button variant="flat" onClick={(e) => {
                e.preventDefault()
                setDados(arr => ({...arr, pokeStarter: arr.pokeStarter++}))
                setupInit = true
            }}>
                flat button
            </Button>
        </>
    );

}

export default Example