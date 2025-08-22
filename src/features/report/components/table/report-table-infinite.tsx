"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportRowDataInfinite from "./report-row-data-infinite";
import { allowedRole } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";
import { ScrollToTopContainer } from "@/components/ui/scroll-to-top-container";

interface ReportTableInfiniteProps {
  userId?: string;
  isShowAction?: boolean;
}

export function ReportTableInfinite({
  userId,
  isShowAction = true,
}: ReportTableInfiniteProps) {
  const { session } = useAuth();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Tanggal</TableHead>
            <TableHead className="w-20">Ruangan</TableHead>
            <TableHead className="text-center w-8 text-xs md:text-sm md:w-10">
              Status
            </TableHead>
            <TableHead className="text-center">Petugas</TableHead>
            <TableHead className="w-32 md:w-40 text-center">
              Uraian Tugas
            </TableHead>
            <TableHead className="w-32 text-center hidden md:block md:w-48">
              Masalah
            </TableHead>
            {allowedRole(session?.user.role ?? "") && isShowAction && (
              <TableHead className="text-center">Aksi</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <ReportRowDataInfinite userId={userId} isShowAction={isShowAction} />
        </TableBody>
      </Table>
      <ScrollToTopContainer variant="mobile" />
    </>
  );
}
