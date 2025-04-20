import ProfileCard from '@/features/profile/component/profile-card'
import UsersTable from '@/features/profile/component/users-table'
import React from 'react'

export default function ProfilePage() {
  return (
    <main >
      <div className='flex gap-4'>
        <div className='w-xl'>
          <ProfileCard />
        </div>
        <div className='w-full border rounded-xl'>
          <UsersTable />
        </div>
      </div>
    </main>
  )
}
