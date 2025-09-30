"use client";

import { SocialNetworkResponse } from "@/dto/response/social-network-response";
import { useAuthValidate } from "@/hooks/useAuthValidate";
import { getAllSocialNetworks } from "@/service/socialNetworkService";
import { Combobox } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import MainLayout from "@/component/MainLayout";
import { ActivityResponse } from "@/dto/response/activity-response";
import { getAllActivities } from "@/service/activityService";
import { getFormatDate } from "@/util/get-format-date";

const Activity = () => {
	useAuthValidate();

	const [socialNetworkList, setSocialNetworkList] = useState<SocialNetworkResponse[]>([]);
	const [activityList, setActivityList] = useState<ActivityResponse[]>([]);
	const [deviceSelected, setDeviceSelected] = useState(null);

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

		const getActivityList = async (): Promise<void> => {
			const response = await getAllActivities();
			console.log(response);
			setActivityList(response.data);
		};

		getSocialNetworkList();
		getActivityList();
	}, []);

	return (
		<MainLayout>
			<div className="font-mono grid grid-cols-2 gap-8 w-full">
				<section>
					<h3 className="mb-8">ACTIVITY CREATE</h3>

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
							<label>
								Select device:
								<Combobox
									value={deviceSelected}
									onChange={setDeviceSelected}
								></Combobox>{" "}
							</label>
						</fieldset>
					</form>
				</section>

				<section>
					<h3 className="mb-8">ACTIVITY LIST</h3>

					<div className="overflow-x-auto">
						<table className="min-w-full border-collapse border border-gray-400 bg-white text-sm dark:border-gray-500 dark:bg-gray-800">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 text-sm max-w-xs">
										Activity Date
									</th>
									<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 text-sm max-w-xs">
										Username
									</th>
									<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 text-sm max-w-xs">
										Activity Type
									</th>
									<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 text-sm max-w-xs">
										Link
									</th>
								</tr>
							</thead>
							<tbody>
								{activityList.length > 0 &&
									activityList.map((activity) => (
										<tr key={activity.id}>
											<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-xs max-w-xs break-words">
												{getFormatDate(activity.activityDate)}
											</td>
											<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-xs max-w-xs break-words">
												{activity?.account?.username || "N/A"}
											</td>
											<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-xs max-w-xs break-words">
												{activity?.activityType?.name || "N/A"}
											</td>
											<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-xs max-w-xs break-words">
												{activity.link || "N/A"}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</MainLayout>
	);
};

export default Activity;
