import Login from "./components/Login";
import Products from "./components/Products";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link, HashRouter} from "react-router-dom";

function App() {
  // const padding = {
  //   padding: 5
  // }

  return (
    <HashRouter>
      <nav className="navbar">
        <div className="navbar-menu">
          <Link className="navbar-link" to="/">
            {" "}
            Home{" "}
          </Link>
          <Link className="navbar-link" to="/products">
            {" "}
            Products{" "}
          </Link>
          <Link className="navbar-link" to="/signin">
            {" "}
            Sign in{" "}
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
