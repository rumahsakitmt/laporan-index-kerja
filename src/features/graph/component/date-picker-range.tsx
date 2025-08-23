"use client";

import type * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilterStore } from "../hooks/use-filter-graph";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal",
              !filter.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {filter.date?.from ? (
              filter.date.to ? (
                <>
                  {format(filter.date.from, "LLL dd, y")} -{" "}
                  {format(filter.date.to, "LLL dd, y")}
                </>
              ) : (
                format(filter.date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={filter.date?.from}
            selected={filter.date}
            onSelect={(range) => {
              setFilter("date", {
                date: {
                  from: range?.from,
                  to: range?.to,
                },
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
