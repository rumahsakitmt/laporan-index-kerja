"use client";

import React from "react";

import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import ReportFormSheet from "@/features/report/components/report-form-sheet";
import { ChartLine, CheckCircle, CircleX, Loader, RefreshCcw, Search } from "lucide-react";
import { allowedRole } from "@/lib/utils";
import RoomFilter from "./room-filter";
import { useQueryReportStore } from "../../hooks/use-report-query";
import { DatePicker } from "./date-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface ReportFilterProps {
	isUserOnly?: boolean;
	role: string;
}

export default function ReportFilter({
	isUserOnly = false,
	role,
}: ReportFilterProps) {
	const { setState, state, reset } = useQueryReportStore();

	const isAnyFilterActive = Boolean(
		state.q || state.date || state.roomId || state.status,
	);
	return (
		<div className="flex flex-col  items-center justify-between w-full text-sm gap-4">
			{
				allowedRole(role) && (
					<div className="self-end w-max flex gap-2 items-center">
						<Link className={buttonVariants({
							variant: "outline",
							size: "sm"
						})} href="/grafik-lik">
							<ChartLine />
							Grafik LIK
						</Link>
						<ReportFormSheet />
					</div>
				)
			}
			<div className="flex flex-col md:flex-row gap-4 items-center w-full">
				{!isUserOnly && (
					<div className="relative w-full ">
						<Input
							value={state.q ?? ""}
							onChange={(e) => {
								setState({ q: e.target.value });
							}}
							placeholder="Cari..."
							className="pl-8 w-full"
						/>
						<div className="absolute  top-1/2 left-2 transform -translate-y-1/2">
							<Search className="w-4 h-4" />
						</div>
					</div>
				)}
				<div className="flex w-full items-center gap-2">
					<DatePicker />
					<RoomFilter />
					<Select
						value={state.status}
						onValueChange={(value) => {
							setState({ status: value });
						}}
					>
						<SelectTrigger className="w-full md:w-[180px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="selesai">
								<CheckCircle />
								Selesai
							</SelectItem>
							<SelectItem value="ditunda">
								<Loader />
								Ditunda
							</SelectItem>
							<SelectItem value="tidak selesai">
								<CircleX />
								Tidak Selesai
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{isAnyFilterActive && (
					<div className="self-start">
						<Button
							className="font-normal"
							variant="outline"
							onClick={() => reset()}
						>
							<RefreshCcw />
							Reset Filter
						</Button>
					</div>
				)}


			</div>
		</div>
	);
}
