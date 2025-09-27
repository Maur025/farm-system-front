import z, { string } from "zod";
import { BaseResponse } from "./base-response";

export const AccountResponse = BaseResponse.extend({
	username: string(),
});

export type AccountResponse = z.infer<typeof AccountResponse>;
