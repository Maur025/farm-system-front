"use client";

import { useAuthValidate } from "@/hooks/useAuthValidate";

const ReplaceAccountPage = () => {
	useAuthValidate();

	return (
		<section>
			<h1>Replace Account Page</h1>

			<form>
				<fieldset>
					<label>
						Select Account: <select name="accountId"></select>
					</label>

					<label>
						Username: <input type="text" name="username" />
					</label>

					<label>
						password: <input type="text" name="password" />
					</label>

					<label>
						change person of register? <input type="checkbox" name="replacePerson" />
					</label>

					<label></label>
				</fieldset>
			</form>
		</section>
	);
};

export default ReplaceAccountPage;
