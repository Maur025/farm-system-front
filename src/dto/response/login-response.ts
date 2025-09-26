import z, { number, object, string } from "zod";

export const LoginResponse = object({
	scope: string(),
	access_token: string(),
	refresh_token: string(),
	token_type: string(),
	expires_in: number().nonnegative(),
	refresh_expires_in: number().nonnegative().optional(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;
