"use client";

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ReportRowData from "./report-row-data";

export function ReportTable() {
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
				</TableRow>
			</TableHeader>
			<TableBody>
				<ReportRowData />
			</TableBody>
		</Table>
	);
}
