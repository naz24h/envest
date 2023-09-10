'use client';
import { kycVerification } from '@/api/KYCVerification';
import CountrySelection, { Country, initialCountry } from '@/components/kyc/CountrySelection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/form/Input';
import { useUser } from '@/context/UserProvider';
import { RadioGroup } from '@headlessui/react';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useLocalStorage } from 'react-use';


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
    const { user } = useUser();
    const [step, setStep] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(false);
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

    const [previewImage, setPreviewImage] = React.useState<string | ArrayBuffer | null>(null);
    
    const [token] = useLocalStorage('xtx') 
    let _token = token as string;
    _token = _token?.split('0|')[1];

    React.useEffect(() => {
        if(!user) return;
        setFirstName(user?.firstname);
        setLastName(user?.lastname);
        setEmail(user?.email);
        setStreet(user?.address?.state);
        setCity(user?.address?.city);
        setZipCode(user?.address?.zip);
    }, [user])

    // handle image change
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
    

    // handle form submit
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        
        const res = await kycVerification(fd, _token);


        if(res?.status === 200) {
            setLoading(false);
            setStep(5);
            return;
        } 
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
                                            <RadioGroup.Option value="reisepass">
                                                {({ checked }) => (
                                                <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                    <div className=''>
                                                        Reisepass
                                                    </div> 
                                                    
                                                    <div className="shrink-0 text-primary"> 
                                                        <span className='grid place-items-center w-6 h-6 border rounded-full text-green-500'> 
                                                            {checked && '✔'}
                                                        </span> 
                                                    </div>
                                                </div>
                                                )}
                                            </RadioGroup.Option>

                                            <RadioGroup.Option value="personalausweis">
                                                {({ checked }) => (
                                                <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                    <div className=''>
                                                        Personalausweis
                                                    </div> 
                                                    
                                                    <div className="shrink-0 text-primary"> 
                                                        <span className='grid place-items-center w-6 h-6 border rounded-full text-green-500'> 
                                                            {checked && '✔'}
                                                        </span> 
                                                    </div>
                                                </div>
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

                {step === 3 && (
                    <React.Fragment>
                        <div className='py-10'>
                            <div className="grid grid-cols-12 gap-5 box-shadow p-10 w-[80vw] max-w-[580px]">
                                <div className='col-span-12'>
                                    <h4 className='text-center mb-3 font-medium'>
                                        Ausweis hochladen
                                    </h4>
                                </div> 

                                <div className='col-span-12'>
                                    <div className='w-96 h-60 mx-auto relative bg-white'>
                                        <div className='absolute -top-0.5 -left-0.5 w-8 h-8 bg-[#D9D9D9] -z-10' />
                                        <div className='absolute -top-0.5 -right-0.5 w-8 h-8 bg-[#D9D9D9] -z-10' />
                                        <div className='absolute -bottom-0.5 -left-0.5 w-8 h-8 bg-[#D9D9D9] -z-10' />
                                        <div className='absolute -bottom-0.5 -right-0.5 w-8 h-8 bg-[#D9D9D9] -z-10' />

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
                                                    <div className='bg-white rounded-md p-2 my-3'>
                                                        <Image
                                                            src={previewImage as string}
                                                            alt="image-upload"
                                                            width={350}
                                                            height={100}
                                                            loading='lazy'
                                                            className='rounded-md object-contain'
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
                                    
                                </div>

                                <div className="col-span-12 flex">
                                    <Button 
                                        type='button' 
                                        onClick={() => setStep(prev => prev + 1)} 
                                        className="w-full max-w-[384px] mx-auto py-2 px-4 rounded-md text-white hover:opacity-75 "
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {step === 4 && (
                    <React.Fragment>
                        <div className='py-10'>
                            <div className="grid grid-cols-12 gap-5 box-shadow p-10 w-[80vw] max-w-[580px]">
                                <div className='col-span-12'>
                                    <h4 className='text-center mb-3 font-medium'>Identität bestätigen</h4>
                                </div>

                                
                                <div className='col-span-12'>
                                    <label htmlFor="">Country</label>

                                    {/* country */}
                                    <CountrySelection
                                        value={country3}
                                        onChange={setCountry3}
                                    />
                                </div>

                                <div className='col-span-12'> 
                                    <RadioGroup value={cardType} onChange={setCardType}>
                                        <RadioGroup.Label>Card Type</RadioGroup.Label>
                                            <RadioGroup.Option value="mastercard">
                                                {({ checked }) => (
                                                <div className='flex items-center gap-3 py-2 px-3 border justify-between mb-3'>
                                                     <Image 
                                                        src="/card/mastercard.png" 
                                                        alt='mastercard' 
                                                        width={24} 
                                                        height={10}
                                                     />

                                                    <div className='mr-auto'>
                                                        Mastercard
                                                    </div> 
                                                    
                                                    <div className="shrink-0 text-primary"> 
                                                        <span className='grid place-items-center w-6 h-6 border rounded-full text-green-500'> 
                                                            {checked && '✔'}
                                                        </span> 
                                                    </div>
                                                </div>
                                                )}
                                            </RadioGroup.Option>

                                            <RadioGroup.Option value="visa">
                                                {({ checked }) => (
                                                <div className='flex items-center gap-3 py-2 px-3 border justify-between mb-3'>
                                                     <Image 
                                                        src="/card/visa.png" 
                                                        alt='visa' 
                                                        width={24} 
                                                        height={10}
                                                     />

                                                    <div className='mr-auto'>
                                                        Visa Card
                                                    </div> 
                                                    
                                                    <div className="shrink-0 text-primary"> 
                                                        <span className='grid place-items-center w-6 h-6 border rounded-full text-green-500'> 
                                                            {checked && '✔'}
                                                        </span> 
                                                    </div>
                                                </div>
                                                )}
                                            </RadioGroup.Option>
                                        
                                        </RadioGroup>
                                </div> 

                                <div className="col-span-12 flex">
                                    <Button 
                                        type='button' 
                                        onClick={handleSubmit} 
                                        className="w-full ml-auto py-2 px-4 rounded-md text-white hover:opacity-75"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

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

            </div>
        </section>
    )
};

export default KYCValidation;


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