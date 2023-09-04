import { LoginForm } from "../../features/authentication/index";
import style from "./Login.module.css";

export default function Login({ setToken }) {

    return (
        <section className={style["login-section"]}>
            <h2>bitte<br />einloggen</h2>
            <LoginForm setToken={setToken} />
        </section>
    )
}