'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()


  React.useEffect(() => {
    // navigate to the page landing
    router.push('/dashboard')
  })
  return (
    <main className="p-24 flex gap-5">
    </main>
  )
}