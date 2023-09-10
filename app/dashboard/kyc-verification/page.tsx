'use client';
import CountrySelection, { Country, initialCountry } from '@/components/kyc/CountrySelection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/form/Input';
import { RadioGroup } from '@headlessui/react';
import _ from 'lodash';
import * as React from 'react';


type FormData = {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zipCode: string;
    country1: Country;
    country2: Country;
    country3: Country;
    validationMethod: string;
    idFile: File | null;
    cardType: string;
}



const KYCValidation = () => {
    const [step, setStep] = React.useState<number>(1);
    const [country1, setCountry1] = React.useState<Country>(initialCountry);
    const [country2, setCountry2] = React.useState<Country>(initialCountry);
    const [country3, setCountry3] = React.useState<Country>(initialCountry);
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [street, setStreet] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [zipCode, setZipCode] = React.useState<string>('');
    const [validationMethod, setValidationMethod] = React.useState<string>('');
    const [idFile, setIdFile] = React.useState<File | null>(null);
    const [cardType, setCardType] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    

    

    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('firstName', firstName);
        fd.append('lastName', lastName);
        fd.append('street', street);
        fd.append('city', city);
        fd.append('email', email);
        fd.append('zipCode', zipCode);
        fd.append('country1', country1?.country);
        fd.append('country2', country2?.country);
        fd.append('country3', country3?.country);
        fd.append('validationMethod', validationMethod);
        fd.append('idFile', idFile as Blob);
        fd.append('cardType', cardType);
        console.log(_.entries(fd));
    }


    return (
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
                        style={{ width: `${(step / 5) * 100}%` }}
                    >
                        <span className='sr-only'>step</span>
                    </div>
                </div>
            </div>


            <div className='grid place-items-center pb-20'>
                {step === 1 && (
                    <React.Fragment>
                         <div className='py-10'>
                            <div className="grid grid-cols-12 gap-5 box-shadow p-10 w-[80vw] max-w-[580px]">
                                <div className='col-span-12'>
                                    <h4 className='text-center mb-3 font-medium'>Persönliche Informationen</h4>
                                </div>

                                <div className='col-span-12 md:col-span-6'>
                                    <label htmlFor="vorname">Vorname</label>
                                    <Input
                                        type="text"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12 md:col-span-6'>
                                    <label htmlFor="nachname">Nachname</label>
                                    <Input
                                        type="text"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12'>
                                    <label htmlFor="">Straße + Hausnummer</label>
                                    <Input
                                        type='text'
                                        value={street}
                                        onChange={e => setStreet(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12 md-col-span-4'>
                                    <label htmlFor="">Postleitzahl</label>
                                    <Input
                                        type='text'
                                        value={zipCode}
                                        onChange={e => setZipCode(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12 md-col-span-8'>
                                    <label htmlFor="">Ort</label>
                                    <Input
                                        type='text'
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12'>
                                    <label htmlFor="">E-Mail</label>
                                    <Input
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='col-span-12'>
                                    <label htmlFor="">Country</label>

                                    {/* country */}
                                    <CountrySelection
                                        value={country1}
                                        onChange={setCountry1}
                                    />
                                </div>

                                <div className="col-span-12 flex">
                                    <Button 
                                        type='button' 
                                        onClick={() => setStep(prev => prev + 1)} 
                                        className="w-full ml-auto py-2 px-4 rounded-md text-white hover:opacity-75"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {step === 2 && (
                    <React.Fragment>
                    <div className='py-10'>
                       <div className="grid grid-cols-12 gap-5 box-shadow p-10 w-[80vw] max-w-[580px]">
                           <div className='col-span-12'>
                               <h4 className='text-center mb-3 font-medium'>Identität bestätigen</h4>
                           </div>

                           
                           <div className='col-span-12'>
                               <label htmlFor="">Nationalität</label>

                               {/* country */}
                               <CountrySelection
                                   value={country2}
                                   onChange={setCountry2}
                               />
                           </div>

                           <div className='col-span-12'> 
                               <RadioGroup value={validationMethod} onChange={setValidationMethod}>
                                <RadioGroup.Label>Verifizierungsmethode</RadioGroup.Label>
                                <RadioGroup.Option value="startup">
                                    {({ checked }) => (
                                    <span className={checked ? 'bg-blue-200' : ''}>Startup</span>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option value="business">
                                    {({ checked }) => (
                                    <span className={checked ? 'bg-blue-200' : ''}>Business</span>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option value="enterprise">
                                    {({ checked }) => (
                                    <span className={checked ? 'bg-blue-200' : ''}>Enterprise</span>
                                    )}
                                </RadioGroup.Option>
                                </RadioGroup>
                           </div> 

                           <div className="col-span-12 flex">
                               <Button 
                                   type='button' 
                                   onClick={() => setStep(prev => prev + 1)} 
                                   className="w-full ml-auto py-2 px-4 rounded-md text-white hover:opacity-75"
                               >
                                   Next
                               </Button>
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