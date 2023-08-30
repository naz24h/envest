'use client'
import { getCountryDetails } from '@/api/getCounrtyDetails';
import PriceCard from '@/components/ubersicht/PriceCard';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/form/Input';
import { Tab } from '@headlessui/react';
import React from 'react';
import { useLocalStorage } from 'react-use';


const Ubersicht = () => {
    const [user] = useLocalStorage('user')
    const [nationality, setNationality] = React.useState('')
    const userData = user?.data?.user ;
    console.log(userData);

    React.useEffect(() => {
        (async () => {
            const res = await getCountryDetails(userData?.country_code)
            setNationality(res?.demonyms?.eng?.f);
        })()
    },[]);
    
    

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
                                <div className="grid grid-cols-12 gap-8 relative">
                                    {/* Profile form */}
                                    <div className='col-span-12 md:col-span-7 lg:col-span-8 bg-white py-10 px-9 box-shadow'>
                                        <h5 className='font-medium text-[#123857] mb-6'>Persönliche Angaben</h5>

                                        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Vorname</label>
                                                <Input
                                                    value={userData?.firstname}
                                                    type='text'
                                                    placeholder='Max'
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Nachname</label>
                                                <Input
                                                    value={userData?.lastname}
                                                    type='text'
                                                    placeholder='Mustermann'
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Straße</label>
                                                <Input
                                                    value={userData?.address?.city}
                                                    type='text'
                                                    placeholder='Maxstraße'
                                                />
                                            </div>


                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Hausnummer</label>
                                                <Input
                                                    type='number'
                                                    min={0}
                                                    placeholder='12'
                                                />
                                            </div>

                                            
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>PLZ</label>
                                                <Input
                                                    value={userData?.address?.zip}
                                                    type='text'
                                                    placeholder='45127'
                                                />
                                            </div>

                                            
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Ort</label>
                                                <Input
                                                    type='text'
                                                    placeholder='Essen'
                                                />
                                            </div>


                                            <div className='col-span-2'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Adressland</label>
                                                <Input
                                                    value={userData?.address?.country}
                                                    type='text'
                                                    placeholder='Deutschland'
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
                                                <label htmlFor="" className='font-medium mb-2 block'>Telefonnummer (Mobil)</label>
                                                <Input
                                                    value={userData?.mobile}
                                                    type='text'
                                                    placeholder='+49 17134534567'
                                                />
                                            </div>
                                            <div className='col-span-2 lg:col-span-1'>
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
                                                    value={nationality}
                                                    type='text'
                                                    placeholder='Deutsch'
                                                />
                                            </div>

                                            <div className="col-span-2 flex items-center w-full">
                                                <Button className='bg-primary text-white py-3 px-8 rounded-md ml-auto'>
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

                            <Tab.Panel>
                                <div>
                                    <div className="flex flex-wrap items-stretch justify-center gap-8 relative h-fit"> 
                                        <PriceCard
                                            title = "Envest Premium"
                                            features = {[
                                                {title: "Einstieg ab 50.000 €", available: true},
                                                {title: "Voller Zugriff auf ausgezeichnete Portfolio-Qualität", available: true},
                                                {title: "Persönlicher Finanzexperte", available: true},
                                            ]}
                                            unit='0.48% p.a.'
                                        />

                                        <PriceCard
                                            title = "Envest Premium"
                                            features = {[
                                                {title: "Einstieg ab 50.000 €", available: true},
                                                {title: "Depot-Check", available: true},
                                                {title: "Beratung via Telefon", available: true},
                                            ]}
                                            unit='1.48% p.a.'
                                        />  
                                        
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