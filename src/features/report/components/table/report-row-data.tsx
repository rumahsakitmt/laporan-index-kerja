"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetReports } from "../../query/get-reports";
import { format } from "date-fns";
import { getReadableDuration } from "@/lib/utils";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { CircleCheck, CircleX, Loader } from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ReportRowData() {
	const { data: reports, isLoading } = useGetReports();

	if (isLoading) {
		return (
			<TableRow>
				<TableCell>loading..</TableCell>
			</TableRow>
		);
	}
	if (!reports) {
		return (
			<TableRow>
				<TableCell>no data</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{reports.map((report) => (
				<TableRow key={report.id}>
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
					<TableCell>{report.user?.name.split(" ")[0]}</TableCell>
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
					<TableCell>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="text-start">
									<p className="w-32 truncate">{report.needs}</p>
								</TooltipTrigger>
								<TooltipContent
									side="bottom"
									sideOffset={0}
									className="max-w-44 p-4 bg-background border text-foreground"
								>
									<p>{report.needs ?? "-"}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</TableCell>
					<TableCell>
						<div>
							<p>{getReadableDuration(report.time)}</p>
							<p className="text-xs text-muted-foreground">{report.time}</p>
						</div>
					</TableCell>
				</TableRow>
			))}
		</>
	);
}
