import useNicknameForm from "../hooks/useModificateNickname";

import style from "./NicknameForm.module.css"

export default function NicknameForm() {

    const { nickname, setNickname, reloadNickname, modifyNickname } = useNicknameForm();

    const onChangeNickname = (event) => {
        setNickname(event.target.value);
    }

    return (
        <section className={style["nickname-form"]}>
            <button onClick={reloadNickname}>reload</button>
            <input type="text" placeholder="Anzeigename ändern" value={nickname} onChange={onChangeNickname} />
            <button onClick={modifyNickname}> set</button>
        </section >
    )
}