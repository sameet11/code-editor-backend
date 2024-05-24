
import { z } from "zod";


export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const activeSchema=z.map(z.string(),z.object({
    containerId:z.string(),
    timeStamp:z.date(),
}));

export type Activecontainer=z.infer<typeof activeSchema>;
