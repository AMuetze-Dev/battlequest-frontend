import credentialsSchema from "../data/CredentialsSchema";
import playerSchema from "../data/PlayerSchema";
import messageSchema from "../data/MessageSchema";

const validate = async (schema, data) => {
    let isValidated = true;
    let response;
    try {
        response = await schema.validate(data, { abortEarly: false });
        isValidated = true;
    } catch (error) {
        console.log(error);
        response = error;
        isValidated = false;
    }
    return { isValidated, response };
}

export const validateCredentials = async (credentials) => {
    return await validate(credentialsSchema, credentials);
}

export const validatePlayer = async (player) => {
    return await validate(playerSchema, player);
}

export const validateMessage = async (message) => {
    return await validate(messageSchema, message);
}