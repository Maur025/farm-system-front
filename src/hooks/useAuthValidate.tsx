"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthValidate = () => {
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("auth_token");

		if (!token) {
			router.push("/");
		}
	}, [router]);
};
