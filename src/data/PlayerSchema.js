import { object, string, number } from "yup";

const playerSchema = object({
    uuid: string().required(),
    username: string(),
    nickname: string().default(() => ""),
    points: number().default(() => 0),
    password: string()
})

export default playerSchema;