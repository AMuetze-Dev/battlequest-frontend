import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

function setToken(userToken) {
  sessionStorage.setItem("token",JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {

  const token = getToken();

  return (
    <div className="wrapper">
      {!token && <Login setToken={setToken} />}
      {token &&
        <React.Fragment>
          <h1>Application</h1>
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preferences" element={<Preferences />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      }
    </div>
  )
}