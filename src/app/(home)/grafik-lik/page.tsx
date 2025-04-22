import { BarCharComponent } from '@/features/graph/component/bar-chart'
import ChartHeader from '@/features/graph/component/chart-header'
import React from 'react'


export default function GrafikLikComponent() {
  return (
    <div className='space-y-4'>
      <ChartHeader />
      <main className='w-full'>
        <BarCharComponent />
      </main>
    </div>
  )
}
