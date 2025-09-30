import z, { string } from "zod";
import { BaseResponse } from "./base-response";

export const UserResponse = BaseResponse.extend({
	name: string(),
	lastName: string(),
	username: string(),
	createdOn: string(),
});

export type UserResponse = z.infer<typeof UserResponse>;
