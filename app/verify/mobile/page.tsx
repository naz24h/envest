"use client";
import { sendVerificationCode } from '@/api/sendVerificationCode';
import { verifyMobile } from '@/api/verifyMobileApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { useGlobalLoading } from '@/context/GlobalLoader';
import { useUser } from '@/context/UserProvider';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useLocalStorage } from 'react-use';
import VerificationInput from "react-verification-input";



export default function VerifyMobile(props: any){
    const [submitting, setSubmitting ] = React.useState<boolean>(false)
    const [code, setCode] = React.useState<string>('')
    const [error, setError] = React.useState<string | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false) 
    const [token] = useLocalStorage('xtx')
    const router = useRouter()
    const {user, setUser} = useUser() 
    const { setGlobalLoading } = useGlobalLoading();
 
    let _token = token as string;
    _token = _token ? _token.split('0|')[1] : '';

    // check user already logged and email already verified
    React.useEffect(() => {
        if (_token && user?.mobile_verified) {
            router.push('/dashboard');
        } else {
            setGlobalLoading(false);
        }
    });


       // send verification code 
       const handleVerificationCode = async (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault(); 
            const res = await sendVerificationCode('sms', _token);
            console.log(res);
        }

        React.useEffect(() => {
            (async () => {
                const res = await sendVerificationCode('sms', _token); 
                    console.log(res);
            })()
        }, [])


    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

         
        
        if(!code){
            setError('Code is required');
            return;
        } 

        setSubmitting(true);

        let res = await verifyMobile(code, _token);
 
        console.log(res);
        
    } 
    


    return (

        <div>

            {/* show modal if successful */}
            <div>
                <Transition appear show={isOpen} as={React.Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 h-[300px] flex justify-center items-center"
                                >
                                    <div>
                                        <span>Mobile Verification successful </span> <br />
                                        <span className='text-sm mt-3'>Redirecting to dashboard ...</span>
                                    </div>
                                    
                                </Dialog.Title>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>
            </div>

            {/* mobile verification form  */}
            <div className='w-screen h-screen flex items-center justify-center'>  
                <div className='w-full max-w-[450px] rounded-lg shadow-lg p-5'>
                    <div>
                        <h1 className='text-2xl font-bold text-center'>Verification Code</h1>

                        <p className='text-center text-sm text-primary-500 w-[280px] mt-2 mx-auto tracking-[0.86px]'>We have to sent the code verification to Your Mobile Number</p>
                    </div>
                    <form action="" className='w-full'>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">  

                                <div className="flex items-center justify-center mt-5">
                                    <VerificationInput
                                        autoFocus={true}
                                        onChange={(value) => setCode(value)}
                                        classNames={{
                                            container: "mx-auto flex justify-center items-center",
                                            character: "w-16 h-11 text-2xl border border-gray-300 font-medium text-slate-500 flex items-center justify-center rounded-md",
                                            characterInactive: "bg-slate-100/10",
                                            characterSelected: "border-blue-500",
                                        }}
                                    />
                                </div>
                            </div>  
                        </div> 

                        {error?
                            <div className='mt-2 px-14 text-left text-sm text-red-500'>
                                {error}
                            </div>
                        :null}
                        

                        <div className='mt-4 text-center text-sm text-primary-500 tracking-[0.86px]'>
                            {"Didn't receive code?"} <button className='hover:underline hover:text-primary-700'>Resend</button>
                        </div>
                        

                        <div className='flex items-center justify-center mt-4'>
                            <Button 
                                type='submit' 
                                onClick={handleSubmit} 
                                loading={false}
                                loadingClass='flex bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white px-3 py-1.5 w-32 rounded-sm'
                                className='bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white px-3 py-1.5 w-32 rounded-sm'
                            >
                                Verify
                            </Button>
                        </div> 
                    </form>  
                </div>
            </div>
        </div>
        
    )

} 