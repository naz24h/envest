"use client";
import { verifyEmail } from '@/api/verifyEmail';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { useUser } from '@/context/UserProvider';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react';
import { useLocalStorage } from 'react-use';




export default function VerifyEmail(props: any){
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [code, setCode] = React.useState('')
    const [error, setError] = React.useState<string | null>(null);
    const [token] = useLocalStorage('xtx')
    const router = useRouter()



    const hello = useUser();

    console.log(hello);

    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const accessToken = token?.split('|')[1];

        if(code && accessToken){
            const res = await verifyEmail(code, accessToken);
 
            if(res?.data?.status !== 'error'){

                // show a success message
                setIsOpen(true)
                
                // redirect to mobile verification page after 2 seconds
                setTimeout(() => {
                    router.push('/register/verify/mobile');
                }, 2000);
                
                console.log(res?.data);
            }

            if(res?.data?.status === 'error') {
                setError(res.data?.message?.error[0])
                setCode('')
            }
            // if code is wrong set an error message
            if(res?.status !== 200) {
                setError('Invalid code')
            }
        } else {
            setError('Code required');
        }
    } 
    


    return (
        <div>
            

        {/* show modal if successful */}
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
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
                        as={Fragment}
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
                                    <span>Email Verification successful </span> <br />
                                    <span className='text-sm mt-3'>Redirecting to mobile verification page ...</span>
                                </div>
                                
                            </Dialog.Title>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </div>


        {/* email verification form  */}
        <div className='w-screen h-screen flex items-center justify-center'>  
            <div className='w-full max-w-[450px] shadow-lg p-5'>
                <div>
                    <h1 className='text-2xl font-bold text-center'>Email Verification</h1>

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

                        {/* error showing component  */}
                        {
                            error && <div className='text-sm font-medium text-red-500'>{error}</div>
                        }

                        <Button type='submit' onClick={handleSubmit} className='px-3 py-2 rounded-sm float-right mt-3'>
                            Verify
                        </Button>
                </form>  
            </div>
        </div>
    </div>
        
    )

} 