import { ActivityResponse } from "@/dto/response/activity-response";
import { ApiResponse } from "@/dto/response/api-response";
import { getCommonHeaders, handleSuccessAndErrorResponse } from "./commonService";
import { env } from "@/config/env";
import { ReportActivityRequest } from "../dto/request/report-activity-request";
import { PaginationRequest } from "../dto/request/pagination-request";

const { BACKEND_HOST } = env;
const RESOURCE = "reports";

export const getReportActivityService = async (
	reportActivityRequest: ReportActivityRequest,
	paginationRequest: PaginationRequest,
): Promise<ApiResponse<ActivityResponse[]>> => {
	const pagination = PaginationRequest.parse(paginationRequest);

	let queryParams = `?page=${pagination.page}&size=${pagination.size}`;

	if (pagination.sortBy) {
		queryParams += `&sortBy=${pagination.sortBy}`;
	}

	if (pagination.descending !== undefined) {
		queryParams += `&descending=${pagination.descending}`;
	}

	const response = await fetch(`${BACKEND_HOST}/${RESOURCE}/activities/report${queryParams}`, {
		method: "POST",
		headers: getCommonHeaders(),
		body: JSON.stringify(reportActivityRequest),
	});

	return handleSuccessAndErrorResponse<ApiResponse<ActivityResponse[]>>(response);
};
