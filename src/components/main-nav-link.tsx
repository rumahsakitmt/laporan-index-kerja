'use client';

import React from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { DoorOpen, Home, NotebookPen } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface MainNavLinkProps {
  userId: string
}

export default function MainNavLink({
  userId
}: MainNavLinkProps) {
  const path = usePathname()
  return (
    <div className='hidden md:flex items-center gap-2'>
      <Link className={buttonVariants({
        variant: "ghost",
        className: path === "/" ? "text-primary hover:text-primary hover:underline hover:underline-offset-2" : "hover:underline hover:underline-offset-2"
      })} href="/">
        <Home /> Home
      </Link>
      <Link className={buttonVariants({
        variant: "ghost",
        className: path === `/laporan/${userId}` ? "text-primary hover:text-primary hover:underline hover:underline-offset-2" : "hover:underline hover:underline-offset-2"
      })} href={`/laporan/${userId}`}>
        <NotebookPen /> Laporanku
      </Link>
      <Link className={buttonVariants({
        variant: "ghost",
        className: path === "/ruangan" ? "text-primary hover:text-primary hover:underline hover:underline-offset-2" : "hover:underline hover:underline-offset-2"
      })} href="/ruangan">
        <DoorOpen /> Ruangan
      </Link>
    </div>
  )
}
