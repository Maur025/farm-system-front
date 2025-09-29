"use client";

import { AccountResponse } from "@/dto/response/account-response";
import { extendAccountService, searchAccount } from "@/service/accountService";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useEffect, useState } from "react";
import { AccountExtensionRequest } from "../../../dto/request/account-extension-request";

const AccountExtensionForm = () => {
	const [accountSelected, setAccountSelected] = useState<AccountResponse | null>(null);
	const [accountList, setAccountList] = useState<AccountResponse[]>([]);
	const [accountKeyword, setAccountKeyword] = useState("");

	useEffect(() => {
		const getAccountList = async () => {
			if (!accountKeyword) {
				console.info("No keyword provided, skipping account search.");
				return;
			}

			const response = await searchAccount(accountKeyword);
			setAccountList(response.data);
		};

		getAccountList();
	}, [accountKeyword]);

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!accountSelected?.id) return;

		const formData = new FormData(event.currentTarget);
		const accountExtensionRequest = AccountExtensionRequest.parse({
			referenceEmail: formData.get("email"),
		});

		const response = await extendAccountService(accountSelected.id, accountExtensionRequest);

		console.log(response);
	};
	return (
		<div>
			<h2 className="my-8">Add Account Extension</h2>

			<form onSubmit={onFormSubmit}>
				<fieldset className="flex flex-col gap-2.5">
					<label>
						Select Account:{" "}
						<Combobox value={accountSelected} onChange={setAccountSelected}>
							<ComboboxInput
								aria-label="Assignee"
								displayValue={(account: AccountResponse) => account?.username || ""}
								onChange={(event) => setAccountKeyword(event.target.value)}
								className="w-48 border-gray-100 bg-gray-100 text-gray-800 mx-4"
							/>
							<ComboboxOptions anchor="bottom" className="border empty:invisible">
								{accountList.map((account) => (
									<ComboboxOption
										key={account.id}
										value={account}
										className="data-focus:bg-blue-100 bg-gray-200 text-gray-800"
									>
										{account.username}
									</ComboboxOption>
								))}
							</ComboboxOptions>
						</Combobox>
					</label>
					<label>
						Email reference:{" "}
						<input
							type="email"
							name="email"
							required
							className="w-1/2 border-gray-100 bg-gray-100 text-gray-800 mx-4"
						/>
					</label>
				</fieldset>

				<div className="flex gap-4 items-end flex-col sm:flex-row mt-4">
					<button
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
						type="submit"
					>
						Add extension
					</button>
				</div>
			</form>
		</div>
	);
};

export default AccountExtensionForm;
