"use client";

import React from "react";
import { LoginRequest } from "./login-request";
import { loginService } from "@/service/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
	const router = useRouter();

	const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const formDataValidate = LoginRequest.parse({
			username: formData.get("username"),
			password: formData.get("password"),
		});

		const response = await loginService(formDataValidate);
		localStorage.setItem("auth_token", response.access_token);
		router.push("/activities");
	};

	return (
		<section>
			<h1 className="font-mono">Login</h1>

			<form onSubmit={onSubmitForm}>
				<fieldset className="flex flex-col gap-2.5">
					<label className="font-mono">
						username:{" "}
						<input
							className="bg-white mx-2 text-gray-800"
							type="text"
							placeholder="username"
							name="username"
						/>{" "}
					</label>
					<label className="font-mono">
						password:{" "}
						<input
							className="bg-white mx-2 text-gray-800"
							type="password"
							name="password"
						/>
					</label>
				</fieldset>

				<div className="flex gap-4 items-end flex-col sm:flex-row mt-4">
					<button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
						Login
					</button>

					<Link
						href="/register"
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
					>
						Register
					</Link>
				</div>
			</form>
		</section>
	);
};

export default Login;
