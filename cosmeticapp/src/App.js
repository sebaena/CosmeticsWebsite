import { useState } from "react";
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
import { createGlobalStyle } from "styled-components";

const GlobalStyleTheme1 = createGlobalStyle`
  html {
    --color-base: rgb(26, 5, 144);
    --color-clicked: rgba(47, 16, 221, 0.999);
  }
`;

const GlobalStyleTheme2 = createGlobalStyle`
html {
  --color-base: rgb(0, 184, 148);
  --color-clicked: rgba(0, 184, 148, 0.999);
}
`;

function App() {
  const [theme, setTheme] = useState("theme1");
  const user = useSelector((state) => state.user.user);
  const themeOptions = [
    { value: "theme1", label: "Purple Theme" },
    { value: "theme2", label: "Green Theme" },
  ];

  const selectedTheme = () => {
    switch (theme) {
      case "theme1":
        return <GlobalStyleTheme1 />;
      case "theme2":
        return <GlobalStyleTheme2 />;
      default:
        return <GlobalStyleTheme1 />;
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <HashRouter>
      {selectedTheme()}
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
        <select onChange={handleThemeChange}>
          {themeOptions.map((themeOption) => (
            <option key={themeOption.value} value={themeOption.value}>
              {themeOption.label}
            </option>
          ))}
        </select>
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
