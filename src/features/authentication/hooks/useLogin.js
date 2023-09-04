import { login } from "../services/login";
import { toast } from "react-toastify";

const handleLogin = async (username, setHashedUsername, password, setHashedPassword, setToken) => {

    try {
        const token = await login({ username, password });
        if(token) {
            setHashedUsername(username);
            setHashedPassword(password);
            setToken(token);
        }
    } catch (error) {
        toast.error("Login failed");
    }
}

export { handleLogin };