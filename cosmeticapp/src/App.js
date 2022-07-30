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
  // --color-base: rgb(0, 184, 148);
  --color-base: rgb(139, 222, 212);
  --color-clicked: rgba(0, 184, 148, 0.999);
}
`;

const GlobalStyleTheme3 = createGlobalStyle`
html {
  --color-base: rgb(9, 132, 227);
  --color-clicked: rgba(9, 132, 227, 0.999);
}
`;

const GlobalStyleTheme4 = createGlobalStyle`
html {
  --color-base: rgb(255, 118, 117);
  --color-clicked: rgba(255, 118, 117, 0.999);
}
`;

const GlobalStyleTheme5 = createGlobalStyle`
html {
  --color-base: rgb(99, 110, 114);
  --color-clicked: rgba(99, 110, 114, 0.999);
}
`;

const GlobalStyleTheme6 = createGlobalStyle`
html {
  --color-base:rgb(45, 52, 54);
  --color-clicked: rgba(45 , 52, 54, 0.999);
}`;

function App() {
  const [theme, setTheme] = useState("theme1");
  const user = useSelector((state) => state.user.user);
  const themeOptions = [
    { value: "theme1", label: "Theme purple" },
    { value: "theme2", label: "Theme green" },
    { value: "theme3", label: "Theme blue" },
    { value: "theme4", label: "Theme pink" },
    { value: "theme5", label: "Theme grey" },
    { value: "theme6", label: "Theme black" },
  ];

  const selectedTheme = () => {
    switch (theme) {
      case "theme1":
        return <GlobalStyleTheme1 />;
      case "theme2":
        return <GlobalStyleTheme2 />;
      case "theme3":
        return <GlobalStyleTheme3 />;
      case "theme4":
        return <GlobalStyleTheme4 />;
      case "theme5":
        return <GlobalStyleTheme5 />;
      case "theme6":
        return <GlobalStyleTheme6 />;
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
            <img src={"favicon.ico"} />
            {" "}
          </Link>
          <Link className="navbar-link" to="/products">
            {" "}
            Products{" "}
          </Link>
          <Link className="navbar-link-signin" to="/signin">
            {" "}
            <p>
              {user && user.token ? <FaUserAlt /> : <></>}
              {user && user.token ? user.username : <></>}
            </p>
            {user && user.token ? "Online" : "Login"}{" "}
          </Link>
        </div>
        <select className="navbar-selection" onChange={handleThemeChange}>
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
