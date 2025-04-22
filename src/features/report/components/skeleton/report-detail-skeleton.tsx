import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ReportDetailSkeleton() {
  return (
    <div className='p-4 space-y-4'>
      <Skeleton className='h-[28px] w-[120px]' />
      <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
        <p>Ruangan</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
        <p>Petugas</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
        <p>Status</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
        <p className='text-sm pl-2 ml-2 border-l'>Keterangan Selesai</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
        <p>Masalah</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
        <p>Kebutuhan</p>
        <div className='flex items-center gap-1'><span>:</span>
          <Skeleton className='h-7 w-[100px]' />
        </div>
      </div>
    </div>
  )
}
