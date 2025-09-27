import { object, string } from "zod";

export const BaseResponse = object({
	id: string(),
});
