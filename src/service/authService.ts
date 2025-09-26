import { LoginRequest } from "@/component/login-request";
import { env } from "@/config/env";
import { LoginResponse } from "@/dto/response/login-response";

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

	if (!response.ok) {
		let errorMessage = "Error to fetch login auth";

		try {
			const errorData = await response.clone().json();
			errorMessage = errorData?.message || JSON.stringify(errorData);
		} catch {
			const text = await response.clone().text();

			if (text) errorMessage = text;
		}

		console.error(errorMessage);
		throw new Error(errorMessage);
	}

	return response.json();
};

export const refreshTokenService = async (): Promise<LoginResponse> => {
	const response = await fetch(`${AUTH_HOST}${RESOURCE}/token?grant_type=refresh_token`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error to fetch refresh token");
	}

	return response.json();
};
