"use client";

import React from 'react'

import { Button } from '@/components/ui/button'
import { Check, Loader, PenLine, X } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEditUserRole } from '../query/update-user-role';

interface RoleSwapProps {
  showSelect: string | null,
  role: string;
  userId: string;
  onSelect: (id: string | null) => void
}

export default function RoleSwap({ showSelect, userId, role, onSelect }: RoleSwapProps) {
  const [currentRole, setCurrentRole] = React.useState(role)
  const { mutate, isPending } = useEditUserRole(userId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (!isPending) {
      onSelect(null)
    }
  }, [isPending])

  return (
    <>
      {

        showSelect === userId ? (
          <div className='flex flex-col items-center gap-2'>
            <Select value={currentRole} onValueChange={(value) => {
              setCurrentRole(value);

            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="petugas">Petugas</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex justify-between items-center w-full'>
              <Button onClick={() => {
                mutate({
                  role: currentRole
                })
              }} size="sm" className='text-xs' variant="ghost" >Ubah {isPending ? <Loader className='animate-spin' /> : <Check />}</Button>
              <Button onClick={() => onSelect(null)} size="sm" className='text-xs' variant="ghost" >Batal<X /></Button>

            </div>
          </div>
        ) :
          (
            <div className='flex items-center justify-start gap-1 uppercase'>
              <Button onClick={() => onSelect(userId)} size="icon" variant="ghost">
                <PenLine />
              </Button>
              {role}
            </div>
          )

      }
    </>
  )
}
