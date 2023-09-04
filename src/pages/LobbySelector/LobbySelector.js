import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { NicknameForm } from "../../features/nickname/index";

import style from "./LobbySelector.module.css"

export default function Dashboard() {

    return (
        <>
            <h2>LobbySelector</h2>
            <NicknameForm />
        </>
    )
}