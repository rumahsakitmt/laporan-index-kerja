import LaporanIndexContainer from "@/components/laporan-index-container";
import MainNavigation from "@/components/main-nav";
import { ReportTable } from "@/features/report/components/table/report-table";

export default async function Home() {
	return (
		<main className="max-w-6xl mx-auto px-8">
			<MainNavigation />
			<div className="space-y-4">
				<LaporanIndexContainer />
				<ReportTable />
			</div>
		</main>
	);
}
