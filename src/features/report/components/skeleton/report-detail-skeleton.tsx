import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ReportDetailSkeleton() {
  return (
    <>
      <article className="p-4 space-y-4">
        {/* Date Header */}
        <div className="text-center">
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>

        <div className="space-y-2">
          <div className="p-4 space-y-2">
            {/* User Info Section */}
            <div className="p-2 py-4 rounded-md bg-muted/50">
              <Skeleton className="h-8 w-32 mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b w-full border-dashed my-4" />

            {/* Problem Section */}
            <div className="p-2 bg-card rounded-md">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Task Details Section */}
            <div className="bg-accent p-2 rounded-md">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Needs Section */}
            <div className="p-2 bg-card rounded-md">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Notes Section */}
            <div className="p-2 bg-accent rounded-md">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
