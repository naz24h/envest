import Navbar from '@/components/layout/Navbar'
import React from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import LinkButton from '@/components/ui/LinkButton'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <header className="relative bg-transparent text-white h-[500px]">
                <Image
                    src="/site/bg.png"
                    alt="bg"
                    width={1920}
                    height={680}
                    quality={70}
                    loading='lazy'
                    className='absolute top-0 left-0 h-full object-cover -z-10'
                />
                <div className="py-5 sticky top-0 left-0 w-full">
                    <Navbar />
                </div>

                <div className="container h-full">
                    <div className='h-full flex flex-col'>

                        {/* header */}
                        <div className="my-auto mt-12 flex items-center justify-between">
                            <div>
                                <h6 className='mb-4'>Guthaben Total</h6>
                                <div className="flex items-end gap-4">
                                    <h1 className="text-[56px] leading-[48px] font-[400]">33,000 €</h1>
                                    <div className='flex items-center gap-3.5 text-sm tracking-[0.56px]'>
                                        <div className='w-6 h-6 flex items-center justify-center bg-green-500 rounded-[6px] '>
                                            <Icon name="clock" className='w-2 h-2' />
                                        </div>
                                        23.000,00 € heute, 04.08.2023
                                    </div>
                                </div>

                                <span className='block mt-4 text-[rgba(255,255,255,0.30)]'>
                                    Depotzinsen: 5,4% p. a.
                                </span>
                            </div>

                            <LinkButton variant='primary' href="/dashboard" className='mt-12 text-white'>
                                <Icon name="arrow-right" />
                                <span className='ml-2'> Geld senden</span>
                            </LinkButton>

                        </div>

                        {/* card */}
                        <div className='mt-12'>

                            <div className="flex items-center gap-3 py-3">
                                <Icon name="equal-sign" />
                                <span className='text-2xl leading-6'>Zinsdepott</span>
                            </div>

                            <div className="grid grid-cols-12 gap-10 text-[#062137]">

                                {/* Card */}
                                <div className="col-span-4 flex flex-col bg-white text-black p-10 rounded-md shadow">
                                    <div className="block mb-8">
                                        <Icon name="bar-chart" className='w-10 h-10' />
                                    </div>
                                    <div className='mb-8 flex items-center flex-nowrap gap-3 text-sm font-[700] text-[#062137]'>
                                        <div className='uppercase'>
                                            Zinsdepot
                                        </div>
                                        <div className='flex items-center gap-4 text-sm'>
                                            <div className='w-6 h-6 flex items-center justify-center bg-green-500 rounded-[6px] '>
                                                <Icon name="clock" className='w-2 h-2' />
                                            </div>
                                            30,000 €
                                        </div>
                                    </div>

                                    <h1 className="text-[56px] leading-[48px] font-[400]">33,000 €</h1>

                                </div>
                                {/* End Card */}


                                {/* Card */}
                                <div className="col-span-4 flex flex-col bg-white text-black p-10 rounded-md shadow">
                                    <div className="block mb-8">
                                        <Icon name="percent" className='w-10 h-10' />
                                    </div>
                                    <div className='mb-8 flex items-center flex-nowrap gap-3 text-sm font-[700] text-[#062137]'>
                                        <div className='uppercase'>
                                            Investmentdepot
                                        </div>
                                        <div className='flex items-center gap-4 text-sm'>
                                            <div className='w-6 h-6 flex items-center justify-center bg-red-500 rounded-[6px] '>
                                                <Icon name="clock" className='w-2 h-2 stroke-white rotate-90' />
                                            </div>
                                            700 €
                                        </div>
                                    </div>

                                    <h1 className="text-[56px] leading-[48px] font-[400]">700 €</h1>

                                </div>
                                {/* End Card */}

                                {/* Card */}
                                <div className="col-span-4 flex flex-col bg-white text-black p-10 rounded-md shadow">
                                    <div className="block mb-8">
                                        <Icon name="wallet" className='w-10 h-10' />
                                    </div>
                                    <div className='mb-8 flex items-center flex-nowrap gap-3 text-sm font-[700] text-[#062137]'>
                                        <div className='uppercase'>
                                            Gewin Total
                                        </div>
                                    </div>

                                    <h1 className="text-[56px] leading-[48px] font-[400]">1,600 €</h1>

                                </div>
                                {/* End Card */}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </React.Fragment>
    )
}

export default DashboardLayout