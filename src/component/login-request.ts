import z, { object, string } from "zod";

export const LoginRequest = object({
	username: string(),
	password: string(),
});

export type LoginRequest = z.infer<typeof LoginRequest>;
