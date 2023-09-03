import { object, string } from "yup";

const credentialsSchema = object({
    username: string().required(),
    password: string().required()
});

export default credentialsSchema;