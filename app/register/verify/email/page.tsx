"use client";
import { getCountries } from '@/api/countries';
import { loginWithUsernameAndPassword } from '@/api/loginApi';
import { registerNewUser } from '@/api/registerApi';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Spinner from '@/components/ui/Spinner';
import Input from '@/components/ui/form/Input';
import PasswordInput from '@/components/ui/form/PasswordInput'; 
import { useGlobalLoading } from '@/context/GlobalLoader';
import { useUser } from '@/context/UserProvider';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useLocalStorage } from 'react-use';


type Country = {
    country: string,
    country_code: string,
    dial_code:string | number,
}


export default function Register(props: any){ 
    const [code, setCode] = React.useState('');
    const [value, setValue] = useLocalStorage('xtx', '');
    const { setGlobalLoading } = useGlobalLoading();
    const {user, setUser} = useUser();
    
    //  check user already logged in
    React.useEffect(() => {
        setGlobalLoading(true); 

        let token = value as string;
        token = token ? token.split('0|')[1] : ''; 
        console.log(user);
        if(token){

        }else{
            setGlobalLoading(false);
        }
    }, [])


  
    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
          
    } 
    


    return (
        <div className='w-screen h-screen flex items-center justify-center'>  
            <div className='w-full max-w-[450px] shadow-lg p-5'>
                <div>
                    <h1 className='text-2xl font-bold text-center'>Verify</h1>

                    <p className='text-center text-sm text-slate-500 mt-2'>Please verify your account</p>
                </div>
                <form action="" className='w-full'>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <label htmlFor='username' className='text-sm font-medium text-slate-500'> 
                             Verify Code
                             <sup className='text-red-500'>*</sup> </label>
                            <Input
                                type='text' 
                                name='username'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder='Verify Code'
                                required
                            /> 
                        </div>  
                    </div> 

                    <Button className='px-3 py-2 rounded-sm float-right mt-3'>
                        Verify
                    </Button>
                </form>  
            </div>
        </div>
    )

} 