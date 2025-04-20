import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getAuthSession } from '@/lib/auth-context'
import { LogOut, UserCog, Users } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'


export default async function ProfileCard() {
  const session = await getAuthSession()
  const user = session?.user

  return (
    <Card>
      <CardContent>
        <ul className='space-y-2'>
          <Link href="/profile/" className={
            buttonVariants({
              variant: "outline",
              className: "justify-start w-full border-none"
            })}>
            <UserCog className='w-5 h-5' />
            Profile
          </Link>
          {user?.role === "admin" &&
            <Link href="/profile/user" className={
              buttonVariants({
                variant: "outline",
                className: "justify-start w-full border-none"
              })}>
              <Users className='w-5 h-5' />
              User
            </Link>
          }
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className='w-full justify-start'><LogOut className='transform rotate-180' /> Keluar</Button>
      </CardFooter>
    </Card>

  )
}
