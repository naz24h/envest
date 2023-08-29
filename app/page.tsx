'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserProvider'
import { getLoggedUser } from '@/api/getLoggedUser'
import { useLocalStorage } from 'react-use'

export default function Home() {
  const router = useRouter()
  const {setUser} = useUser()

  
  const [value] = useLocalStorage('xtx');


  React.useEffect(() => {
    // navigate to the page landing
    router.push('/dashboard')
  })


  // React.useEffect(() => { 
  //   (async () => {
  //     console.log({value});
  //     const access_token = value;
  //     console.log({access_token});
    
  //     const user = await getLoggedUser(access_token);
  //     console.log({user});
  //   })()
  // }, [])



  return (
    <main className="p-24 flex gap-5">
    </main>
  )
}