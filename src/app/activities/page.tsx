"use client";

import { SocialNetworkResponse } from "@/dto/response/social-network-response";
import { useAuthValidate } from "@/hooks/useAuthValidate";
import { getAllSocialNetworks } from "@/service/socialNetworkService";
import React, { useEffect, useState } from "react";

const Activity = () => {
	useAuthValidate();

	const [socialNetworkList, setSocialNetworkList] = useState<SocialNetworkResponse[]>([]);

	const onSubmitForm = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("Enviando Formulario");
	};

	useEffect(() => {
		const getSocialNetworkList = async (): Promise<void> => {
			const response = await getAllSocialNetworks();
			console.log(response);
			setSocialNetworkList(response.data);
		};

		getSocialNetworkList();
	}, []);

	return (
		<section className="m-8">
			<h1 className="font-mono">La sección de actividades</h1>

			<form onSubmit={onSubmitForm} className="mt-8">
				<fieldset>
					<label>
						Red Social:
						{socialNetworkList.length > 0 && (
							<select
								name="socialNetworkId"
								className="w-48 border-gray-100 bg-gray-100 text-gray-800 mx-4"
							>
								<option value="">Red Social</option>
								{socialNetworkList.map((socialNetwork) => (
									<option value={socialNetwork.id} key={socialNetwork.id}>
										{socialNetwork.name || "N/A"}
									</option>
								))}
							</select>
						)}
					</label>
				</fieldset>
			</form>
		</section>
	);
};

export default Activity;
