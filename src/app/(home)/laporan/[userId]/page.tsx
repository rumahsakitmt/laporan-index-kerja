import React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ReportFilter from "@/features/report/components/table/report-filter";
import { ReportTable } from "@/features/report/components/table/report-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Slash } from "lucide-react";

export default async function page({ params }: { params: Promise<{ userId: string }> }) {
	const { userId } = await params;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<main className="space-y-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Laporan</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{session?.user.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<ReportFilter isUserOnly={true} role={session?.user.role ?? ""} />
			<ReportTable userId={userId} />
		</main>
	);
}
