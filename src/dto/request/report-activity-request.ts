import z, { date, object, string, uuidv4 } from "zod";

export const ReportActivityRequest = object({
	userAuthId: uuidv4().optional(),
	socialNetworkId: uuidv4().optional(),
	activityTypeId: uuidv4().optional(),
	farmId: uuidv4().optional(),
	deviceId: uuidv4().optional(),
	accountId: uuidv4().optional(),
	simpleDate: date().optional(),
	fromDate: date().optional(),
	toDate: date().optional(),
	monthDate: date().optional(),
	yearDate: date().optional(),
	zoneId: string().optional(),
});

export type ReportActivityRequest = z.infer<typeof ReportActivityRequest>;
