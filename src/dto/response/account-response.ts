import z, { array, boolean, string, uuidv4 } from "zod";
import { BaseResponse } from "./base-response";
import { DeviceResponse } from "./device-response";

export const AccountResponse = BaseResponse.extend({
	accountLink: string().optional(),
	devices: array(DeviceResponse).default([]),
	identityUsername: string().optional(),
	isEnabled: boolean(),
	password: string(),
	personId: uuidv4(),
	socialNetworkId: uuidv4(),
	type: string(),
	username: string(),
});

export type AccountResponse = z.infer<typeof AccountResponse>;
