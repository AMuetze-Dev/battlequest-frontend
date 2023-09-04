import { object, string, number, boolean } from "yup";

const messageSchema = object({
    senderName: string().required(),
    receiverTeamId: number().default(() => -1),
    status: string().required(),
    connected: boolean().nullable(),
    message: string().required()
});

export default messageSchema;