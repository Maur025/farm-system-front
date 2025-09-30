"use client";

import MainLayout from "@/component/MainLayout";
import { PaginationRequest } from "@/dto/request/pagination-request";
import { ReportActivityRequest } from "@/dto/request/report-activity-request";
import { ActivityResponse } from "@/dto/response/activity-response";
import { PaginationResponse } from "@/dto/response/pagination-response";
import { getReportActivityService } from "@/service/reportService";
import { getFormatDate } from "@/util/get-format-date";
import { useCallback, useEffect, useState } from "react";

const ReportActivities = () => {
	const [activityList, setActivityList] = useState<ActivityResponse[]>([]);
	const [filterRequest, setFilterRequest] = useState<ReportActivityRequest>({
		zoneId: "America/La_Paz",
	});
	const [pagination, setPagination] = useState<PaginationRequest>({ page: 0, size: 15 });
	const [paginateResponse, setPaginateResponse] = useState<PaginationResponse>({
		pages: 0,
		count: 0,
	});

	const onClickPrev = useCallback(() => {
		console.log({ prevValue: pagination.page });

		if (pagination.page <= 0) {
			console.log("nothing to do");
			return;
		}

		setPagination({ ...pagination, page: pagination.page - 1 });
	}, [pagination.page]);

	const onClickNext = useCallback(() => {
		console.log({ prevValue: pagination.page });

		setPagination({ ...pagination, page: pagination.page + 1 });
	}, [pagination.page]);

	useEffect(() => {
		const getReportActivityFilterData = async (): Promise<void> => {
			console.log(filterRequest);

			const response = await getReportActivityService(filterRequest, pagination);
			console.log(response);

			setActivityList(response.data);

			if (response.pagination) {
				setPaginateResponse(response.pagination);
			}
		};

		getReportActivityFilterData();
	}, [filterRequest, pagination]);

	const onChangeFilters = (eventTarget: HTMLInputElement) => {
		const { name, value } = eventTarget;

		setPagination({ ...pagination, page: 0 });

		if (name === "simpleDate") {
			setFilterRequest({ ...filterRequest, [name]: new Date(value) });
			return;
		}

		setFilterRequest({ ...filterRequest, [name]: value });
	};

	return (
		<MainLayout>
			<div className="font-mono w-full">
				<h2 className="mb-4">REPORT ACTIVITIES</h2>

				<fieldset className="mb-8 flex flex-col">
					<legend>Filters</legend>
					<label>
						Simple Date:{" "}
						<input
							type="date"
							name="simpleDate"
							className="bg-gray-300 text-gray-800"
							onChange={(event) => onChangeFilters(event.target)}
						/>
					</label>
				</fieldset>

				<div className="overflow-x-auto mb-8">
					<table className="min-w-full border border-collapse border-gray-400 bg-white text-xs dark:border-gray-500 dark:bg-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									Activity Date
								</th>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									User register
								</th>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									Activity Type
								</th>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									Main Account
								</th>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									Belongs Device
								</th>
								<th className="border border-gray-300 p-4 text-left text-gray-900 dark:border-gray-600 dark:text-gray-200 max-w-xs">
									Belongs Farm
								</th>
							</tr>
						</thead>
						<tbody>
							{activityList.length > 0 &&
								activityList.map((activity) => (
									<tr key={activity.id}>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{getFormatDate(activity.activityDate)}
										</td>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{activity?.createdByData?.name || "N/A"}
										</td>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{activity?.activityType?.name || "N/A"}
										</td>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{activity?.account?.username || "N/A"}
										</td>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{activity?.account?.devices[0]?.deviceNumber || "N/A"}
										</td>
										<td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400 max-w-xs">
											{activity?.account?.devices[0]?.farm?.name || "N/A"}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				<section className="grid grid-cols-2 justify-between">
					<div>
						Page {pagination?.page + 1}/{paginateResponse.pages || 0} | Total records:{" "}
						{paginateResponse.count || 0}
					</div>
					<div className="grid grid-cols-5 gap-4">
						<button
							type="button"
							className="border border-gray-400 rounded-4xl"
							onClick={onClickPrev}
						>
							Prev
						</button>
						<button
							type="button"
							className="border border-gray-400 rounded-4xl"
							onClick={onClickNext}
						>
							Next
						</button>
						<select name="size" className="bg-gray-300 text-gray-800" defaultValue="15">
							<option value="5">size 5</option>
							<option value="10">size 10</option>
							<option value="15">size 15</option>
							<option value="20">size 20</option>
							<option value="25">size 25</option>
						</select>
						<select
							name="orderBy"
							className="bg-gray-300 text-gray-800 text-xs"
							defaultValue="activityDate"
							onChange={(event) =>
								setPagination({ ...pagination, sortBy: event.target.value })
							}
						>
							<option value="activityDate">Activity Date</option>
						</select>
						<select
							name="descending"
							className="bg-gray-300 text-gray-800 text-xs"
							defaultValue="true"
							onChange={(event) =>
								setPagination({
									...pagination,
									descending: event.target.value === "true",
								})
							}
						>
							<option value="true">Descending</option>
							<option value="false">Ascending</option>
						</select>
					</div>
				</section>
			</div>
		</MainLayout>
	);
};

export default ReportActivities;
