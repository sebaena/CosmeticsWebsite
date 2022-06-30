import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import cosmeticReducer from "./reducers/cosmeticReducer";
import ingredientReducer from "./reducers/ingredientReducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import store from "./store.js"

// import axios from 'axios'

// const consmeticsListPromise = axios.get('http://localhost:3001/cosmeticsList')
// console.log(consmeticsListPromise)

// const ingredientsListPromise = axios.get('http://localhost:3001/ingredientsList')
// console.log(ingredientsListPromise)

// const store = configureStore({
//   reducer: {
//     cosmetic: cosmeticReducer,
//     ingredient: ingredientReducer,
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
