"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryReportStore } from "../../hooks/use-report-query";

export function MonthPicker() {
  const { setState, state } = useQueryReportStore();

  const months = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" },
  ];

  const handleMonthSelect = (monthValue: string) => {
    const currentYear = new Date().getFullYear();
    const month = parseInt(monthValue);

    const dateFrom = new Date(currentYear, month, 1);
    const dateTo = new Date(currentYear, month + 1, 0);

    setState({
      dateFrom,
      dateTo,
      date: undefined,
    });
  };

  const getSelectedMonth = () => {
    if (state.dateFrom) {
      return state.dateFrom.getMonth().toString();
    }
    return "";
  };

  return (
    <Select value={getSelectedMonth()} onValueChange={handleMonthSelect}>
      <SelectTrigger className="w-full md:w-[180px]">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Pilih Bulan" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
