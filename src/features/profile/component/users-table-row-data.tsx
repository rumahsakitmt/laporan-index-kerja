"use client";

import React from 'react';

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useGetUsers } from '../query/get-users'
import { Loader } from 'lucide-react'
import RoleSwap from './role-swap'

export default function UsersTableRowData() {
  const [showSelect, setShowSelect] = React.useState<string | null>(null)
  const { data: users, isLoading } = useGetUsers()

  const handleShowSelect = (id: string | null) => {
    setShowSelect(id)
  }

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <div className='flex justify-center py-4'>
            <Loader className='animate-spin' />
          </div>
        </TableCell>
      </TableRow>)
  }

  if (!users) {
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <div className='text-center py-4'>
            Something went wrong
          </div>
        </TableCell>
      </TableRow>)
  }

  return (
    <>
      {
        users.map((user, i) => (
          <TableRow key={user.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className='w-[180px]'>
              <RoleSwap userId={user.id} onSelect={handleShowSelect} showSelect={showSelect} role={user.role ?? ""} />
            </TableCell>
          </TableRow>
        ))
      }
    </>
  )
}
