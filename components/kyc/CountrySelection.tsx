import { getCountries } from '@/api/countries';
import { Listbox } from '@headlessui/react';
import _ from 'lodash';
import Image from 'next/image';
import * as React from 'react';
import Icon from '../ui/Icon';


export type Country = {
    country: string,
    country_code: string,
    dial_code: string | number,
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


    return (
        <div className='relative mb-10'>
            <Listbox value={value} onChange={onChange}>
                <Listbox.Button className="flex items-center w-full text-left">
                    <div className='bg-slate-200 w-14 py-[15px] h-[46px] border border-r-0 grid place-items-center'>
                        {
                            value.country_code ?
                                <Image
                                    src={`https://flagcdn.com/${_.lowerCase(value?.country_code)}.svg`}
                                    width={24}
                                    height={24}
                                    alt={value?.country}
                                /> :
                                <Icon name='flag' className='fill-slate-500 w-4 h-3.5' />
                        }
                    </div>
                    <div className='flex items-center py-[10px] px-4 border border-l-0 w-full'>
                        <span className='line-clamp-1'>{value.country ? value.country : 'Select Country'}</span>

                        <svg className="w-5 h-5 ml-auto -mr-1 fill-current" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L10 11.5858L13.2929 8.29289C13.6834 7.90237 14.3166 7.90237 14.7071 8.29289C15.0976 8.68342 15.0976 9.31658 14.7071 9.70711L10.7071 13.7071Z"
                            />
                        </svg>
                    </div>


                </Listbox.Button>
                <Listbox.Options className="max-h-96 overflow-auto shadow-lg border border-slate-200">
                    {countries && countries.map((country: any) => (
                        <Listbox.Option
                            key={country.country}
                            value={country}
                            onClick={() => onChange(country)}
                        >
                            {({ selected }) => (
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