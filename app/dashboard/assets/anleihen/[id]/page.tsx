'use client';
import AnleihenLineChart from '@/components/assets/Anleihen/AnleihenLineChart';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useStocks } from '@/context/StockProvider';
import _ from 'lodash';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';



const AnleihenPreview = () => {
    const { handleGetStockDataLive, handleGetStockGraphData} = useStocks();
    const [liveStock, setLiveStock] = useState<{[key:string]: string | number}>({}); 
    const [graphData, setGraphData] = useState<any>([]);
    const [period, setPeriod] = useState<number>(365);  
    
    const params = useParams();

    const id = params.id as string
    const code = id?.split('.')[0];
    const exchange = id?.split('.')[1];
 
    useEffect(()=> {  
        (async () => {
            if(id) {
                const res = await handleGetStockDataLive(code, exchange);
                setLiveStock(res);
            }
        }) ()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    useEffect(() => {
        (async () => {
            try {
                let res =  await handleGetStockGraphData({
                    symbol: code, 
                    exchange: exchange, 
                    interval: '5m',  
                    start: dayjs().subtract(period, 'days').format('YYYY-MM-DD'),
                    end: dayjs().format('YYYY-MM-DD')
                }); 
                setGraphData(_.orderBy(_.filter(res, (item: any) => item.open !== null ), ['date'], ['desc']));
                
            } catch (err: any) {
                console.error(err)
            }
        })();
    }, [id, period])
 

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
                                            <h1 className='font-medium text-3xl md:text-5xl'>{liveStock?.open} €</h1>
                                            <div className='flex items-center space-x-2'>
                                                <div className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border bg-zinc-50 rounded-full'>
                                                    <Icon name='clock' className={`w-2 h-2 md:w-2.5 md:h-2.5 ${Number(liveStock?.change) < 0 ? 'stroke-red-500' : 'stroke-green-500' } `} />
                                                </div>

                                                <span className={`text-sm md:text-lg tracking-[0.2px] font-medium ${Number(liveStock?.change) < 0 ? 'text-red-500' : 'text-green-500' }`}>{liveStock.change} € ({liveStock.change_p}%)</span>
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
                                            <AnleihenLineChart data={graphData} change={!_.isNaN(liveStock.change) ? liveStock.change : 0} />
                                        </div>
                                        <div className="flex items-center gap-4 mt-5">
                                            <Button onClick={() => setPeriod(1)} className={`border  py-1 px-2.5 rounded-md ${period === 1 ? 'border-primary bg-primary text-white' : 'bg-white text-primary'}`}>  D </Button>
                                            <Button onClick={() => setPeriod(7)} className={`border  py-1 px-2.5 rounded-md ${period === 7 ? 'border-primary bg-primary text-white' : 'bg-white text-primary'}`}>W</Button>
                                            <Button onClick={() => setPeriod(30)} className={`border  py-1 px-2.5 rounded-md ${period === 30 ? 'border-primary bg-primary text-white' : 'bg-white text-primary'}`}>M</Button>
                                            <Button onClick={() => setPeriod(365)} className={`border  py-1 px-2.5 rounded-md ${period === 365 ? 'border-primary bg-primary text-white' : 'bg-white text-primary'}`}>Y</Button>
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