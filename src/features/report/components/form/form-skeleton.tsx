import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function FormSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-12' />
        <div className='flex w-full items-center gap-4'>
          <div className='space-y-2 w-full'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full' />
          </div>
          <div className='space-y-2 w-full'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full' />
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-12 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-14 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-9 w-full' />
      </div>

      <Skeleton className='h-9 w-full' />
    </div>

  )
}
