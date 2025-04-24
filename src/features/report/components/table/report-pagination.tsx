"use client";
import React from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { useQueryReportStore } from '../../hooks/use-report-query';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Slash } from 'lucide-react';
import { useGetReports } from '../../query/get-reports';


export default function ReportPagination() {
  const { state, setState } = useQueryReportStore()
  const { data } = useGetReports()
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => {
              if (state.page <= 1) return
              setState({
                page: state.page - 1
              })
            }}
            disabled={state.page <= 1} variant="ghost" size="sm">
            <ChevronLeft className="mr-2" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="ghost" size="sm">
            <span>{state.page}</span> <Slash className='w-4 h-4 text-muted-foreground' /> <span>{data?.totalPage}</span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button onClick={() => {
            setState({
              page: state.page + 1
            })
          }}
            disabled={data?.totalPage === state.page}
            variant="ghost" size="sm">
            <ChevronRight className="mr-2" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  )
}
