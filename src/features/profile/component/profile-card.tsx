import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAuthSession } from '@/lib/auth-context'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, LogOut, UserCog, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'


export default async function ProfileCard() {
  const session = await getAuthSession()
  const user = session?.user

  return (
    <Card>
      <CardHeader className='flex items-center gap-4' >
        <Avatar className='w-14 h-14'>
          <AvatarImage className='w-14 h-14' src={user?.image ?? ""} />
          <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
          <Badge variant="outline">{user?.role}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          <li className='w-full p-2 border rounded-xl flex items-center hover:bg-accent justify-between pl-3 hover:bg-'>
            <div className='flex items-center gap-1 text-sm'>
              <UserCog className='w-5 h-5' />
              <span>
                Setting
              </span>
            </div>
            <ChevronRight className='w-5 h-5 text-muted-foreground' />
          </li>
          <li className='w-full p-2 border rounded-xl flex items-center hover:bg-accent justify-between pl-3 hover:bg-'>
            <div className='flex items-center gap-1 text-sm'>
              <Users className='w-5 h-5' />
              <span>
                Users
              </span>
            </div>
            <ChevronRight className='w-5 h-5 text-muted-foreground' />
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className='w-full justify-start'><LogOut className='transform rotate-180' /> Keluar</Button>
      </CardFooter>
    </Card>

  )
}
