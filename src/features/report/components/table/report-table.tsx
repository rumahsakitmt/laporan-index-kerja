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
	isShowAction?: boolean;
}

export async function ReportTable({
	userId,
	isShowAction = true,
}: ReportTableProps) {
	const currentUser = await getAuthSession();
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-20">Tanggal</TableHead>
					<TableHead className="w-20">Ruangan</TableHead>
					<TableHead className="text-center w-8 text-xs md:text-sm md:w-10">
						Status
					</TableHead>
					<TableHead className="text-center">Petugas</TableHead>
					<TableHead className="w-32 md:w-40 text-center">Uraian Tugas</TableHead>
					<TableHead className="w-32 text-center hidden md:block md:w-48">Masalah</TableHead>
					{allowedRole(currentUser?.user.role ?? "") && isShowAction && (
						<TableHead className="text-center">Aksi</TableHead>
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				<ReportRowData userId={userId} isShowAction={isShowAction} />
			</TableBody>
		</Table>
	);
}
