import z, { string } from "zod";
import { BaseResponse } from "./base-response";

export const SocialNetworkResponse = BaseResponse.extend({
	name: string(),
});

export type SocialNetworkResponse = z.infer<typeof SocialNetworkResponse>;
