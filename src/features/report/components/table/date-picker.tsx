"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryReportStore } from "../../hooks/use-report-query";

export function DatePicker() {
  const { setState, state } = useQueryReportStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " text-left font-normal",
            !state.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {state.date ? format(state.date, "PPP") : <span>Tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={state.date}
          onSelect={(e) =>
            setState({
              date: e,
              dateFrom: undefined,
              dateTo: undefined,
            })
          }
        />
      </PopoverContent>
    </Popover>
  );
}
