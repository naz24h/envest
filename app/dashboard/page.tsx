'use client';
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/form/Input'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

import { useLocalStorage } from 'react-use'
import { useGlobalLoading } from '@/context/GlobalLoader';
import axios from '@/lib/axios';
import { getUserInfo } from '@/api/getUser';
import { useUser } from '@/context/UserProvider';
import { getTransaction } from '@/api/getTransaction';
import _ from 'lodash';
import dayjs from 'dayjs';

 


const Dashboard = () => {
    const [transactions, setTransactions] = React.useState<any>();
    const { setGlobalLoading } = useGlobalLoading();
    const [token] = useLocalStorage('xtx');
    const route = useRouter();
    const { user, setUser } = useUser();
     
    let _token = token as string;
        _token = _token ? _token.split('0|')[1] : '';
    

    React.useEffect(() => {
        if(user && _token ){
            (async() => {
                const res = await getTransaction(_token);
                let data = res?.data; 
                setTransactions(data)
            })();
        }
    }, [_token, user])

    const _transactions = transactions?.data?.transactions?.data;

    console.log(user);

    return (
        <div className='container pb-10'>
            <div className="grid grid-cols-12 mt-12 gap-y-6 md:gap-6 lg:gap-20">
                <div className="col-span-12">
                    <div className='flex flex-wrap items-center gap-3'>
                        <div>
                            <Image
                                src='/user-tag.png'
                                width={64}
                                height={64}
                                alt='user'
                                loading='lazy'
                            />
                        </div>
                        <div>
                            <h6 className='text-primary text-lg font-medium'>Herzlich willkommen bei Envest!</h6>
                            <p className='text-sm max-w-[600px] text-[#8A9EAE]'>
                                Um unseren Service vollständig nutzen zu können, lege bitte zunächst deine persönlichen Informationen an und hinterlegen deinen Ausweis bzw. Reisepass, damit wir deine Identität bestätigen können.
                            </p>
                        </div>

                        <Button className='lg:ml-auto py-2 px-3 rounded-md'>
                            Jetzt loslegen
                        </Button>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <div className='flex gap-2 pb-6 border-b'>
                        <Icon name='transaktionen' className='w-8 h-8' />
                        <div>
                            <h5 className='text-primary leading-5 tracking-[0.2px] text-xl gl:text-2xl font-bold'>Transaktionen</h5>
                            <span className='block md:inline-block text-xs md:text-sm text-[#0621378e]'>Last 5 activities</span>
                        </div>
                    </div>

                    {/* table */}
                    <div>
                        {
                            _.map(_transactions, (t, i) => (
                                <div key={t.id} className="flex flex-row items-center gap-3 py-3 justify-between border-b hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-2 md:p-2.5 rounded-lg">
                                            <Icon name="money-up" className='w-4 h-4 md:w-6 md:h-6' />
                                        </div>
                                        <div>
                                            <h6 className='text-primary text-base md:text-xl font-bold'><span className='leading-6'>{t.trx}</span></h6>
                                            <span className='text-xs md:text-sm whitespace-nowrap text-[#0621378e]'>{dayjs(t.created_at).format('DD.MM.DDDD')} {dayjs(t.created_at).format('HH:mm A')} </span>
                                        </div>
                                    </div>

                                    <div className='block md:flex items-center md:w-full'>
                                        <div className='w-fit py-0.5 px-2 md:mx-auto font-bold md:py-3 md:px-5 text-[10px] md:text-base rounded-lg bg-primary text-primary-100 md:bg-primary-100/50 md:text-primary'>
                                            Bank Transfer
                                        </div>

                                        <h5 className={t.trx_type === '-'? 'text-red-500 font-bold': 'text-green-500 font-bold'}>
                                            {t.trx_type} {t.amount} €
                                        </h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>



                <div className='col-span-12 lg:col-span-6 mt-10'>
                    <div className='flex items-center gap-2 pb-6 border-b'>
                        <Icon name='wallet-card' className='w-8 h-8' />
                        <h5 className='text-primary leading-5 tracking-[0.2px] text-xl gl:text-2xl font-bold'>Meine Bankverbindung</h5>
                        <IconButton icon='three-dots' className='ml-auto bg-slate-100 md:bg-slate-100/30 hover:bg-slate-100 p-1.5 rounded-full' />
                    </div>

                    <div className='mt-6 text-center'>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className='col-span-2 bg-primary text-white p-5 xl:px-8 rounded-lg'>
                                <div className="grid grid-cols-2 gap-2 xl:gap-5">
                                    <div className='col-span-2 xl:col-span-1 text-left xl:mb-10'>
                                        <span className='block text-xs md:text-sm uppercase text-[rgba(255,255,255,0.30)] leading-[21px] tracking-[0.56px]'>Name</span>
                                        <span className='block'>Investory Card</span>
                                    </div>

                                    <div className='col-span-2 xl:col-span-1 text-left xl:mb-10'>
                                        <span className='block text-xs md:text-sm uppercase text-[rgba(255,255,255,0.30)]'>Kontonummer</span>
                                        <div className='flex items-center'>
                                            <span className="text-lg"> 2342 •••• •••• 3213</span>
                                        </div>
                                    </div>

                                    <div className='col-span-1 text-left'>
                                        <span className='block text-xs md:text-sm uppercase text-[rgba(255,255,255,0.30)]'>Verfügbar</span>
                                        <div className='flex items-center'>
                                            <span className="text-xl font-bold tracking-widest"> 5,623 € </span>
                                        </div>
                                    </div>
                                    <div className='col-span-1'>
                                        <Icon name='bank' className='ml-auto mr-4' />
                                    </div>
                                </div>
                            </div>

                            {/* form */}
                            <div className='col-span-2 p-2.5 xl:p-4 text-left flex flex-col gap-4'>
                                <h4 className='font-bold text-xl'>Quick transfer</h4>

                                <div className='py-2 px-3 border w-full text-primary border-[#E7EEF0] hover:outline-none rounded-lg font-bold text-lg focus:border-primary-600 focus:shadow-sm focus:ring-0 active:outline-none flex items-center gap-3 justify-between'>
                                    <span className='text-primary text-base md:text-lg font-[400]'>Verfügbar</span>
                                    <span className='text-base md:text-lg'>5,623 €</span>
                                </div>

                                <Input
                                    type='text'
                                    placeholder='EX: 5,623 €'
                                    icon='wallet-check'
                                    className='py-2 px-3 pl-10 border w-full font-bold text-primary border-[#E7EEF0] hover:outline-none rounded-lg  focus:border-primary-600 focus:shadow-sm focus:ring-0 active:outline-none text-right text-base md:text-lg'
                                />

                                <Button className='w-fit bg-primary text-white py-2 md:py-1.5 px-3 md:px-5 rounded-lg flex items-center space-x-1.5 text-sm'>
                                    <Icon name="arrow-right" className='mr-2 stroke-white' />
                                    <span className='text-sm md:text-lg font-[400]'>Geld senden</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Dashboard