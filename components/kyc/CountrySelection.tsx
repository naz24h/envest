import { getCountries } from '@/api/countries';
import { Listbox } from '@headlessui/react';
import _ from 'lodash';
import Image from 'next/image';
import * as React from 'react';


export type Country = {
    country: string,
    country_code: string,
    dial_code:string | number,
}

export const initialCountry = {
    country: '',
    country_code: '',
    dial_code: '',
}


const CountrySelection = ({
    value,
    onChange
}: {
    value: Country;
    onChange: (value: Country) => void;
}) => {
    
    const [countries, setCountries] = React.useState<Country[]>([initialCountry]);

    // get countries
    React.useEffect(() => {
        const getCountriesData = async () => {
            const res = await getCountries(); 
            setCountries([...res]);

        } 
        getCountriesData(); 
    }, []);


    return(
        <div className='relative mb-20'>
            <Listbox value={value} onChange={onChange}>
                <Listbox.Button className="flex items-center w-full text-left">
                    <div className='bg-slate-200 w-14 py-3 h-full border border-r-0 grid place-items-center'>
                        <Image
                            src={`https://flagcdn.com/${_.lowerCase(value?.country_code)}.svg`}
                            width={20}
                            height={20}
                            alt={value?.country}
                        />
                    </div>
                    <div className='py-[7px] px-4 border border-l-0 w-full'>
                        {value.country ? value.country : 'Select Country'}
                    </div>
                </Listbox.Button>
                <Listbox.Options className="max-h-96 overflow-auto shadow-lg border border-slate-200">
                    {countries && countries.map((country: any) => (
                        <Listbox.Option
                            key={country.country}
                            value={country}
                            onClick={() => onChange(country)} 
                        >
                            {({selected}) => (
                                <div className={`flex items-center space-x-2 py-1 px-3 border-b border-dashed hover:bg-slate-100 cursor-default ${selected ? 'bg-slate-200' : ''}`} >
                                    <Image 
                                        src={`https://flagcdn.com/${_.lowerCase(country?.country_code)}.svg`}
                                        width={20}
                                        height={20}
                                        alt={country?.country}
                                    />

                                    <span className={`ml-2 ${selected ? 'font-semibold' : ''}`}>
                                        {country?.country}
                                    </span>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default CountrySelection;