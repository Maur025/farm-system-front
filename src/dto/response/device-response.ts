import z, { string, uuidv4 } from "zod";
import { BaseResponse } from "./base-response";
import { FarmResponse } from "./farm-response";

export const DeviceResponse = BaseResponse.extend({
	brand: string().optional(),
	deviceNumber: string(),
	farm: FarmResponse,
	farmId: uuidv4(),
	model: string(),
	serialNumber: string().optional(),
});

export type DeviceResponse = z.infer<typeof DeviceResponse>;
