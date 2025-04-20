import ProfileAvatar from '@/features/profile/component/profile-avatar'
import ProfileCard from '@/features/profile/component/profile-card'
import type React from 'react'

export default function ProfileLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <main className='space-y-4'>
      <ProfileAvatar />
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-xl'>
          <ProfileCard />
        </div>
        <div className='w-full rounded-xl p-4'>
          {
            children
          }
        </div>
      </div>
    </main>
  )
}
