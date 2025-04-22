"use client"
import React from 'react'

import { DatePickerWithRange } from './date-picker-range'
import SelectUser from './select-user'


export default function ChartHeader() {

  return (
    <div className='w-full flex flex-col md:flex-row gap-4'>
      <SelectUser />
      <DatePickerWithRange />
    </div>
  )
}
