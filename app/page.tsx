'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserProvider'
import { getLoggedUser } from '@/api/getLoggedUser'

export default function Home() {
  const router = useRouter()
  const {setUser} = useUser()


  React.useEffect(() => {
    // navigate to the page landing
    router.push('/dashboard')
  }, [])
 
  return (
    <main className="p-24 flex gap-5">
    </main>
  )
}