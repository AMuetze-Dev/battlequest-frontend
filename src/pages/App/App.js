import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useToken } from "../../hooks/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";

import ParticlesContainer from "../../components/ui/ParticlesContainer";
import Login from "../Login/Login";
import { Chat } from "../../features/chat/index";
import LobbySelector from "../LobbySelector/LobbySelector";
import NotificationContainer from "../../components/ui/NotificationContainer";

export default function App() {

    const { token, setToken } = useToken();

    return (
        <React.Fragment>
            <ParticlesContainer />
            <BrowserRouter>
                {!token ?
                    <Login setToken={setToken} />
                    :
                    <React.Fragment>
                        <Routes>
                            <Route path="/" element={<LobbySelector />} />
                        </Routes>
                        <Chat token={token} />
                    </React.Fragment>
                }
            </BrowserRouter>
            <NotificationContainer />
        </React.Fragment>
    )
}