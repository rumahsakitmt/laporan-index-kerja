import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'
import React from 'react'

export default function ReportTableSkeleton() {
  return (
    <TableRow >
      <TableCell colSpan={6} >
        <div className='flex justify-center text-muted-foreground py-4'>
          <Loader className='animate-spin' />
        </div>
      </TableCell>
    </TableRow>
  )
}
