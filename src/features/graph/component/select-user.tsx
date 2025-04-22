"use client";
import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetUserGraph } from '../query/get-report-users';
import { useFilterStore } from '../hooks/use-filter-graph';

export default function SelectUser() {

  const { filter, setFilter } = useFilterStore()
  const { data: users, isLoading } = useGetUserGraph("admin")
  return (
    <Select disabled={isLoading} value={filter.userId} onValueChange={(value) => {
      setFilter("userId", { userId: value })
    }}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Petugas" />
      </SelectTrigger>
      <SelectContent>
        {
          users?.map(user => (
            <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
