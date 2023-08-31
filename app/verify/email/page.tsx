"use client";
import { verifyEmail } from '@/api/verifyEmail';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { useGlobalLoading } from '@/context/GlobalLoader';
import { useUser } from '@/context/UserProvider';
import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react';
import { useLocalStorage } from 'react-use';




export default function VerifyEmail(props: any) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [code, setCode] = React.useState("")
    const [error, setError] = React.useState<string | null>(null);
    const [token] = useLocalStorage('xtx')
    const router = useRouter()
    const { user } = useUser();
    const { setGlobalLoading } = useGlobalLoading();


    // check user already logged and email already verified
    React.useEffect(() => {
        let _token = token as string;
        _token = _token ? _token.split('0|')[1] : '';


        if (token && user?.ev) {
            router.push('/dashboard');
        } else {
            setGlobalLoading(false);
        }
    });

    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const _token = token as string;
        const accessToken = _token?.split('|')[1];

        if (code && accessToken) {
            const res = await verifyEmail(code, accessToken);

            if (res?.data?.status !== 'error') {

                // show a success message
                setIsOpen(true)

                // redirect to mobile verification page after 2 seconds
                setTimeout(() => {
                    router.push('/register/verify/mobile');
                }, 2000);

                console.log(res?.data);
            }

            if (res?.data?.status === 'error') {
                setError(res.data?.message?.error[0])
                setCode('')
            }
            // if code is wrong set an error message
            if (res?.status !== 200) {
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
                    <Dialog as="div" className="relative z-10" onClose={() => { }}>
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
                    <div className='text-justify'>
                        <h1 className='text-2xl font-semibold tracking-[1px] text-center'>Email Verification</h1>
                        <p className='text-center text-xs text-slate-700 mt-2 max-w-[280px] w-fit mx-auto'>
                            Please enter the 6-digit verification code sent to your email address
                        </p>
                    </div>
                    <form action="" className='w-full'>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className='flex items-center justify-center space-x-3'>

                                    {/* verificaton code field */}
                                    {
                                        // auto focus on next input field
                                        _.range(6).map((i) => (
                                            <input
                                                key={i}
                                                className='w-10 h-10 text-center border border-gray-300 rounded-sm'
                                                type='text'
                                                name='code'
                                                value={code[i]}
                                                onChange={(e) => {
                                                    const _code = code.split('');
                                                    _code[i] = e.target.value;
                                                    setCode(_code.join(''));
                                                    const value = e.target.value;

                                                    setCode(value);
                                                    if (value.length === 1 && i < 5) {
                                                        const nextSibling = document.querySelector(
                                                            `input[name="code"][data-index="${i + 1}"]`
                                                        );
                                                        if (nextSibling) {
                                                            (nextSibling as HTMLInputElement).focus();
                                                        }
                                                    }
                                                }}
                                                data-index={i}
                                                maxLength={1}
                                                minLength={1}
                                            />
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                        {/* error showing component  */}
                        {error && <div className='text-sm font-medium text-red-500'>{error}</div>}

                        <Button className='py-1.5 px-4'>
                            Resend Code
                        </Button>
                        <Button type='submit' onClick={handleSubmit} className='px-3 py-2 rounded-sm float-right mt-3'>
                            Verify
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    )

} 