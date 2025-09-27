import z, { boolean, object, string } from "zod";

export const AccountReplaceRequest = object({
	username: string().nonempty(),
	password: string().nonempty(),
	replacePerson: boolean(),
	fakeName: string().optional(),
	fakeLastName: string().optional(),
});

export type AccountReplaceRequest = z.infer<typeof AccountReplaceRequest>;
