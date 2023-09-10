'use client';
import CountrySelection, { Country, initialCountry } from '@/components/kyc/CountrySelection';
import Icon from '@/components/ui/Icon'; 
import Input from '@/components/ui/form/Input';
import * as React from 'react';

const KYCValidation = () => {
    const [step, setStep] = React.useState<number>(1);
    const [country, setCountry] = React.useState<Country>(initialCountry);

    return(
        <section className='container'>
            <div className="mt-10">
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 py-2.5'>
                        <Icon
                            name='photo-id'
                            className='w-5 h-5 text-primary'
                        />
                        <span>Identitätscheck</span>
                    </div>
                </div>
                <div className='w-full bg-slate-100'>
                    <div 
                        className='py-0.5 h-1 rounded-lg text-xs bg-[#00D296]' 
                        style={{width: `${(step/5)*100}%`}}
                    >
                        <span className='sr-only'>step</span>
                    </div>
                </div>
            </div>


            <div className='grid place-items-center pb-20'>
                {step === 1 && (
                    <React.Fragment>
                        <div className='py-10'>
                            <div className="grid grid-cols-12 gap-5">

                                <div className='col-span-12 md:col-span-6'>
                                    <label htmlFor="vorname">Vorname</label>
                                    <Input
                                        type="text" 
                                    />
                                </div>

                                <div className='col-span-12 md:col-span-6'>
                                    <label htmlFor="nachname">Nachname</label>
                                    <Input
                                        type="text" 
                                    />
                                </div> 
                                    
                                <div className='col-span-12'>
                                    <label htmlFor="">Straße + Hausnummer</label>
                                    <Input
                                        type='text' 
                                    />
                                </div>

                                <div className='col-span-12 md-col-span-4'>
                                    <label htmlFor="">Postleitzahl</label>
                                    <Input
                                        type='text' 
                                    />
                                </div>

                                <div className='col-span-12 md-col-span-8'>
                                    <label htmlFor="">Ort</label>
                                    <Input
                                        type='text' 
                                    />
                                </div>

                                <div className='col-span-12'>
                                    <label htmlFor="">E-Mail</label>
                                    <Input
                                        type='email' 
                                    />
                                </div> 

                                <div className='col-span-12'>
                                    <label htmlFor="">Country</label>
                                    
                                    {/* country */}
                                    <CountrySelection 
                                        value = {country}
                                        onChange = {setCountry}
                                    /> 
                                </div> 

                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </section>
    )
};

export default KYCValidation;