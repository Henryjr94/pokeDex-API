import { createContext, useState } from 'react'
import Routes from './routes'
export const DadosGlobais = createContext()

function App() {

  let [dados, setDados] = useState({
    starterPoke: 1,
    page: 1
  })

  return (
    <DadosGlobais.Provider value={[dados, setDados]}>
      <Routes />      
    </DadosGlobais.Provider>
  );
}

export default App;
