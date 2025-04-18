import ReportFilter from "@/features/report/components/table/report-filter";
import { ReportTable } from "@/features/report/components/table/report-table";
import { getAuthSession } from "@/lib/auth-context";

export default async function Home() {
	const currentUser = await getAuthSession();
	return (
		<main className="space-y-4">
			<ReportFilter isUserOnly={true} role={currentUser?.user.role ?? ""} />
			<ReportTable />
		</main>
	);
}
