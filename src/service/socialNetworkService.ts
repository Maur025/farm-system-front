"use client";

import { env } from "@/config/env";
import { ApiResponse } from "@/dto/response/api-response";
import { SocialNetworkResponse } from "../dto/response/social-network-response";
import { handleSuccessAndErrorResponse } from "./commonService";

const { BACKEND_HOST } = env;

const RESOURCE = "/social-networks";

export const getAllSocialNetworks = async (): Promise<ApiResponse<SocialNetworkResponse[]>> => {
	const response = await fetch(`${BACKEND_HOST}${RESOURCE}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		},
	});

	return handleSuccessAndErrorResponse<ApiResponse<SocialNetworkResponse[]>>(response);
};
