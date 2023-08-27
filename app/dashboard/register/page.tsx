'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { Listbox, RadioGroup } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {
    const [step, setStep] = React.useState(1);
    return(
        <section>
            {/* 1st step */}
            {
                step === 1 ? (
                    <div className='container'>
                        <div className='flex items-center justify-center' data-step="1">
                            <div className='w-full max-w-[800px] mt-10 box-shadow p-10'>
                                <h3 className='text-2xl font-medium mb-5 text-center block'>Persönliche Informationen</h3>

                                <div className='grid grid-cols-12 gap-5'>
                                    <div className='col-span-12 md:col-span-6'>
                                        <label htmlFor="">Vorname</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>


                                    <div className='col-span-12 md:col-span-6'>
                                        <label htmlFor="">Nachname</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>
                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">Straße + Hausnummer</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>

                                    
                                    <div className='col-span-12 md:col-span-4'>
                                        <label htmlFor="">Nachname</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>

                                    
                                    <div className='col-span-12 md:col-span-8'>
                                        <label htmlFor="">Nachname</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>

                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">E-Mail</label>
                                        <Input
                                            type='text' 
                                        />
                                    </div>

                                    
                                    <div className='col-span-12'>
                                        <label htmlFor="">Land</label>
                                        <div className='relative'>
                                            <Listbox>
                                                <Listbox.Button className='w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm'>
                                                    <span className='block truncate'>United States</span>
                                                    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                        <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                            <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                        </svg>
                                                    </span>
                                                </Listbox.Button>
                                                <Listbox.Options className='absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                                    <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='United States'>
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>United States</span>
                                                                {selected ? (
                                                                    <span className={`${active ? 'text-primary' : 'text-primary'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                                        <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                                            <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                                        </svg>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                    <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='Canada'>
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>Canada</span> 
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                </Listbox.Options>
                                            </Listbox>
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
                            <div className='w-full max-w-[800px] mt-10 box-shadow p-10'>
                                <h3 className='text-2xl font-medium mb-5 text-center block'>Identität bestätigen</h3>

                                <div className='grid grid-cols-12 gap-5'>

                                    <div className='col-span-12'>
                                        <label htmlFor="">Land</label>
                                        <div className='relative'>
                                            <Listbox>
                                                <Listbox.Button className='w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm'>
                                                    <span className='block truncate'>United States</span>
                                                    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                        <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                            <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                        </svg>
                                                    </span>
                                                </Listbox.Button>
                                                <Listbox.Options className='absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                                    <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='United States'>
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>United States</span>
                                                                {selected ? (
                                                                    <span className={`${active ? 'text-primary' : 'text-primary'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                                        <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                                            <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                                        </svg>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                    <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='Canada'>
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>Canada</span> 
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                </Listbox.Options>
                                            </Listbox>
                                        </div> 
                                    </div>

                                    <div className='col-span-12'>Verifizierungsmethode</div>

                                    <div className='col-span-12'>
                                        <RadioGroup>
                                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                            
                                            <RadioGroup.Option
                                                value="1"
                                            >
                                                {({checked})=>(
                                                    <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                        <div className=''>
                                                            Reisepass
                                                        </div>

                                                        {true && (
                                                                <div className="shrink-0 text-primary">
                                                                    <CheckIcon className="h-6 w-6" check={true} />
                                                                </div>
                                                            )}
                                                    </div>
                                                )}     
                                            </RadioGroup.Option>

                                            <RadioGroup.Option
                                                value="1"
                                            >
                                                {({checked})=>(
                                                    <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                        <div className=''>
                                                            Personalausweis
                                                        </div>

                                                        <div className="shrink-0 text-white">
                                                            <CheckIcon className="h-6 w-6" check={false} />
                                                        </div>
                                                    </div>
                                                )}     
                                            </RadioGroup.Option>
                                        </RadioGroup>
                                    </div>

                                    

                                    <div className='col-span-12'>
                                        <Button onClick={() => setStep(3)} className='w-full py-2 px-3 text-center rounded-md'>Next</Button>
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
                    <div className='w-full max-w-[800px] mt-10 box-shadow p-10'>
                        <h3 className='text-2xl font-medium mb-5 text-center block'>Persönliche Informationen</h3>
 
                        <div className='flex items-center justify-center w-full'>
                            <div className='w-[450px]'>
                                <div className='text-lg mb-5'>Ausweis hochladen</div> 
                                    {/* uplaod image */}
                                    <div className="relative w-full h-[350px] bg-white mb-10 hover:bg-slate-50">
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

                                        <input type='file' className='absolute top-0 left-0 w-full h-full z-100 opacity-0' />
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
                    <div className='w-full max-w-[800px] mt-10 box-shadow p-10'>
                        <h3 className='text-2xl font-medium mb-5 text-center block'>Identität bestätigen</h3>

                        <div className='grid grid-cols-12 gap-5'>

                            <div className='col-span-12'>
                                <label htmlFor="">Land</label>
                                <div className='relative'>
                                    <Listbox>
                                        <Listbox.Button className='w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm'>
                                            <div className="flex items-center gap-3">
                                                {/* flat */}
                                                <Image src="/flag/usa.png" alt="usa" width={20} height={16} loading='lazy' />
                                                <span className='block truncate'>United States</span> 
                                            </div>
                                            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                    <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                </svg>
                                            </span>
                                        </Listbox.Button>
                                        <Listbox.Options className='absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                            <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='United States'>
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>United States</span>
                                                        {selected ? (
                                                            <span className={`${active ? 'text-primary' : 'text-primary'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                                <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                                    <path fillRule='evenodd' d='M6 8l4 4 4-4H6z' />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                            <Listbox.Option className={({ active }) => `${active ? 'text-primary bg-primary-light' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`} value='Canada'>
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>Canada</span> 
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        </Listbox.Options>
                                    </Listbox>
                                </div> 
                            </div>

                            <div className='col-span-12'>Verifizierungsmethode</div>

                            <div className='col-span-12'>
                                <RadioGroup>
                                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                    
                                    <RadioGroup.Option
                                        value="1"
                                    >
                                        {({checked})=>(
                                            <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                <div className='flex items-center gap-3'>
                                                    <Image src="/card/mastercard.png" alt='mastercard' width={24} height={10}/>
                                                    <span className='text-base'>Master Card</span>
                                                </div>

                                                {true && (
                                                        <div className="shrink-0 text-primary">
                                                            <CheckIcon className="h-6 w-6" check={true} />
                                                        </div>
                                                    )}
                                            </div>
                                        )}     
                                    </RadioGroup.Option>

                                    <RadioGroup.Option
                                        value="1"
                                    >
                                        {({checked})=>(
                                            <div className='flex items-center py-2 px-3 border justify-between mb-3'>
                                                <div className='flex items-center gap-3'>
                                                    <Image src="/card/visa.png" alt='visa' width={24} height={10}/>
                                                    <span className='text-base'>Visa Card</span>
                                                </div>

                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" check={false} />
                                                </div>
                                            </div>
                                        )}     
                                    </RadioGroup.Option>
                                </RadioGroup>
                            </div>

                            

                            <div className='col-span-12'>
                                <Button onClick={()=>setStep(5)} className='w-full py-2 px-3 text-center rounded-md'>Next</Button>
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