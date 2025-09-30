import { LoginRequest } from "@/component/login-request";
import { env } from "@/config/env";
import { LoginResponse } from "@/dto/response/login-response";
import { handleSuccessAndErrorResponse } from "./commonService";
import { UserRegisterRequest } from "../dto/request/user-register-request";
import { UserResponse } from "@/dto/response/user-response";

const { AUTH_HOST } = env;
const RESOURCE = "/protocol/openid-connect";

export const loginService = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
	const response = await fetch(`${AUTH_HOST}${RESOURCE}/token?grant_type=password`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(loginRequest),
		credentials: "include",
	});

	return handleSuccessAndErrorResponse<LoginResponse>(response);
};

export const refreshTokenService = async (): Promise<LoginResponse> => {
	const response = await fetch(`${AUTH_HOST}${RESOURCE}/token?grant_type=refresh_token`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error to fetch refresh token");
	}

	return handleSuccessAndErrorResponse<LoginResponse>(response);
};

export const userRegisterService = async (
	userRegisterRequest: UserRegisterRequest,
): Promise<UserResponse> => {
	const response = await fetch(`${AUTH_HOST}/users`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(userRegisterRequest),
	});

	return handleSuccessAndErrorResponse<UserResponse>(response);
};
