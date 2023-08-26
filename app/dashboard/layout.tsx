'use client';
import Navbar from '@/components/layout/Navbar'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import LinkButton from '@/components/ui/LinkButton'
import { Dialog, Transition } from '@headlessui/react'
import Button from '@/components/ui/Button';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)


    return (
        <React.Fragment>
            <header className="relative bg-transparent text-white h-[400px] lg:h-[500px]">
                <Image
                    src="/site/bg.png"
                    alt="bg"
                    width={1920}
                    height={680}
                    quality={70}
                    priority={true}
                    className='absolute top-0 left-0 h-full object-cover -z-10'
                />

                <Navbar />


                <div className="container h-full">
                    <div className='h-full flex flex-col'>

                        {/* header */}
                        <div className="my-auto mt-3 md:mt-16 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h6 className='mb-2.5 lg:mb-4 block md:inline-block text-sm'>Guthaben Total</h6>
                                <div className="flex flex-col md:flex-row md:items-end gap-4">
                                    <h1 className="text-3xl leading-[32px] md:text-5xl lg:text-[56px] lg:leading-[48px] font-[400]">33,000 €</h1>
                                    <div className='flex items-center gap-3.5 text-sm tracking-[0.56px]'>
                                        <div className='w-6 h-6 flex items-center justify-center bg-green-500 rounded-[6px] '>
                                            <Icon name="clock" className='w-2 h-2 stroke-black' />
                                        </div>
                                        23.000,00 € heute, 04.08.2023
                                    </div>
                                </div>

                                <span className='block mt-4 text-[rgba(255,255,255,0.30)]'>
                                    Depotzinsen: 5,4% p. a.
                                </span>
                            </div>

                            <Button
                                variant='primary'
                                onClick={() => setIsModalOpen(true)}
                                className='mt-3 lg:mt-12 text-sm lg:text-[16px] text-primary w-fit pt-2 pb-2 pl-3'
                            >
                                <>
                                    <Icon name="arrow-right" className='stroke-primary' />
                                    <span className='ml-2'> Geld senden</span>
                                </>
                            </Button>

                            <div className='absolute'>
                                <Transition appear show={isModalOpen} as='div'>
                                    <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
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
                                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg leading-6 text-gray-900 font-bold"
                                                        >
                                                            Einzahlen

                                                            <Button
                                                                className='w-8 h-8 bg-primary/10 text-black rounded-full absolute top-3 right-3'
                                                            >
                                                                <Icon name="x" className='w-6 h-6 stroke-primary' />
                                                            </Button>
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Your payment has been successfully submitted. We’ve sent
                                                                you an email with all of the details of your order.
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={() => setIsModalOpen(false)}
                                                            >
                                                                Got it, thanks!
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className=''>
                <section className='-mt-[90px] lg:-mt-[120px] mb-5'>
                    <div className='container'>
                        <div className='flex items-center gap-3 mb-5'>
                            <Icon name="equal-sign" className='w-6 h-6 stroke-primary' />
                            <h6 className='text-white font-medium text-xl'>Zinsdepott</h6>
                        </div>

                        <div className="grid grid-cols-12 gap-3 lg:gap-10">
                            {/* card */}
                            <div className="gap-3 col-span-12 md:col-span-4 flex md:block  bg-white p-3.5 lg:p-10 rounded-lg shadow-mg border">

                                <div>
                                    <Icon name='bar-chart' className='w-14 h-14 lg:w-16 lg:h-16' />
                                </div>
                                <div>
                                    <div className='flex items-center text-xs lg:text-sm  lg:mt-8 lg:mb-8'>
                                        <span className='uppercase mr-2.5 font-medium '>Zinsdepot</span>
                                        <span className='p-1.5 block-inline bg-[#00D296] rounded-[6px] mr-1.5'>
                                            <Icon name="clock" className='w-2 h-2 stroke-white' />
                                        </span>
                                        <span className='font-medium '>23.000 €</span>
                                    </div>

                                    <div className='font-medium text-2xl lg:text-[48px]'>
                                        33,000 €
                                    </div>
                                </div>
                            </div>

                            {/* card */}
                            <div className="col-span-12 md:col-span-4 flex gap-3 md:block bg-white p-3.5 lg:p-10 rounded-lg shadow-mg border">
                                <div>
                                    <Icon name='percent' className='w-14 h-14 lg:w-16 lg:h-16' />
                                </div>

                                <div>
                                    <div className='flex items-center text-xs md:text-sm lg:mt-8 lg:mb-8'>
                                        <span className='uppercase mr-2.5 font-medium text-sm'>Investmentdepot</span>
                                        <span className='p-1.5 block-inline bg-[#ff3535] rounded-[6px] mr-1.5'>
                                            <Icon name="clock" className='w-2 h-2 stroke-white' />
                                        </span>
                                        <span className='font-medium text-xs whitespace-nowrap'>23.000 €</span>
                                    </div>

                                    <div className='text-2xl lg:text-[48px]'>
                                        700 €
                                    </div>
                                </div>
                            </div>

                            {/* card */}
                            <div className="col-span-12 md:col-span-4 flex gap-3 md:block bg-white p-3.5 lg:p-10 rounded-lg shadow-mg border">
                                <div>
                                    <Icon name='wallet' className='w-14 h-14 lg:w-16 lg:h-16' />
                                </div>

                                <div>
                                    <div className='flex items-center text-xs md:text-sm lg:mt-8 lg:mb-8'>
                                        <span className='uppercase mr-2.5 font-medium '>Gewinn Total</span>
                                    </div>

                                    <div className='text-2xl font-medium lg:text-[48px]'>
                                        1,623 €
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {children}
            </main>
        </React.Fragment >
    )
}

export default DashboardLayout