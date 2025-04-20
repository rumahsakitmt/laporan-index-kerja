import ProfileCard from '@/features/profile/component/profile-card'
import React from 'react'

export default function ProfilePage() {
  return (
    <main >
      <div className='flex gap-4'>
        <div className='w-xl'>
          <ProfileCard />
        </div>
        <div className='w-full border'>
          <p>right content</p>
        </div>
      </div>
    </main>
  )
}
