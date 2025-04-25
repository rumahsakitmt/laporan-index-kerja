"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { CheckCheck, CircleX, TimerIcon } from "lucide-react";
import NotesTextarea from "./notes-textarea";
import { useGetTasks } from "@/features/task/query/get-tasks";
import { Skeleton } from "@/components/ui/skeleton";

interface StatusSelectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<any, any, any>;
}

export default function TaskSelect({ form }: StatusSelectProps) {
  const { data: tasks, isLoading } = useGetTasks()

  if (isLoading) {
    return <div className="space-y-2">
      <p className="text-sm">Uraian Tugas</p>
      <Skeleton className="h-9 w-full" />
    </div>
  }

  if (!tasks) {
    return <div className="text-xs text-red-500">something went wrong.</div>
  }


  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="task"
        render={({ field }) => (
          <FormItem className="h-max">
            <FormLabel>Uraian Tugas</FormLabel>
            <FormControl >
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full h-max text-start text-wrap ">
                  <SelectValue placeholder="Uraian Tugas" />
                </SelectTrigger>
                <SelectContent >
                  {
                    tasks.map((task) => (
                      <SelectItem key={task.id} value={task.id.toString()}>
                        <div>
                          {task.name}
                          <p className="text-xs max-w-[250px]  text-wrap text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
