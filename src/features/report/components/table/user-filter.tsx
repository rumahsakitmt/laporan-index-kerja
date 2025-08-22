import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsers } from "@/features/profile/query/get-users";
import { useQueryReportStore } from "../../hooks/use-report-query";
import { Loader } from "lucide-react";

export default function UserFilter() {
  const { setState, state } = useQueryReportStore();
  const { data: users, isLoading } = useGetUsers();

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </SelectTrigger>
      </Select>
    );
  }

  if (!users) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="No users available" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select
      value={state.userId || ""}
      onValueChange={(value) => setState({ userId: value })}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Petugas" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
