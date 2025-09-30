import z, { string } from "zod";
import { BaseResponse } from "./base-response";
import { AccountResponse } from "./account-response";
import { ActivityTypeResponse } from "./activity-type-response";

export const ActivityResponse = BaseResponse.extend({
	link: string(),
	activityDate: string(),
	account: AccountResponse,
	activityType: ActivityTypeResponse,
});

export type ActivityResponse = z.infer<typeof ActivityResponse>;
