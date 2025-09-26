"use client";

import { useAuthValidate } from "@/hooks/useAuthValidate";

const Activity = () => {
	useAuthValidate();

	return (
		<section>
			<h1>La sección de actividades</h1>
		</section>
	);
};

export default Activity;
