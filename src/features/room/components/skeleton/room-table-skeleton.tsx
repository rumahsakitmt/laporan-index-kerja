import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'
import React from 'react'

export default function RoomTableSkeleton() {
  return (
    <TableRow >
      <TableCell colSpan={4} >
        <div className='flex justify-center text-muted-foreground py-4'>
          <Loader className='animate-spin' />
        </div>
      </TableCell>
    </TableRow>
  )
}
