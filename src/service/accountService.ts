import { env } from "@/config/env";
import { AccountResponse } from "@/dto/response/account-response";
import { ApiResponse } from "@/dto/response/api-response";
import { getCommonHeaders, handleSuccessAndErrorResponse } from "./commonService";
import { AccountReplaceRequest } from "@/dto/request/account-replace-request";
import { AccountExtensionRequest } from "@/dto/request/account-extension-request";

const { BACKEND_HOST } = env;
const RESOURCE = "/accounts";

export const searchAccount = async (keyword: string): Promise<ApiResponse<AccountResponse[]>> => {
	let queryParams = "";
	if (keyword) {
		queryParams += `?username=${encodeURIComponent(keyword)}`;
	}
	const response = await fetch(`${BACKEND_HOST}${RESOURCE}/search${queryParams}`, {
		method: "GET",
		headers: getCommonHeaders(),
	});

	return handleSuccessAndErrorResponse<ApiResponse<AccountResponse[]>>(response);
};

export const replaceAccountService = async (
	accountId: string,
	accountReplaceRequest: AccountReplaceRequest,
): Promise<ApiResponse<AccountResponse>> => {
	const response = await fetch(`${BACKEND_HOST}${RESOURCE}/${accountId}/replace`, {
		method: "POST",
		headers: getCommonHeaders(),
		body: JSON.stringify(accountReplaceRequest),
	});

	return handleSuccessAndErrorResponse<ApiResponse<AccountResponse>>(response);
};

export const extendAccountService = async (
	accountId: string,
	accountExtensionRequest: AccountExtensionRequest,
): Promise<ApiResponse<AccountResponse>> => {
	const response = await fetch(`${BACKEND_HOST}${RESOURCE}/${accountId}/extension`, {
		method: "POST",
		headers: getCommonHeaders(),
		body: JSON.stringify(accountExtensionRequest),
	});

	return handleSuccessAndErrorResponse<ApiResponse<AccountResponse>>(response);
};
