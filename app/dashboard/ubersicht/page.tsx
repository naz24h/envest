'use client'
import { InvestmentDataTableColumn } from '@/components/Investments/InvestmentDataTableColumn';
import Icon from '@/components/ui/Icon';
import DataTable from '@/components/ui/table/DataTable';
import React from 'react';
import { Tab } from '@headlessui/react'
import Input from '@/components/ui/form/Input';
import Button from '@/components/ui/Button';
import PriceCard from '@/components/ubersicht/PriceCard';


const Ubersicht = () => {
    
    // profile form data
    const [profileFormData, setProfileFormData] = React.useState({
        first_name: '',
        last_name: '',
        street: '',
        house_number: '',
        zip_code: '',
        city: '',
        country: '',
        mobile_number: '',
        landline_number: '',
        marital_status: '',
        nationality: '',
    });
    
    // servicepakete form data    
    const [selectedPlan, setSelectedPlan] = React.useState('gold');

    // withdraw form data
    const [withdrawFormData, setWithdrawFormData] = React.useState({
        account_holder: '',
        bank: '',
        iban: '',
        bic: '',
    });
    

    // handle change 
    const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileFormData({ ...profileFormData, [name]: value });
    }

    // handle withdraw form change
    const handleWithdrawFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWithdrawFormData({ ...withdrawFormData, [name]: value });
    }


    // handle submit profile form data
    const handleSubmitProfileFormData = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(profileFormData);
    }

    // handle submit withdraw form data
    const handleWithdrawFormSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(withdrawFormData);
    }


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
                            <Tab className={({ selected }) => selected ? 'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 'border-2 border-transparent '}>Auszahlungskonto</Tab>
                        </Tab.List>

                        <Tab.Panels className="py-14">

                            {/* Profile */}
                            <Tab.Panel>
                                <div className="grid grid-cols-12 gap-8 relative">
                                    {/* Profile form */}
                                    <div className='col-span-12 md:col-span-7 lg:col-span-8 bg-white py-10 px-9 box-shadow'>
                                        <h5 className='font-medium text-[#123857] mb-6'>Persönliche Angaben</h5>

                                        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Vorname</label>
                                                <Input
                                                    type='text'
                                                    name='first_name'
                                                    value={profileFormData.first_name}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Nachname</label>
                                                <Input
                                                    type='text'
                                                    name='last_name'
                                                    value={profileFormData.last_name}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Straße</label>
                                                <Input
                                                    type='text'
                                                    name='street'
                                                    value={profileFormData.street}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Hausnummer</label>
                                                <Input
                                                    min={0}
                                                    type='number'
                                                    name='house_number'
                                                    value={profileFormData.house_number}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>PLZ</label>
                                                <Input
                                                    type='number'
                                                    name='zip_code'
                                                    value={profileFormData.zip_code}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Ort</label>
                                                <Input
                                                    type='text'
                                                    name='city'
                                                    value={profileFormData.city}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>


                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Adressland</label>
                                                <Input
                                                    type='text'
                                                    name='country'
                                                    value={profileFormData.country}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Telefonnummer (Mobil)</label>
                                                <Input
                                                    type='text'
                                                    name='mobile_number'
                                                    value={profileFormData.mobile_number}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Telefonnummer (Festnetz)</label>
                                                <Input
                                                    type='text'
                                                    name='landline_number'
                                                    value={profileFormData.landline_number}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>

                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Familienstand</label>
                                                <Input
                                                    type='text'
                                                    name='marital_status'
                                                    value={profileFormData.marital_status}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>
                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Nationalität</label>
                                                <Input
                                                    type='text'
                                                    name='nationality'
                                                    value={profileFormData.nationality}
                                                    onChange={handleProfileFormChange}
                                                />
                                            </div>

                                            <div className="col-span-2 flex items-center w-full">
                                                <Button type='button' onClick={handleSubmitProfileFormData} className='bg-primary text-white py-3 px-8 rounded-md ml-auto'>
                                                    Speichern
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="col-span-12 md:col-span-5 lg:col-span-4 relative">
                                        <div className="bg-white p-10 md:p-8 lg:p-10 box-shadow sticky top-20 left-0 w-full">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className='text-sm md:text-base'> Meine persönliche Envest-ID: </span>
                                                <span className='text-green-500 border border-green-500 px-2 py-1'>613680</span>
                                            </div>

                                            <h5 className='text-lg md:text-base lg:text-xl font-medium leading-8 mb-3'>
                                                Allgemeine Anfragen? Technische Probleme? Fragen zu unseren Produkten?
                                            </h5>

                                            <div className="mb-1 text-sm md:text-base">
                                                <span> Telefon: </span>
                                                <a href="tel:+49 (0)30 890 21-400" className='text-green-500 px-2 py-1 text-sm lg:text-base hover:underline'>+49 (0)30 890 21-400</a>
                                            </div>

                                            <div className="mb-3 text-sm lg:text-base">
                                                <span> E-Mail: </span>
                                                <a href='tel:+493089021400' className='text-green-500 px-2 py-1 hover:underline'>info@envest.de</a>
                                            </div>

                                            <p className="text-sm text-primary"> Mo. - Fr.von 9:00 - 18:00 Uhr</p>
                                        </div>

                                    </div>
                                </div>

                            </Tab.Panel>

                            {/* Servicepakete */}
                            <Tab.Panel>
                                <div>
                                    <div className="flex flex-wrap items-stretch justify-center gap-8 relative h-fit">
                                        <PriceCard
                                            active={selectedPlan === 'gold'}
                                            title="Gold"
                                            value='gold'
                                            features={[
                                                { title: "Kostenloses Depot", available: true },
                                                { title: "Monatliche Auszahlung", available: true },
                                                { title: "Investment bis 50.000€", available: true },
                                                { title: "5,4% Depotzinsen p.a.", available: true },
                                                { title: "12 Monate Mindesthaltedauer", available: true },
                                            ]}
                                            unit='0,8% p.a. vom Depotwert'
                                            onChange={e => setSelectedPlan(e.target.value)}
                                        />

                                        <PriceCard
                                            title="Platin"
                                            value='platin'
                                            active={selectedPlan === 'platin'}
                                            onChange={e => setSelectedPlan(e.target.value)}
                                            features={[
                                                { title: "Kostenloses Depot", available: true },
                                                { title: "Monatliche Auszahlung", available: true },
                                                { title: "Investment bis 50.000€", available: true },
                                                { title: "5,4% Depotzinsen p.a.", available: true },
                                                { title: "12 Monate Mindesthaltedauer", available: true },
                                            ]}
                                            unit='0,35% p.a. vom Depotwert'
                                        />

                                        <PriceCard
                                            title="Custom"
                                            value='custom'
                                            active={selectedPlan === 'custom'}
                                            onChange={e => setSelectedPlan(e.target.value)}
                                            features={[
                                                { title: "Kostenloses Depot", available: true },
                                                { title: "Monatliche Auszahlung", available: true },
                                                { title: "Investment bis 50.000€", available: true },
                                                { title: "8,5% Depotzinsen p.a.", available: true },
                                                { title: "12 Monate Mindesthaltedauer", available: true },
                                            ]}
                                            unit='0,15% p.a. vom Depotwert'
                                        />

                                    </div>
                                </div>
                            </Tab.Panel>

                            {/* Auszahlungskonto */}
                            <Tab.Panel>
                                <div className="grid grid-cols-12 gap-8 relative">
                                    {/* Profile form */}
                                    <div className='col-span-12 md:col-span-7 lg:col-span-8 bg-white py-10 px-9 box-shadow'>
                                        <h5 className='font-medium text-[#123857] mb-6'>Kontoinhaber</h5>

                                        <div className="flex flex-col gap-y-4">
                                            <div className='w-full max-w-[500px]'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Kontoinhaber</label>
                                                <Input
                                                    type='text'
                                                    name='account_holder'
                                                    value={withdrawFormData.account_holder}
                                                    onChange={handleWithdrawFormChange}
                                                />
                                            </div>


                                            <div className='w-full max-w-[500px]'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Bank</label>
                                                <Input
                                                    type='text'
                                                    name='bank'
                                                    value={withdrawFormData.bank}
                                                    onChange={handleWithdrawFormChange}
                                                />
                                            </div>


                                            <div className='w-full max-w-[500px]'>
                                                <label htmlFor="" className='font-medium mb-2 block'>IBAN</label>
                                                <Input
                                                    type='text'
                                                    name='iban'
                                                    value={withdrawFormData.iban}
                                                    onChange={handleWithdrawFormChange}
                                                />
                                            </div>


                                            <div className='w-full max-w-[500px]'>
                                                <label htmlFor="" className='font-medium mb-2 block'>BIC</label>
                                                <Input
                                                    type='text'
                                                    name='bic'
                                                    value={withdrawFormData.bic}
                                                    onChange={handleWithdrawFormChange}
                                                />
                                            </div>
 
                                            <div className="col-span-2 flex items-center w-full">
                                                <Button type="button" onClick = {handleWithdrawFormSubmit} className='bg-primary text-white py-3 px-8 rounded-md ml-auto'>
                                                    Speichern
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="col-span-12 md:col-span-5 lg:col-span-4 relative">
                                        <div className="bg-white p-10 md:p-8 lg:p-10 box-shadow sticky top-20 left-0 w-full">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className='text-sm md:text-base'> Meine persönliche Envest-ID: </span>
                                                <span className='text-green-500 border border-green-500 px-2 py-1'>613680</span>
                                            </div>

                                            <h5 className='text-lg md:text-base lg:text-xl font-medium leading-8 mb-3'>
                                                Allgemeine Anfragen? Technische Probleme? Fragen zu unseren Produkten?
                                            </h5>

                                            <div className="mb-1 text-sm md:text-base">
                                                <span> Telefon: </span>
                                                <a href="tel:+49 (0)30 890 21-400" className='text-green-500 px-2 py-1 text-sm lg:text-base hover:underline'>+49 (0)30 890 21-400</a>
                                            </div>

                                            <div className="mb-3 text-sm lg:text-base">
                                                <span> E-Mail: </span>
                                                <a href='tel:+493089021400' className='text-green-500 px-2 py-1 hover:underline'>info@envest.de</a>
                                            </div>

                                            <p className="text-sm text-primary"> Mo. - Fr.von 9:00 - 18:00 Uhr</p>
                                        </div>

                                    </div>
                                </div>

                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div >
    );
}

export default Ubersicht;