import z, { email, object } from "zod";

export const AccountExtensionRequest = object({
	referenceEmail: email(),
});

export type AccountExtensionRequest = z.infer<typeof AccountExtensionRequest>;
