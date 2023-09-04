import { over } from "stompjs";
import SockJS from "sockjs-client";

import { API_BASE_URL } from "../../../data/constants";

let stompClient = null;

export async function loadPlayer({ token }) {
    try {
        const response = await fetch(`${API_BASE_URL}/player/${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function connect(userData, setUserData, onMessageReceived, onUserJoin) {
    let Sock = new SockJS(`${API_BASE_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, () => onConnected(userData, setUserData, onMessageReceived, onUserJoin), onError);
}

export async function send(api, chatMessage) {
    if (!stompClient) {
        console.error("WebSocket connection is not established");
        return
    }
    console.log(chatMessage);
    await stompClient.send(api, {}, JSON.stringify(chatMessage));
}

async function onConnected(userData, setUserData, onMessageReceived, onUserJoin) {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    if (userData.receiverTeamId !== -1)
        stompClient.subscribe(`/chatroom/${userData.receiverTeamId}`, onMessageReceived);
    onUserJoin();
}

function onError(error) {
    console.log("error", error);
}