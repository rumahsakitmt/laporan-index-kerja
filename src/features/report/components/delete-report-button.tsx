"use client";

import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Delete, Loader } from "lucide-react";
import { useDeleteReport } from "../query/delete-report";
import { Button } from "@/components/ui/button";

interface DeleteReportButtonProps {
  reportId: number;
}

export default function DeleteReportButton({
  reportId,
}: DeleteReportButtonProps) {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useDeleteReport(reportId);

  const handleDeleteReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({ reportId: reportId.toString() });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah kamu yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak bisa di ulang.Ini akan menghapus dan
            menghilangkan laporanmu secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDeleteReport} variant="destructive">
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Yakin, Hapus Laporan"
            )}
          </Button>
          <Button
            disabled={isPending}
            onClick={(e) => {
              setOpen(false);
            }}
            variant="outline"
          >
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
