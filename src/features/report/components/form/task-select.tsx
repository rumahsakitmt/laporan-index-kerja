"use client";

import * as React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { useGetTasks } from "@/features/task/query/get-tasks";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateTask } from "@/features/task/query/create-tasks";
import CreatableCustomSelect from "@/components/select-createable";

interface StatusSelectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<any, any, any>;
}

export default function TaskSelect({ form }: StatusSelectProps) {
  const { data: tasks, isLoading } = useGetTasks()
  const { mutate: createTask, isPending } = useCreateTask()

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
              <CreatableCustomSelect
                onChange={(value) => {
                  field.onChange(value)
                }}
                onCreate={(value) => {
                  createTask({
                    name: value,
                    description: "Uraian tugas tambahan",
                    type: "additional"
                  })
                }}
                isDisabled={isPending}
                options={tasks.map((task) => ({
                  label: task.name,
                  value: task.id.toString(),
                  title: task.name,
                  description: task.description ?? "",
                  type: task.type as "main" | "additional",
                }))}
                placeholder="Pilih uraian tugas atau buat baru"
              />

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
