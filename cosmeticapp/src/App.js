import Login from "./components/Login";
import Products from "./components/Products";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

function App() {
  const user = useSelector((state) => state.user.user);

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
            <p>
              {user && user.token ? <FaUserAlt /> : <></>}
              {user && user.token ? user.username : <></>}
            </p>
            {user && user.token ? "Online" : "Login"}{" "}
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
