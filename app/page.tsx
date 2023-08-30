'use client'
import { getLoggedUser } from '@/api/getLoggedUser'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useLocalStorage } from 'react-use'

export default function Home() {
  const router = useRouter()

  
  const [value] = useLocalStorage('xtx');
  const [user, setUser] = useLocalStorage('user', '')


  React.useEffect(() => {
    // navigate to the page landing
    router.push('/dashboard')
  })


  React.useEffect(() => { 
    (async () => {
      if(value) {
        const access_token = value?.split('0|')[1];
    
        const userData = await getLoggedUser(access_token);
        console.log(userData);
        setUser(userData)
      } else {
        console.log('token not found');
      }
      
    })()
  }, [])



  return (
      <main className="p-24 flex gap-5">
      </main>
  )
}