import z, { string } from "zod";
import { BaseResponse } from "./base-response";
import { AccountResponse } from "./account-response";
import { ActivityTypeResponse } from "./activity-type-response";
import { CreateByDataResponse } from "./create-by-data-response";

export const ActivityResponse = BaseResponse.extend({
	account: AccountResponse,
	activityDate: string(),
	activityType: ActivityTypeResponse,
	createdByData: CreateByDataResponse,
	link: string(),
});

export type ActivityResponse = z.infer<typeof ActivityResponse>;
