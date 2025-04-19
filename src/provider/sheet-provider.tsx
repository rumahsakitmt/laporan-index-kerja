import EditReportSheet from "@/features/report/components/sheet/edit-report-sheet";
import ReportSheet from "@/features/report/components/sheet/report-sheet";
import React from "react";

export default function SheetProvider() {
	return (
		<>
			<ReportSheet />
			<EditReportSheet />
		</>
	);
}
