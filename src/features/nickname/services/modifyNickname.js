import { API_BASE_URL } from "../../../data/constants";

async function modifyNickname(id, nickname) {
    try {
        const response = await fetch(`${API_BASE_URL}/player/rename/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: nickname
        });

        if (!response.ok)
            throw new Error("Modify Nickname failed. Server response not okay.");

        const data = await response.json();
        if (!data || data.error)
            throw new Error("Modify Nickname failed. Invalid response from server.");

        return data;
    } catch (error) {
        console.error("Modify Nickname error: ", error);
        return undefined;
    }

}

export { modifyNickname };