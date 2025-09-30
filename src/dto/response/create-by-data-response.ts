import z, { array, number, string } from "zod";
import { BaseResponse } from "./base-response";

export const CreateByDataResponse = BaseResponse.extend({
	authTime: number().nonnegative(),
	name: string(),
	roles: array(string()),
	username: string(),
});

export type CreateByDataResponse = z.infer<typeof CreateByDataResponse>;
