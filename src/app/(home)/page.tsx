import LaporanIndexContainer from "@/components/laporan-index-container";
import { ReportTable } from "@/features/report/components/table/report-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<main>
			<div className="space-y-4">
				<div className="flex justify-end">
					{session?.user.role === "petugas" && <LaporanIndexContainer />}
				</div>
				<ReportTable />
			</div>
		</main>
	);
}
