import z, { string } from "zod";
import { BaseResponse } from "./base-response";

export const FarmResponse = BaseResponse.extend({
	code: string(),
	name: string(),
	type: string(),
});

export type FarmResponse = z.infer<typeof FarmResponse>;
