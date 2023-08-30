"use client";
import { loginWithUsernameAndPassword } from '@/api/loginApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import PasswordInput from '@/components/ui/form/PasswordInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useLocalStorage } from 'react-use';

export default function Login(){
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const [value, setValue] = useLocalStorage('xtx', '');

  
    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            username,
            password,
            code
        })

        
        let res = await loginWithUsernameAndPassword({
            username,
            password
        });

        
        console.log(res);
            
        if(res?.status === 200){
            setValue(res?.data?.data?.access_token);
            router.push('/register/verify/email')
            // Redirect to email verification page
        }

      
    } 

    // const access_token = value?.split('0|')[1];
    // console.log(access_token);

    return (
        <div className='w-screen h-screen flex items-center justify-center'>             
            <form action="" className='w-full max-w-[450px]'>
                <div className='mb-1'>
                    <h1 className='text-2xl font-bold text-center'>Login</h1>
                </div>
                <div className=''>
                    <label htmlFor="">Username</label>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div className=''>
                    <label htmlFor="">Password</label>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* go to register */}
                <div className="col-span-12 mt-3">
                            <div className='flex items-center'>
                                <p className='text-primary-600 hover:text-primary-700'>Not registered yet? <Link href='/register' className='text-blue-600'>Register</Link></p>
                            </div>
                        </div> 

                <div className='py-5'>
                    <Button
                        onClick={handleSubmit as any}
                        type='button'
                        className="w-full text-white py-2 px-4 rounded-lg"
                    > Login </Button>
                </div>
            </form>  
        </div>
    )

}