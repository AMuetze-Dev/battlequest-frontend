import { useState } from "react";
import { loadNickname } from "../services/reload";
import { modifyNickname } from "../services/modifyNickname";

export default function useNicknameForm() {

    const [nickname, setNickname] = useState("");

    const reloadNickname = () => {
        loadNickname();
    }

    return { nickname, setNickname, reloadNickname, modifyNickname };
}