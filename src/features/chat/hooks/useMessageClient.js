import { useEffect, useState } from "react";
import { validatePlayer } from "../../../services/validation";
import { connect, send, loadPlayer } from "../services/connect";

export default function useMessageClient({ token }) {

    const [isTeamMessage, setIsTeamMessage] = useState(false);
    const [publicChats, setPublicChats] = useState([]);
    const [teamChats, setTeamChats] = useState([]);
    const [showChat, setShowChat] = useState(true);
    const [player, setPlayer] = useState({});
    const [userData, setUserData] = useState({
        senderName: "",
        receiverTeamId: -1,
        connected: false,
        message: ""
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await loadPlayer({ token });
                if (!data)
                    throw new Error("failed to load Player in MessageClient.");
                const { isValidated } = await validatePlayer(data);

                if (isValidated) {
                    setPlayer(data);
                    await connect(userData, setUserData, onMessageReceived, () => onUserJoin(data.nickname));
                }
            } catch (error) {
                console.error("Error fetching player data:", error);
            }
        }

        fetchData();
    }, [token]);

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendPublicMessage = () => {
        var chatMessage = { senderName: player.nickname, message: userData.message, status: "MESSAGE" };
        send("/app/public-message", chatMessage);
        setUserData({ ...userData, "message": "" });
    }

    const sendTeamMessage = () => {
        var chatMessage = { senderName: player.nickname, receiverTeamId: userData.teamId, message: userData.message, status: "MESSAGE" };
        send("/app/team-message", chatMessage);
        setUserData({ ...userData, "message": "" });
    }

    const toggleChat = () => {
        setShowChat(!showChat);
    }

    const toggleChatDestination = () => {
        if (isTeamMessage || !isTeamMessage && userData.receiverTeamId > -1)
            setIsTeamMessage(!isTeamMessage);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            isTeamMessage ? sendTeamMessage() : sendPublicMessage();
        }
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
    }

    const onUserJoin = (nickname) => {
        console.log("NICKNAME", nickname);
        var chatMessage = { senderName: nickname, status: "JOIN" };
        send("/app/public-message", chatMessage);
    }

    return { showChat, isTeamMessage, setIsTeamMessage, publicChats, teamChats, userData, toggleChat, handleMessage, handleKeyDown, toggleChatDestination };

}