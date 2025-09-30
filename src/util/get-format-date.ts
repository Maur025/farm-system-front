export const getFormatDate = (dateStr: string): string => {
	if (!dateStr) return "N/A";

	const date = new Date(dateStr);
	return date.toLocaleString();
};
