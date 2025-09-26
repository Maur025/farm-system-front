export const handleSuccessAndErrorResponse = async <T>(response: Response): Promise<T> => {
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
