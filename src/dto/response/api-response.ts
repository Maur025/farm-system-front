import z, { any, number, object, string } from "zod";
import { PaginationResponse } from "./pagination-response";

export const ApiResponse = object({
	code: number(),
	message: string(),
	data: any(),
	pagination: PaginationResponse.optional(),
});

export type ApiResponse<T> = Omit<z.infer<typeof ApiResponse>, "data"> & {
	data: T;
};
