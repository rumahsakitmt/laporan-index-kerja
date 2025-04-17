import LaporanIndexContainer from "@/components/laporan-index-container";
import { ReportTable } from "@/features/report/components/table/report-table";

export default async function Home() {
	return (
		<main>
			<div className="space-y-4">
				<ReportTable />
				<LaporanIndexContainer />
			</div>
		</main>
	);
}
