import { z } from "zod";

export const urlSchema = z.object({
    shortId: z.string(),
    redirectUrl: z.string(),
    createdAt: z.date()
})