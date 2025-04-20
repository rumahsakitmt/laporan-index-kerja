"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetReports } from "../../query/get-reports";
import { format } from "date-fns";
import { allowedRole } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Loader, TriangleAlert } from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import ReportTableAction from "./report-table-action";
import { useAuth } from "@/provider/auth-provider";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import ReportTableSkeleton from "../../skeleton/report-table-skeleton";

interface ReportRowDataProps {
	userId?: string;
	isShowAction?: boolean;
}

export default function ReportRowData({
	userId,
	isShowAction = true,
}: ReportRowDataProps) {
	const { openSheet } = useSheetStore();
	const session = useAuth();
	const { data: reports, isLoading } = useGetReports({ userId: userId ?? "" });

	if (isLoading) {
		return <ReportTableSkeleton />
	}
	if (!reports) {
		return (
			<TableRow>
				<TableCell colSpan={5}>
					<div className="flex items-center justify-center text-red-500 gap-2 py-4">
						<TriangleAlert className="w-4 h-4" /> Something went wrong.
					</div>
				</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{reports.map((report) => (
				<TableRow
					key={report.id}
					onClick={() => openSheet(report.id)}
					className="cursor-pointer"
				>
					<TableCell>
						{format(new Date(report.date ?? new Date()), "dd/MM/yyyy")}
					</TableCell>
					<TableCell>{report.room?.name}</TableCell>
					<TableCell className="text-center">
						<Badge
							className="w-full capitalize"
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
					</TableCell>
					<TableCell className="text-center">
						{report.user?.name.split(" ")[0]}
					</TableCell>
					<TableCell>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="text-start">
									<p className="w-32 truncate">{report.problem}</p>
								</TooltipTrigger>
								<TooltipContent
									side="bottom"
									sideOffset={0}
									className="max-w-44 p-4 bg-background border text-foreground"
								>
									<p>{report.problem}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</TableCell>
					{allowedRole(session?.session?.user.role ?? "") && isShowAction && (
						<TableCell className="text-center">
							<ReportTableAction reportId={report.id} />
						</TableCell>
					)}
				</TableRow>
			))}
		</>
	);
}
