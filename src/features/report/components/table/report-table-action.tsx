import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Ellipsis, Eye, PenLine } from "lucide-react";

export default function ReportTableAction() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-muted-foreground">
				<Ellipsis className="w-4 h-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent avoidCollisions align="end">
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Eye /> Detail
				</DropdownMenuItem>
				<DropdownMenuItem>
					<PenLine /> Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<Delete /> Hapus
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
