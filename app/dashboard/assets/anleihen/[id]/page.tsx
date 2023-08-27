import AnleihenLineChart from '@/components/assets/AnleihenLineChart';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Image from 'next/image';

const AnleihenPreview = () => {
    return (
        <section>
            <div className='container py-3'>
                <div className='flex items-center gap-3 w-[300px] max-w-[350px]'>
                    <Image
                        src="/brand-icons/amazon.png"
                        alt="Amazon"
                        width={52}
                        height={52}
                        loading="lazy"
                    />

                    <div>
                        <p className='text-base font-medium'>Amazon</p>
                        <p className='text-sm text-gray-500'>amazon</p>
                    </div>
                </div>

                <div className='py-10'>
                    <div className='grid grid-cols-12 gap-y-8 md:gap-8'>
                        {/* left section */}
                        <div className='col-span-12 lg:col-span-8'>
                            <div className="flex flex-col gap-6">
                                {/* chart */}
                                <div className='sm:p-4 md:p-6 box-shadow bg-white'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h1 className='font-medium text-3xl md:text-5xl'>57,15 €</h1>
                                            <div className='flex items-center space-x-2'>
                                                <div className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border bg-zinc-50 rounded-full'>
                                                    <Icon name='clock' className='w-2 h-2 md:w-2.5 md:h-2.5 stroke-red-500' />
                                                </div>

                                                <span className='text-red-500 text-sm md:text-lg tracking-[0.2px] font-medium'>0.06 € (0.12%)</span>
                                                <span className='text-slate-500 text-sm md:text-base font-medium'>24 H</span>

                                            </div>
                                        </div>

                                        {/* info icon */}

                                        <div>
                                            <Icon name="i" className="w-5 h-5 fill-slate-400 hover:fill-slate-700 cursor-pointer" />
                                        </div>
                                    </div>


                                    {/* chart */}
                                    <div className='mt-5 py-3'>
                                        <div className='w-full h-[200px] md:h-[350px]'>
                                            <AnleihenLineChart />
                                        </div>
                                        <div className="flex items-center gap-4 mt-5">
                                            <Button className='border border-primary bg-primary text-white py-1 px-2.5 rounded-md'>1T</Button>
                                            <Button className='border bg-white text-primary py-1 px-2.5 rounded-md hover:bg-primary-100'>2T</Button>
                                            <Button className='border bg-white text-primary py-1 px-2.5 rounded-md hover:bg-primary-100'>30T</Button>
                                            <Button className='border bg-white text-primary py-1 px-2.5 rounded-md hover:bg-primary-100'>3M</Button>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-2 sm:p-5 md:p-10 box-shadow bg-white'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h4 className='font-medium mb-4'>Über Amazon</h4>
                                            <p className='text-sm md:text-base align text-justify'>
                                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-5 md:p-10 box-shadow bg-white'>
                                    <h5 className='font-medium mb-4'>Details</h5>
                                    <div className='w-100 flex flex-wrap items-center justify-between gap-6'>
                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Tageshoch</p>
                                            <p className='text-3xl font-medium'>5,623 €</p>
                                        </div>

                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Tagesief </p>
                                            <p className='text-3xl font-medium'>5,623 €</p>
                                        </div>

                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Money out</p>
                                            <p className='text-3xl font-medium'>5,623 €</p>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-5 md:p-10 box-shadow bg-white'>
                                    <h4 className='font-medium mb-4'>Ausgewählt Assets</h4>
                                    <div className='w-100'>
                                        <div className='flex flex-col items-center w-32'>
                                            <div>
                                                <Image
                                                    src="/brand-icons/amazon.png"
                                                    alt="Amazon"
                                                    width={52}
                                                    height={52}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <span className='text-base font-medium block'>Amazon</span>
                                            <h3 className='text-2xl font-medium text-red-500 p-0'>-1,62 %</h3>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* right section */}
                        <div className='col-span-12 lg:col-span-4'>
                            <div className='sticky top-20 left-0 w-full'>
                                <div className="bg-primary text-white p-4 md:p-10 rounded-xl">
                                    <p className='uppercase mb-3'>Du Hast</p>
                                    <h3 className='text-4xl font-medium mb-8'>1,623 €</h3>
                                    <div className='flex items-center space-x-2'>
                                        <div className='w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center'>
                                            <Icon name='clock' className='w-2.5 h-2.5 stroke-black' />
                                        </div>
                                        <span> 23,000 €</span>
                                    </div>

                                    <div className='pt-11'>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
                                                <Button className='col-span-2 lg:col-span-1 flex items-center space-x-2 py-2 px-3 w-full hover:bg-green-300 rounded-md'>
                                                    <Icon name='arrow-right' className='w-3.5 h-3.5 stroke-black' />
                                                    <span className='text-sm whitespace-nowrap'>Send Money</span>
                                                </Button>
                                            </div>

                                            <div className='col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1'>
                                                <Button className='col-span-2 lg:col-span-1 flex items-center space-x-2 py-2 px-2 w-full bg-white/10 text-white hover:bg-white/20 rounded-md'>
                                                    <Icon name='x' className='w-5 h-5 stroke-white' />
                                                    <span className='text-sm whitespace-nowrap'>Closed Investment</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AnleihenPreview;