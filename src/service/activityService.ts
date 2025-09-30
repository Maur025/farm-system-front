import { env } from "@/config/env";
import { ActivityResponse } from "@/dto/response/activity-response";
import { getCommonHeaders, handleSuccessAndErrorResponse } from "./commonService";
import { ApiResponse } from "@/dto/response/api-response";

const { BACKEND_HOST } = env;
const RESOURCE = "/activities";

export const getAllActivities = async (): Promise<ApiResponse<ActivityResponse[]>> => {
	const response = await fetch(`${BACKEND_HOST}${RESOURCE}`, {
		method: "GET",
		headers: getCommonHeaders(),
	});

	return handleSuccessAndErrorResponse<ApiResponse<ActivityResponse[]>>(response);
};
