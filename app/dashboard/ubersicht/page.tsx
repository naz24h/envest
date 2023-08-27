'use client'
import { InvestmentDataTableColumn } from '@/components/Investments/InvestmentDataTableColumn';
import Icon from '@/components/ui/Icon';
import DataTable from '@/components/ui/table/DataTable';
import React from 'react';
import { Tab } from '@headlessui/react'
import Input from '@/components/ui/form/Input';


const Ubersicht = () => {
    return (
        <div className='container py-3 '>
            <div className='mt-5'>
                <h3 className='font-medium text-2xl flex items-center gap-3'>
                    <Icon name='gear' className='w-6 h-6 stroke-primary' />
                    My Einstellungen
                </h3>
            </div>

            {/* table container */}
            <div>
                <div className='py-3'>
                    <Tab.Group>
                        <Tab.List className='flex gap-3 mt-5 border-b border-[#D9D9D9]'>
                            <Tab className={({ selected }) => selected ? 'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 'border-2 border-transparent '}>Profile</Tab>
                            <Tab className={({ selected }) => selected ? 'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 'border-2 border-transparent '}>Servicepakete</Tab>
                        </Tab.List>

                        <Tab.Panels className="py-14">
                            <Tab.Panel>
                                <div className="grid grid-cols-12 gap-8">
                                    {/* Profile form */}
                                    <div className='col-span-8 bg-white py-10 px-9 box-shadow'>
                                        <h5 className='font-medium text-[#123857] mb-6'>Persönliche Angaben</h5>

                                        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Vorname</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Max'
                                                />
                                            </div>


                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Nachname</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Mustermann'
                                                />
                                            </div>


                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Straße</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Maxstraße'
                                                />
                                            </div>


                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Hausnummer</label>
                                                <Input
                                                    type='number'
                                                    min={0}
                                                    placeholder='12'
                                                />
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>PLZ</label>
                                                <Input
                                                    type='text'
                                                    placeholder='45127'
                                                />
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Ort</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Essen'
                                                />
                                            </div>


                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Adressland</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Deutschland'
                                                />
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Telefonnummer (Mobil)</label>
                                                <Input
                                                    type='text'
                                                    placeholder='+49 17134534567'
                                                />
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Telefonnummer (Festnetz)</label>
                                                <Input
                                                    type='text'
                                                    placeholder=''
                                                />
                                            </div>

                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Familienstand</label>
                                                <Input
                                                    type='text'
                                                    placeholder='ledig'
                                                />
                                            </div>
                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Nationalität</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Deutsch'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="col-span-4">
                                        <div className="bg-white p-10 box-shadow">
                                            <div className="mb-3">
                                                <span> Meine persönliche Envest-ID: </span>
                                                <span className='text-green-500 border border-green-500 px-2 py-1'>613680</span>
                                            </div>

                                            <h5 className='font-medium leading-8'>
                                                Allgemeine Anfragen? Technische Probleme? Fragen zu unseren Produkten?
                                            </h5>

                                            <div className="mb-3">
                                                <span> Telefon: </span>
                                                <span className='text-green-500 border border-green-500 px-2 py-1'>+49 (0)30 890 21-400</span>
                                            </div>

                                            <div className="mb-3">
                                                <span> Meine persönliche Envest-ID: </span>
                                                <a href='tel:+493089021400' className='text-green-500 px-2 py-1'>613680</a>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </Tab.Panel>

                            <Tab.Panel>
                                Servicepakete
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div >
    );
}

export default Ubersicht;