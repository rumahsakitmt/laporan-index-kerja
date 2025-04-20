import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function RoomFormSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='space-y-1'>
        <Skeleton className='h-5 w-[100px]' />
        <Skeleton className='h-9 w-full md:w-xs' />
      </div>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-9 w-[100px]' />
        <Skeleton className='h-9 w-[70px]' />
      </div>
    </div>
  )
}
