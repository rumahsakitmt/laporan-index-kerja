import React from "react";

import { Input } from "@/components/ui/input";
import { DatePicker } from "./date-picker";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import LaporanIndexContainer from "@/components/laporan-index-container";
import { CheckCircle, CircleX, Loader, Search } from "lucide-react";
import { allowedRole } from "@/lib/utils";

interface ReportFilterProps {
	isUserOnly?: boolean;
	role: string;
}

export default function ReportFilter({
	isUserOnly = false,
	role,
}: ReportFilterProps) {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between w-full text-sm gap-4">
			<div className="flex flex-col md:flex-row gap-4 items-center w-full">
				{!isUserOnly && (
					<div className="relative w-full ">
						<Input placeholder="Cari Petugas ..." className="pl-8 w-full" />
						<div className="absolute  top-1/2 left-2 transform -translate-y-1/2">
							<Search className="w-4 h-4" />
						</div>
					</div>
				)}
				<div className="flex w-full items-center gap-2">
					<DatePicker />
					<Select>
						<SelectTrigger className="w-[180px]">
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
			</div>
			<div className="w-full md:w-max">
				{allowedRole(role) && <LaporanIndexContainer />}
			</div>
		</div>
	);
}
