import React from 'react'
import ProfileForm from '@/features/profile/component/profile-form'
import { getAuthSession } from '@/lib/auth-context'

export default async function ProfilePage() {
  const session = await getAuthSession()
  const user = session?.user

  return (
    <ProfileForm user={{
      id: user?.id ?? "",
      image: user?.image ?? "",
      name: user?.name ?? ""
    }} />
  )
}
