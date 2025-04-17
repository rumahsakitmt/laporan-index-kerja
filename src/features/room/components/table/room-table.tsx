import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import TableRowData from "./table-row-data";

export function RoomTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[80px]">#</TableHead>
					<TableHead>Nama Ruangan</TableHead>
					<TableHead className="text-center">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRowData />
			</TableBody>
		</Table>
	);
}
