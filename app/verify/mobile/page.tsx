"use client";
import { sendVerificationCode } from '@/api/sendVerificationCode';
import { verifyEmail } from '@/api/verifyEmail';
import { verifyMobile } from '@/api/verifyMobileApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { useGlobalLoading } from '@/context/GlobalLoader';
import { useUser } from '@/context/UserProvider';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import VerificationInput from "react-verification-input";


export default function VerifyEmail(props: any) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [code, setCode] = React.useState("")
    const [error, setError] = React.useState<string | null>(null);
    const [token] = useLocalStorage('xtx')
    const router = useRouter()
    const { user } = useUser();
    const { setGlobalLoading } = useGlobalLoading();
    const [showCountDown, setShowCountDown] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    let _token = token as string;
    _token = _token ? _token.split('0|')[1] : '';

    // check user already logged and email already verified
    React.useEffect(() => { 
        if (user && user?.ev) {
            router.push('/dashboard');
        } else {
            setGlobalLoading(false);
        }
    }, []);
    



    // resend
    const resendCode = async () => {
        const res = await sendVerificationCode('sms', _token); 
        if(res && res.data?.status === 'error'){
            let next_time = res?.data?.message?.next_time; 

            toast.warn(res?.data?.message?.error?.[0], {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            

            if(next_time){
                let currentTime = dayjs().unix();
                let diff = next_time - currentTime;
                let i = diff;
                let intervalID = setInterval(() => {
                    setShowCountDown(i--); 
                    if(i < 0){
                        clearInterval(intervalID)
                        setShowCountDown(0)
                    }
                },1000 )

                return () => {  
                    clearInterval(intervalID)
                }
            }
        }

        if(res && res.data?.status === 'success'){  
            toast.success(res?.data?.message?.success?.[0], {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    // send verification code 
    const handleVerificationCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        resendCode();
    }

    React.useEffect(() => {
        (async () => {
            resendCode();
        })()
    }, [])

    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const _token = token as string;
        const accessToken = _token?.split('|')[1];
        setLoading(true);

        if (code && accessToken) {
            const res = await verifyMobile(code, accessToken);

            if (res?.data?.status !== 'error') {

                // show a success message
                setIsOpen(true)
                setLoading(false);
                

                // redirect to mobile verification page after 2 seconds
                setTimeout(() => {

                    router.push('/dashboard');
                }, 2000); 

                
            }

            if (res?.data?.status === 'error') {
                setError(res.data?.message?.error[0])
                setCode('')
                setLoading(false);
            }
            // if code is wrong set an error message
            if (res?.status !== 200) {
                setError('Invalid code')
                setLoading(false);
            }
        } else {
            setError('Code required');
        }
    }

 

    return (
        <div> 

            {/* email verification form  */}
            <div className='w-screen h-screen flex items-center justify-center'>  
                <div className='w-full max-w-[450px] rounded-lg shadow-lg p-5'>
                    <div>
                        <h1 className='text-2xl font-bold text-center'>Verification Code</h1>

                        <p className='text-center text-sm text-primary-500 w-[280px] mt-2 mx-auto tracking-[0.86px]'>We have to sent the code verification to your mobile number</p>
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
                            {showCountDown > 0 ? null : "Didn't receive code?"} 
                            <button type='button' onClick={ (e) => 
                                showCountDown > 0 ? null : handleVerificationCode(e) } className='hover:underline hover:text-primary-700'>
                                {showCountDown > 0 ? `Please try after ${showCountDown} seconds` : 'Resend'}
                            </button>
                        </div>
                        

                        <div className='flex items-center justify-center mt-4'>
                            <Button 
                                type='submit' 
                                onClick={handleSubmit} 
                                loading={loading}
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