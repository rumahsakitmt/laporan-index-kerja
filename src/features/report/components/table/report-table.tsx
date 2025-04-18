import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ReportRowData from "./report-row-data";
import { getAuthSession } from "@/lib/auth-context";
import { allowedRole } from "@/lib/utils";

interface ReportTableProps {
	userId?: string;
}

export async function ReportTable({ userId }: ReportTableProps) {
	const currentUser = await getAuthSession();
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Tanggal</TableHead>
					<TableHead className="w-20">Ruangan</TableHead>
					<TableHead className="text-center w-10">Status</TableHead>
					<TableHead>Petugas</TableHead>
					<TableHead className="w-40 text-center">Masalah</TableHead>
					<TableHead className="w-40 text-center">Kebutuhan</TableHead>
					<TableHead>Lama Pengerjaan</TableHead>
					{allowedRole(currentUser?.user.role ?? "") && (
						<TableHead className="text-center">Aksi</TableHead>
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				<ReportRowData userId={userId} />
			</TableBody>
		</Table>
	);
}
