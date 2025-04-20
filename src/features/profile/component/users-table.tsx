import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UsersTableRowData from './users-table-row-data'

export default function UsersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>email</TableHead>
          <TableHead className='text-center w-[180px]'>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <UsersTableRowData />
      </TableBody>
    </Table>

  )
}
