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
import { useUser } from '@/context/UserProvider';
import { Dialog, Transition } from '@headlessui/react';
import axios from '@/lib/axios';



const AnleihenPreview = () => {
    const [fundamentals, setFundamentals] = useState<any>({});
    const { handleGetStockDataLive, handleGetStockGraphData, handleGetFundamentals, getCompanyLogo } = useStocks();
    const [liveStock, setLiveStock] = useState<{ [key: string]: string | number }>({});
    const [graphData, setGraphData] = useState<any>([]);
    const [period, setPeriod] = useState<number>(365);
    const [buyModal, setBuyModal] = useState<boolean>(false);
    const [sellModal, setSellModal] = useState<boolean>(false);
    const { user } = useUser();

    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [amount , setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams();

    const id = params.id as string
    const code = id?.split('.')[0];
    const exchange = id?.split('.')[1];

    useEffect(() => {
        (async () => {
            if (id) {
                const res = await handleGetStockDataLive(code, exchange);
                setLiveStock(res);

                // fundamentals 
                const fundamentals = await handleGetFundamentals(code, exchange);


                const logo = await getCompanyLogo(code, exchange);

                setFundamentals({
                    ...fundamentals,
                    General: {
                        ...fundamentals.General,
                        logo: logo.logo,
                    }
                });
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    useEffect(() => {
        (async () => {
            try {
                let res = await handleGetStockGraphData({
                    symbol: code,
                    exchange: exchange,
                    interval: '5m',
                    start: dayjs().subtract(period, 'days').format('YYYY-MM-DD'),
                    end: dayjs().format('YYYY-MM-DD')
                });
                setGraphData(_.orderBy(_.filter(res, (item: any) => item.open !== null), ['date'], ['desc']));

            } catch (err: any) {
                console.error(err)
            }
        })();
    }, [id, period])
 

    const handleSubmit = async () => {
        try{
            setLoading(true);
            const res = await axios.post('/api/stocks/buy', {
                Symbol: code,
                Exchange: exchange,
                user_id: user ? user.id : null,
                amount: amount,
                price: liveStock?.open,
                balance: user?.balance,
                date: dayjs().format('YYYY-MM-DD'),
            });
            const data = await res.data;


            setLoading(false);
            console.log({ data, amount});

        }catch (err: any) {
            console.error(err)
        }
    }


    return (
        <section>
            <div className='container py-3'>
                <div className='flex items-center gap-3 w-[300px] max-w-[350px]'>
                    {
                        fundamentals.General?.logo && typeof fundamentals.General?.logo === 'string' ?
                            <Image
                                src={fundamentals.General?.logo || '/brand-icons/amazon.png'}
                                alt={fundamentals.General?.Name}
                                width={52}
                                height={52}
                                loading="lazy"
                                unoptimized
                            />
                            :
                            <div className='w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center'>
                                <Icon name='chart' className='w-6 h-6 stroke-slate-400' />
                            </div>
                    }

                    <div>
                        <p className='text-base font-medium'>
                            {fundamentals.General?.Name}
                        </p>
                        <p className='text-sm text-gray-500'>
                            {fundamentals.General?.Code}
                        </p>
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
                                                    <Icon name='clock' className={`w-2 h-2 md:w-2.5 md:h-2.5 ${Number(liveStock?.change) < 0 ? 'stroke-red-500' : 'stroke-green-500'} `} />
                                                </div>

                                                <span className={`text-sm md:text-lg tracking-[0.2px] font-medium ${Number(liveStock?.change) < 0 ? 'text-red-500' : 'text-green-500'}`}>{liveStock.change} € ({liveStock.change_p}%)</span>
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
                                            <h4 className='font-medium mb-4'>Über {fundamentals.General?.Name}</h4>
                                            <p className='text-sm md:text-base align text-justify'>
                                                {
                                                    showDescription ?
                                                        fundamentals.General?.Description
                                                        : fundamentals.General?.Description?.slice(0, 500) + '...'
                                                }
                                                <button onClick={() => setShowDescription(!showDescription)} className='bg-transparent ml-2'>
                                                    <span className='text-primary'>
                                                        {
                                                            showDescription ? 'weniger' : 'mehr'
                                                        }
                                                    </span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-5 md:p-10 box-shadow bg-white'>
                                    <h5 className='font-medium mb-4'>Details</h5>
                                    <div className='w-100 flex flex-wrap items-center justify-between gap-6'>
                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Tageshoch</p>
                                            <p className='text-3xl font-medium'>
                                                {liveStock?.high} {fundamentals?.General?.CurrencySymbol}
                                            </p>
                                        </div>

                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Tagesief </p>
                                            <p className='text-3xl font-medium'>
                                                {liveStock?.low} {fundamentals?.General?.CurrencySymbol}
                                            </p>
                                        </div>

                                        <div className='w-[200px]'>
                                            <p className='text-sm text-[#A8B4BD] uppercase tracking-[0.56px]'>Money out</p>
                                            <p className='text-3xl font-medium'>
                                                {liveStock?.volume} {fundamentals?.General?.CurrencySymbol}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-5 md:p-10 box-shadow bg-white'>
                                    <h4 className='font-medium mb-4'>Ausgewählt Assets</h4>
                                    <div className='w-100'>
                                        <div className='flex flex-col items-center w-32'>
                                            <div>
                                                {fundamentals.General?.logo && typeof fundamentals.General?.logo === 'string' ?
                                                    <Image
                                                        src={fundamentals.General?.logo || '/brand-icons/amazon.png'}
                                                        alt={fundamentals.General?.Name}
                                                        width={52}
                                                        height={52}
                                                        loading="lazy"
                                                    /> :
                                                    <div className='w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center'>
                                                        <Icon name='chart' className='w-6 h-6 stroke-slate-400' />
                                                    </div>
                                                }

                                            </div>

                                            <span className='text-base font-medium block text-center'>
                                                {fundamentals.General?.Name}
                                            </span>
                                            <h3 className={`text-2xl font-medium p-0 ${Number(liveStock?.change) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                {/* change in percent  */}
                                                {liveStock?.change_p} %
                                            </h3>
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
                                    <h3 className='text-4xl font-medium mb-8'> {Number(user?.balance).toFixed(2)} €</h3>
                                    <div className='flex items-center space-x-2'>
                                        <div className='w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center'>
                                            <Icon name='clock' className='w-2.5 h-2.5 stroke-black' />
                                        </div>
                                        <span> 0.00 €</span>
                                    </div>

                                    <div className='pt-11'>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
                                                <Button
                                                    onClick={() => setBuyModal(true)}
                                                    className='col-span-2 lg:col-span-1 flex items-center justify-center space-x-2 py-2 px-3 w-full hover:bg-green-300 rounded-md'>
                                                    <Icon name='arrow-right' className='w-3.5 h-3.5 stroke-black' />
                                                    <span className='text-sm whitespace-nowrap'>
                                                        Buy
                                                    </span>
                                                </Button>


                                                {/* buy modal */}
                                                <Transition appear show={buyModal} as={React.Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={() => setBuyModal(false)}>
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
                                                                    as="div"
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
                                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                                        >
                                                                            Buy {fundamentals.General?.Name}
                                                                        </Dialog.Title>
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-gray-500">
                                                                                Buy {fundamentals.General?.Name} for {liveStock?.open} €
                                                                            </p>

                                                                            <div className='mt-4'>
                                                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                                                    Price
                                                                                </label>
                                                                                <div className="mt-1">
                                                                                    <input
                                                                                        type="text"
                                                                                        name="price"
                                                                                        id="price"
                                                                                        className="py-2.5 border px-2.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                                        placeholder="0.00"
                                                                                        defaultValue={liveStock?.open}
                                                                                        readOnly={true}
                                                                                    />
                                                                                </div>

                                                                                <div className='mt-4'>
                                                                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                                                        Amount
                                                                                    </label>
                                                                                    <div className="mt-1">
                                                                                        <input
                                                                                            type="text"
                                                                                            name="amount"
                                                                                            id="amount"
                                                                                            value={amount}
                                                                                            onChange={(e) => setAmount(Number(e.target.value))}
                                                                                            className="py-2.5 border px-2.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                                            placeholder="0.00"
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div className='mt-4'>
                                                                                    <div>
                                                                                        <button onClick={ () => !loading && handleSubmit()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                                                             {
                                                                                                    loading ? 'Loading...' : 'Buy'
                                                                                             }
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                        </div> 
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>


                                            </div>

                                            <div className='col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1'>
                                                <Button className='col-span-2 lg:col-span-1 flex items-center justify-center space-x-2 py-2 px-2 w-full bg-red-500 text-white hover:bg-white/20 rounded-md'>
                                                    <Icon name='x' className='w-5 h-5 stroke-white' />
                                                    <span className='text-sm whitespace-nowrap'>
                                                        Sell
                                                    </span>
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