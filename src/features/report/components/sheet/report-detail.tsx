"use client";

import React from "react";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import { format } from "date-fns";
import { useGetReport } from "../../query/get-report";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import ReportDetailSkeleton from "../skeleton/report-detail-skeleton";

export default function ReportDetail() {
	const { sheet } = useSheetStore();

	const { data: report, isLoading } = useGetReport(sheet.reportId);

	if (isLoading) {
		return <ReportDetailSkeleton />
	}

	if (!report) {
		return (
			<div className="text-center w-full">
				<p className="text-red-500">Something went Wrong.</p>
			</div>);
	}

	return (
		<>
			<article className="p-4 space-y-4">
				<p className="font-bold text-lg">
					{format(new Date(report.date ?? new Date()), "dd MMMM yyyy")}
				</p>
				<div className="grid grid-cols-2 gap-x-4 gap-y-2">
					<p>Ruangan</p>
					<p>: {report.room?.name}</p>
					<p>Petugas</p>
					<p>: {report.user?.name}</p>
					<p>Status</p>
					<div>
						:{" "}
						<Badge
							className="w-max text-xs  capitalize"
							variant={
								report.status === "selesai"
									? "outline-success"
									: report.status === "ditunda"
										? "outline-wait"
										: "outline-danger"
							}
						>
							{report.status === "selesai" ? (
								<CircleCheck />
							) : report.status === "ditunda" ? (
								<Loader />
							) : (
								<CircleX />
							)}
							{report.status}
						</Badge>
					</div>
					<p className="text-sm pl-2 ml-2 border-l">Keterangan {report.status}</p>
					<p className="text-sm md:text-base">: {report.notes || "-"}</p>
					<p>Masalah</p>
					<p className="text-sm md:text-base">: {report.problem}</p>
					<p>Kebutuhan</p>
					<p className="text-sm md:text-base">: {report.needs || "-"}</p>
				</div>
			</article>
		</>
	);
}
