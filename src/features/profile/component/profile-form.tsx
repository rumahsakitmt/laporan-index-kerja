"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { type UserData, userSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, PenLine } from 'lucide-react';
import { useEditUser } from '../query/update-user';

interface ProfileFormProps {
  user: {
    id: string,
    name: string,
    image: string | undefined
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {

  const form = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      image: user?.image ?? ""
    }
  })

  const { mutate, isPending } = useEditUser(user.id)

  const onSubmit = (values: UserData) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className='grid grid-cols-3'>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl className='col-span-2'>
                <Input disabled placeholder="image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='grid grid-cols-3'>
              <FormLabel>Name</FormLabel>
              <FormControl className='col-span-2'>
                <Input placeholder="Nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          {
            isPending ? <Loader className='animate-spin' /> :
              <PenLine />
          }
          Edit Profile</Button>
      </form>
    </Form>
  )
}
