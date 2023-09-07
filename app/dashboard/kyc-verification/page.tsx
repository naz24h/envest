'use client';
import { getCountries } from '@/api/countries';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Spinner from '@/components/ui/Spinner';
import Input from '@/components/ui/form/Input';
import { useUser } from '@/context/UserProvider';
import { Combobox, Listbox, RadioGroup } from '@headlessui/react';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
  

type Country = {
    country: string,
    country_code: string,
    dial_code:string | number,
}


const RegisterPage = () => {
    const { user } = useUser();
    const [step, setStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [countryFilter, setCountryFilter] = React.useState('');

    // form data
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState(''); // user?.email
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [country1, setCountry1] = React.useState<Country>();
    const [country2, setCountry2] = React.useState<Country>();
    const [country3, setCountry3] = React.useState<Country>();

    const [validationMethod, setValidationMethod] = React.useState(null);
    const [idFile, setIdFile] = React.useState<File | null>(null);
    const [previewImage, setPreviewImage] = React.useState<string | ArrayBuffer | null>(null);
    
    const [cardType, setCardType] = React.useState("mastercard");



    React.useEffect(() => {
        if(!user) return;
        setFirstName(user?.firstname);
        setLastName(user?.lastname);
        setEmail(user?.email);
        setStreet(user?.address?.state);
        setCity(user?.address?.city);
        setZipCode(user?.address?.zip);
    }, [user]) 
    
    
    // get countries
    React.useEffect(() => {
        const getCountriesData = async () => {
            const res = await getCountries();
            setCountries(res);
        } 
        getCountriesData();
    }, [])


    const handleImageChange = (  e: React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setIdFile(file);
            setPreviewImage(reader.result);
        }
    }


    // handle submission
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            zipCode: zipCode,
            country1: country1?.country,
            country2: country2?.country,
            country3: country3?.country,
            validationMethod: validationMethod,
            idFile: idFile,
            cardType: cardType, 
        }

        console.log(data);

        setTimeout(() => {
            setLoading(false);
            setStep(5);
        }, 2000)
        
    }


    return(
        <section className='pb-20'>
            {/* step line */}
            <div className='container'>
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
            </div>

            {/* 1st step */}
            {
                step === 1 ? (
                    <div className='container'>
                        <div className='flex items-center justify-center' data-step="1">
                            <div className='w-full max-w-[800px] mt-10 box-shadow p-4 md:p-10'>
                                <h3 className='text-2xl font-medium mb-5 text-center block'>Persönliche Informationen</h3>

                                <div className='grid grid-cols-12 gap-5'>
                                    <div className='col-span-12 md:col-span-6'>
                                        <label htmlFor="">Vorname</label>
                                        <Input
                                            type='text' 
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>


                                    <div className='col-span-12 md:col-span-6'>
                                        <label htmlFor="">Nachname</label>
                                        <Input
                                            type='text' 
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">Straße + Hausnummer</label>
                                        <Input
                                            type='text' 
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </div>

                                    
                                    <div className='col-span-12 md:col-span-4'>
                                        <label htmlFor="">Postleitzahl</label>
                                        <Input
                                            type='text'
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>

                                    
                                    <div className='col-span-12 md:col-span-8'>
                                        <label htmlFor="">Ort</label>
                                        <Input
                                            type='text' 
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">E-Mail</label>
                                        <Input
                                            type='email' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">Land</label>
                                        <div className='relative'>
                                            <Combobox value={country1} onChange={setCountry1}>
                                                <Combobox.Button className="w-full flex items-center">

                                                    <div className='px-2 bg-slate-200 flex items-center justify-center border h-11 border-r-0'>
                                                        {country1?.country_code ? 
                                                            <Image
                                                                src={`https://flagcdn.com/${_.lowerCase(country1.country_code)}.svg`}
                                                                alt={country1?.country}
                                                                width={32}
                                                                height={32}
                                                            />
                                                        : <svg 
                                                                height="24" 
                                                                viewBox="0 0 24 24" 
                                                                width="20"
                                                                fill="#0621378e"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="m15 3a3 3 0 0 0 -3-3h-12v24h2v-11h8v1a3 3 0 0 0 3 3h11v-13h-9zm-13-1h10a1 1 0 0 1 1 1v8h-11zm20 4v9h-9a1 1 0 0 1 -1-1v-1h3v-7z"/>
                                                            </svg>
                                                        }
                                                    </div>

                                                    <Combobox.Input
                                                        displayValue={(country: Country) => country?.country}
                                                        autoComplete='off'  
                                                        onChange={(e) => setCountryFilter(e.target.value)}
                                                        className="border border-rad-500 px-2 py-2 w-full outline-none shadow-none h-11"
                                                    />
                                                </Combobox.Button> 

                                                <Combobox.Options className="absolute top-full left-0 bg-white shadow-lg z-50 w-full max-h-[300px] overflow-y-auto scrollbar">

                                                    {_.size(countries) === 0 && (
                                                        <div className='w-full py-2'>
                                                            <Spinner />
                                                        </div>
                                                    )}

                                                    {
                                                        _.map(_.filter(countries, q => q.country.toLowerCase().includes(_.lowerCase(countryFilter))), (country: Country, index: number) => (
                                                            <Combobox.Option
                                                                value={country}
                                                                key={country.country_code}
                                                                className={({active}) => `${active ? 'bg-primary-100 text-slate-700' : 'text-slate-700'} cursor-pointer px-3 py-2`}
                                                            >
                                                                {({selected}) => (
                                                                    <div className='flex items-center space-x-2'>
                                                                        <Image
                                                                            src={`https://flagcdn.com/${_.lowerCase(country?.country_code)}.svg`}
                                                                            alt={country.country}
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                        <span className='flex-1'>{country.country}</span>

                                                                        {selected && (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='stroke-slate-600' width="16" height="10" viewBox="0 0 10 8" fill="none">
                                                                                <path d="M1.43512 3.93751L3.99512 6.49751L8.39062 1.50195" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                    } 
                                                </Combobox.Options>

                                            </Combobox> 
                                        </div>
                                    </div>

                                    <div className='col-span-12'>
                                        <Button onClick={()=> setStep(2)} className='w-full py-2 px-3 text-center rounded-md'>Next</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):null
            }

            {/* 2nd step */} 
            {
                step === 2 ? (
                    <div className='container'>
                        <div className='flex items-center justify-center' data-step="1">
                            <div className='w-full max-w-[800px] mt-10 box-shadow p-4 md:p-10'>
                                <h3 className='text-2xl font-medium mb-5 text-center block'>Identität bestätigen</h3>

                                <div className='grid grid-cols-12 gap-5'>

                                    <div className='col-span-12 relative'>
                                        <label htmlFor="">Land</label>
                                       
                                        <Combobox value={country2} onChange={setCountry2}>
                                                <Combobox.Button className="w-full flex items-center">

                                                    <div className='px-2 bg-slate-200 flex items-center justify-center border h-11 border-r-0'>
                                                        {country2?.country_code ? 
                                                            <Image
                                                                src={`https://flagcdn.com/${_.lowerCase(country2?.country_code)}.svg`}
                                                                alt={country2?.country}
                                                                width={32}
                                                                height={32}
                                                            />
                                                        : <svg 
                                                                height="24" 
                                                                viewBox="0 0 24 24" 
                                                                width="20"
                                                                fill="#0621378e"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="m15 3a3 3 0 0 0 -3-3h-12v24h2v-11h8v1a3 3 0 0 0 3 3h11v-13h-9zm-13-1h10a1 1 0 0 1 1 1v8h-11zm20 4v9h-9a1 1 0 0 1 -1-1v-1h3v-7z"/>
                                                            </svg>
                                                        }
                                                    </div>

                                                    <Combobox.Input
                                                        displayValue={(country: Country) => country?.country}
                                                        autoComplete='off' 
                                                        onChange={(e) => setCountryFilter(e.target.value)}
                                                        className="border border-rad-500 px-2 py-2 w-full outline-none shadow-none h-11"
                                                    />
                                                </Combobox.Button> 

                                                <Combobox.Options className="absolute top-full left-0 bg-white shadow-lg z-50 w-full max-h-[300px] overflow-y-auto scrollbar">

                                                    {_.size(countries) === 0 && (
                                                        <div className='w-full py-2'>
                                                            <Spinner />
                                                        </div>
                                                    )}

                                                    {
                                                        _.map(_.filter(countries, q => q.country.toLowerCase().includes(_.lowerCase(countryFilter))), (country: Country, index: number) => (
                                                            <Combobox.Option
                                                                value={country}
                                                                key={country.country_code}
                                                                className={({active}) => `${active ? 'bg-primary-100 text-slate-700' : 'text-slate-700'} cursor-pointer px-3 py-2`}
                                                            >
                                                                {({selected}) => (
                                                                    <div className='flex items-center space-x-2'>
                                                                        <Image
                                                                            src={`https://flagcdn.com/${_.lowerCase(country?.country_code)}.svg`}
                                                                            alt={country.country}
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                        <span className='flex-1'>{country.country}</span>

                                                                        {selected && (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='stroke-slate-600' width="16" height="10" viewBox="0 0 10 8" fill="none">
                                                                                <path d="M1.43512 3.93751L3.99512 6.49751L8.39062 1.50195" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                    } 
                                                </Combobox.Options> 
                                            </Combobox> 
                                    </div>

                                    <div className='col-span-12'>Verifizierungsmethode</div>

                                    <div className='col-span-12'>
                                        <RadioGroup 
                                            value={validationMethod} 
                                            onChange={setValidationMethod}
                                        >

                                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label> 
                                            <RadioGroup.Option
                                                value="passport"
                                            >
                                                {({checked})=>(
                                                    <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                        <div className=''>
                                                            Reisepass
                                                        </div> 
                                                        
                                                        <div className="shrink-0 text-primary">
                                                            <CheckIcon className="h-6 w-6" check={checked} />
                                                        </div>
                                                    </div>
                                                )}     
                                            </RadioGroup.Option>

                                            <RadioGroup.Option
                                                value="id-card"
                                            >
                                                {({checked})=>(
                                                    <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                        <div className=''>
                                                            Personalausweis
                                                        </div>

                                                        <div className="shrink-0 text-white">
                                                            <CheckIcon className="h-6 w-6" check={checked} />
                                                        </div>
                                                    </div>
                                                )}     
                                            </RadioGroup.Option>
                                        </RadioGroup>
                                    </div>

                                    

                                    <div className='col-span-12'>
                                        <Button 
                                            onClick={() => setStep(3)} 
                                            className='w-full py-2 px-3 text-center rounded-md'
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :null
            }

            {/* 3rd step */}
            {step=== 3 ? (
                <div className='container'>
                    <div className='flex items-center justify-center' data-step="1">
                        <div className='w-full max-w-[800px] mt-10 box-shadow p-4 md:p-10'>
                            <h3 className='text-2xl font-medium mb-5 text-center block'>Persönliche Informationen</h3>
    
                            <div className='flex items-center justify-center w-full'>
                                <div className='w-[450px]'>
                                    <div className='text-lg my-5'>Ausweis hochladen</div> 
                                        {/* uplaod image */}
                                        <div className="relative w-full h-[250px] md:h-[350px] bg-white mb-10 hover:bg-slate-50">
                                            <div className='absolute -top-0.5 -left-0.5 w-10 h-10 bg-[#D9D9D9] -z-10' />
                                            <div className='absolute -top-0.5 -right-0.5 w-10 h-10 bg-[#D9D9D9] -z-10' />
                                            <div className='absolute -bottom-0.5 -left-0.5 w-10 h-10 bg-[#D9D9D9] -z-10' />
                                            <div className='absolute -bottom-0.5 -right-0.5 w-10 h-10 bg-[#D9D9D9] -z-10' />

                                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit'>
                                                <Image
                                                    src="/image-upload.png"
                                                    alt="image-upload"
                                                    width={100}
                                                    height={100}
                                                    loading='lazy'
                                                />
                                            </div>

                                            {/* show uploaded files */}
                                            {idFile && (
                                                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-100'>
                                                    <div className='bg-white rounded-md p-2'>
                                                        <Image
                                                            src={previewImage as string}
                                                            alt="image-upload"
                                                            width={450}
                                                            height={100}
                                                            loading='lazy'
                                                            className='rounded-md'
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <input 
                                                type='file' 
                                                onChange={handleImageChange} 
                                                className='absolute top-0 left-0 w-full h-full z-100 opacity-0' 
                                            />
                                        </div>

                                        <div className='col-span-12'>
                                        <Button onClick={() => setStep(4)} className='w-full py-2 px-3 text-center rounded-md'>Next</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ): null}

            {/* 4th step */} 
           {step===4 ? (
             <div className='container'>
                <div className='flex items-center justify-center' data-step="1">
                    <div className='w-full max-w-[800px] mt-10 box-shadow p-4 md:p-10'>
                        <h3 className='text-2xl font-medium mb-5 text-center block'>Identität bestätigen</h3>

                        <div className='grid grid-cols-12 gap-5'> 
                            <div className='col-span-12'>
                                <label htmlFor="">Land</label>
                                <div className='relative'>
                                    <Combobox value={country3} onChange={setCountry3}>
                                        <Combobox.Button className="w-full flex items-center">

                                            <div className='px-2 bg-slate-200 flex items-center justify-center border h-11 border-r-0'>
                                                {country3?.country_code ? 
                                                    <Image
                                                        src={`https://flagcdn.com/${_.lowerCase(country3?.country_code)}.svg`}
                                                        alt={country3?.country}
                                                        width={32}
                                                        height={32}
                                                    />
                                                : <svg 
                                                        height="24" 
                                                        viewBox="0 0 24 24" 
                                                        width="20"
                                                        fill="#0621378e"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="m15 3a3 3 0 0 0 -3-3h-12v24h2v-11h8v1a3 3 0 0 0 3 3h11v-13h-9zm-13-1h10a1 1 0 0 1 1 1v8h-11zm20 4v9h-9a1 1 0 0 1 -1-1v-1h3v-7z"/>
                                                    </svg>
                                                }
                                            </div>

                                            <Combobox.Input
                                                displayValue={(country: Country) => country?.country}
                                                autoComplete='off' 
                                                onChange={(e) => setCountryFilter(e.target.value)}
                                                className="border border-rad-500 px-2 py-2 w-full outline-none shadow-none h-11"
                                            />
                                        </Combobox.Button>  
                                        <Combobox.Options className="absolute top-full left-0 bg-white shadow-lg z-50 w-full max-h-[300px] overflow-y-auto scrollbar">

                                            {_.size(countries) === 0 && (
                                                <div className='w-full py-2'>
                                                    <Spinner />
                                                </div>
                                            )}

                                            {
                                                _.map(_.filter(countries, q => q.country.toLowerCase().includes(_.lowerCase(countryFilter))), (country: Country, index: number) => (
                                                    <Combobox.Option
                                                        value={country}
                                                        key={country.country_code}
                                                        className={({active}) => `${active ? 'bg-primary-100 text-slate-700' : 'text-slate-700'} cursor-pointer px-3 py-2`}
                                                    >
                                                        {({selected}) => (
                                                            <div className='flex items-center space-x-2'>
                                                                <Image
                                                                    src={`https://flagcdn.com/${_.lowerCase(country.country_code)}.svg`}
                                                                    alt={country.country}
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                                <span className='flex-1'>{country.country}</span>

                                                                {selected && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='stroke-slate-600' width="16" height="10" viewBox="0 0 10 8" fill="none">
                                                                        <path d="M1.43512 3.93751L3.99512 6.49751L8.39062 1.50195" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            } 
                                        </Combobox.Options> 
                                    </Combobox> 
                                </div> 
                            </div>

                            <div className='col-span-12'>Verifizierungsmethode</div>

                            <div className='col-span-12'>
                                <RadioGroup value={cardType} onChange={setCardType}>
                                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                    
                                    <RadioGroup.Option
                                        value="mastercard"
                                    >
                                        {({checked})=>(
                                            <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                <div className='flex items-center gap-3'>
                                                    <Image src="/card/mastercard.png" alt='mastercard' width={24} height={10}/>
                                                    <span className='text-base'>Master Card</span>
                                                </div>

                                                {checked && 
                                                (
                                                    <div className="shrink-0 text-primary">
                                                        <CheckIcon className="h-6 w-6" check={checked} />
                                                    </div>
                                                )}
                                            </div>
                                        )}     
                                    </RadioGroup.Option>

                                    <RadioGroup.Option
                                        value="visa-card"
                                    >
                                        {({checked})=>(
                                            <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                <div className='flex items-center gap-3'>
                                                    <Image src="/card/visa.png" alt='visa' width={24} height={10}/>
                                                    <span className='text-base'>Visa Card</span>
                                                </div>

                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" check={checked} />
                                                </div>
                                            </div>
                                        )}     
                                    </RadioGroup.Option>
                                </RadioGroup>
                            </div>

                            

                            <div className='col-span-12'>
                                <Button 
                                    onClick={handleSubmit} 
                                    loading={loading}
                                    className='w-full py-2 px-3 text-center rounded-md'
                                    loadingClass='flex items-center justify-center space-x-2 text-white bg-primary-600 w-full py-2 rounded-md'
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           ): null}


            {/* 3rd step */}
            {step=== 5 ? (
                <div className='container'>
                <div className='flex items-center justify-center' data-step="1">
                    <div className='w-full max-w-[800px] mt-10 box-shadow p-10'>
                        <div className="flex flex-col gap-3">
                            <div className='mx-auto'>
                                <Image src="/OBJECTS.png" alt='visa' width={200} height={200}/>
                            </div>
                            <h3 className='text-2xl font-medium mb-5 text-center block'>Persönliche Informationen</h3>
                            <p className='text-center'>
                            Wir prüfen jetzt Ihre Daten auf Basis geldwäscherechtlicher Anforderungen. Dieser Prozess kann bis zu 60 Minuten in Anspruch nehmen. Nach erfolgreicher Prüfung, können Sie unseren Service ohne Einschränkungen nutzen.
                            </p>

                            <div className='flex mt-3'>
                                <Link href="/dashboard" className='w-full max-w-[507px] py-2 px-3 text-center rounded-md mx-auto bg-[#00D296]'>Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : null}
            
            
        </section>
    )
}

export default RegisterPage;


function CheckIcon(props:any) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} stroke={props.check ? '#00D296' : '#888'} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke={props.check ? '#00D296' : '#fff'}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }