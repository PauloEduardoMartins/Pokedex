import Navbar from "./NavBar"
import App from "./PokeInfo"
import About from "./About"
import { Route, Routes } from "react-router-dom"

function App2() {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/PokeInfo" element={<App/>} />
        </Routes>
      </div>
    </>
  )
}

export default App2