import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid grid-cols-[250px_1fr] min-h-screen font-mono">
			<aside className="bg-gray-900 text-white p-4">
				<h1 className="font-bold text-lg">FARM SYSTEM</h1>

				<h2 className="text-md font-bold">Menu</h2>

				<nav>
					<ul className="mt-2 space-y-2">
						<li>
							<Link href="/dashboard">Dashboard</Link>
						</li>
						<li>
							Activity
							<ul className="ml-4 space-y-1 text-gray-400">
								<li>
									<Link href="/activities">Create</Link>
								</li>
								<li>
									<Link href="/activity-types">types</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="/devices">Device</Link>
						</li>
						<li>
							<Link href="/activities">Chip</Link>
						</li>
						<li>
							Accounts
							<ul className="ml-4 space-y-1 text-gray-400">
								<li>
									<Link href="/accounts/replace">Replace Account</Link>
								</li>
							</ul>
						</li>
						<li>
							Reports
							<ul className="ml-4 space-y-1 text-gray-400">
								<li>
									<Link href="/reports/activities">Activities</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="/users">Users</Link>
						</li>
					</ul>
				</nav>
			</aside>

			<div className="flex flex-col">
				<header className="bg-gray-900 h-16 flex flex-col justify-items-center align-middle justify-center">
					<p className="ml-4">Header</p>
				</header>

				<main className="flex-1 p-6">{children}</main>

				<footer className="p-4 text-center">copyright 2025 - Farm System</footer>
			</div>
		</div>
	);
};

export default MainLayout;
