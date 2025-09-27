import z, { any, number, object, string } from "zod";

export const ApiResponse = object({
	code: number(),
	message: string(),
	data: any(),
});

export type ApiResponse<T> = Omit<z.infer<typeof ApiResponse>, "data"> & {
	data: T;
};
