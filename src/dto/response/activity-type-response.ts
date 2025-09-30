import z, { string } from "zod";
import { BaseResponse } from "./base-response";

export const ActivityTypeResponse = BaseResponse.extend({
	name: string(),
	code: string(),
});

export type ActivityTypeResponse = z.infer<typeof ActivityTypeResponse>;
