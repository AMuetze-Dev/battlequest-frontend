import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import useMessageClient from "../hooks/useMessageClient";
import style from "./Chat.module.css";

export default function ChatUI({ token }) {

    const {
        showChat,
        isTeamMessage,
        publicChats,
        teamChats,
        userData,
        toggleChat,
        handleMessage,
        handleKeyDown,
        toggleChatDestination
    } = useMessageClient({ token });

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [publicChats, teamChats]);

    return (
        <aside className={style.wrapper}>
            <div className={style.toolbar} onClick={toggleChat}>{isTeamMessage ? "TEAM" : "PUBLIC"}CHAT</div>
            <div className={`${style["chat"]} ${showChat ? style.active : style.inactive}`}>
                <div className={style["message-container"]} ref={scrollContainerRef} >
                    {isTeamMessage ?
                        teamChats?.map((chat, index) => (
                            <ChatMessage key={index} chat={chat} />
                        ))
                        :
                        publicChats?.map((chat, index) => (
                            <ChatMessage key={index} chat={chat} />
                        ))
                    }
                </div>
                <form className={style["input-container"]}>
                    <button type="button" onClick={toggleChatDestination}>{isTeamMessage ? "TEAM" : "ALL"}</button>
                    <input type="text" placeholder="Text..." value={userData?.message} onChange={handleMessage} onKeyDown={handleKeyDown} />
                </form>
            </div>
        </aside>
    )
}