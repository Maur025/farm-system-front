import z, { object, string } from "zod";

export const UserRegisterRequest = object({
	name: string().min(2).max(100),
	lastName: string().min(2).max(100),
	username: string().min(2).max(100),
	password: string().min(6).max(100),
});

export type UserRegisterRequest = z.infer<typeof UserRegisterRequest>;
