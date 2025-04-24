import React from "react";

import RoomForm from "@/features/room/components/form/room-form";
import { RoomTable } from "@/features/room/components/table/room-table";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

export default function RoomPage() {
	return (
		<main className="space-y-4 pb-24">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Ruangan</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<RoomForm />
			<RoomTable />
		</main>
	);
}
