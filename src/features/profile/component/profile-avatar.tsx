import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import { getAuthSession } from '@/lib/auth-context'

export default async function ProfileAvatar() {
  const session = await getAuthSession()
  const user = session?.user
  return (
    <div className='w-full flex items-center gap-4'>
      <Avatar className='w-14 h-14'>
        <AvatarImage className='w-14 h-14' src={user?.image ?? ""} />
        <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <h3 className='text-lg font-bold'>{user?.name}</h3>
        <p className='text-sm text-muted-foreground'>{user?.email}</p>
        <Badge variant="outline">{user?.role}</Badge>
      </div>

    </div>
  )
}
