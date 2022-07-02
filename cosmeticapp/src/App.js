import Login from "./components/Login";
import Products from "./components/Products";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


function App() {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to = "/"> Home </Link>
        <Link style={padding} to = "/products"> Products </Link>
        <Link style={padding} to = "/signin"> SignIn </Link>
      </div>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/products" element = {<Products />} />
        <Route path="/signin" element = {<Login />} />
      </Routes>


    </Router>
  )


}

export default App;
