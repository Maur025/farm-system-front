"use client";

import React from "react";
import { UserRegisterRequest } from "../../dto/request/user-register-request";
import { userRegisterService } from "@/service/authService";
import { useRouter } from "next/navigation";

const Register = () => {
	const router = useRouter();

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const userRegisterRequest = UserRegisterRequest.parse({
			name: formData.get("name"),
			lastName: formData.get("lastName"),
			username: formData.get("username"),
			password: formData.get("password"),
		});

		const response = await userRegisterService(userRegisterRequest);
		console.log(response);
		router.push("/");
	};

	return (
		<div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1>REGISTER</h1>

				<section>
					<form onSubmit={onFormSubmit}>
						<fieldset className="flex flex-col gap-4">
							<label>
								Name:{" "}
								<input
									type="text"
									name="name"
									placeholder="name of user"
									className="bg-white text-gray-800"
								/>
							</label>
							<label>
								Last Name:{" "}
								<input
									type="text"
									name="lastName"
									placeholder="last name of user"
									className="bg-white text-gray-800"
								/>
							</label>
							<label>
								Username:{" "}
								<input
									type="text"
									name="username"
									placeholder="username of user"
									className="bg-white text-gray-800"
								/>
							</label>
							<label>
								Password:{" "}
								<input
									type="password"
									name="password"
									placeholder="password of user"
									className="bg-white text-gray-800"
								/>
							</label>
						</fieldset>

						<div className="flex gap-4 items-end flex-col sm:flex-row mt-4">
							<button
								type="submit"
								className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
							>
								Register
							</button>
						</div>
					</form>
				</section>
			</main>
		</div>
	);
};

export default Register;
