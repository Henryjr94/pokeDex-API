import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './Pages/Header'
import Home from './Pages/Home'

function MyRoutes() {
    return(
         <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes