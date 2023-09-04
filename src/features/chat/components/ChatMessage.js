import style from "./ChatMessage.module.css";

export default function ChatMessage({ chat }) {
    return (
        <li className={style.message}>
            <span className={style.sender}>{chat.senderName}</span>
            {
                chat.status === "MESSAGE" ?
                    <> : {chat.message}</> :
                    <span className={style.sender}> ist beigetreten</span>
            }
        </li>
    )
}