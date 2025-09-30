import z, { boolean, number, object, string } from "zod";

export const PaginationRequest = object({
	page: number().nonnegative().default(0),
	size: number().nonnegative().default(10),
	sortBy: string().optional(),
	descending: boolean().default(false).optional(),
});

export type PaginationRequest = z.infer<typeof PaginationRequest>;
