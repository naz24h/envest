"use client";
import { getCountries } from '@/api/countries';
import { loginWithUsernameAndPassword } from '@/api/loginApi';
import { registerNewUser } from '@/api/registerApi';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Spinner from '@/components/ui/Spinner';
import Input from '@/components/ui/form/Input';
import PasswordInput from '@/components/ui/form/PasswordInput'; 
import { useGlobalLoading } from '@/context/GlobalLoader';
import { useUser } from '@/context/UserProvider';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useLocalStorage } from 'react-use';


type Country = {
    country: string,
    country_code: string,
    dial_code:string | number,
}


export default function Register(props: any){
    const [countries, setCountries] = React.useState([]) as any[];

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState("");
    const [country, setCountry] = React.useState<Country | null>(null);
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [agree, setAgree] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [countryFilter , setCountryFilter] = React.useState('')
    const [error, setError] = React.useState<{[key: string]: any} | null>(null);

    const [value, setValue] = useLocalStorage('xtx', '');
    const { setGlobalLoading } = useGlobalLoading(); 
    const route = useRouter();
    const {user, setUser} = useUser();

     
    // get countries
    React.useEffect(() => {
        const getCountriesData = async () => {
            const res = await getCountries();
            setCountries(res);
        } 
        getCountriesData();
    }, [])

    //  check user already logged in
    React.useEffect(() => {
        setGlobalLoading(true); 

        let token = value as string;
        token = token ? token.split('0|')[1] : ''; 

        if(token){
            route.push('/dashboard');
        }else{
            setGlobalLoading(false);
        }
    }, [])



    // validation
    const isValid = () => {
        let count = 0;
        const err = new Object() as any;

        if(!username){
            err['username'] = 'Username is required';
            count++;
        }

        // The username must only contain letters and numbers
        if(!/^[a-zA-Z0-9]+$/.test(username)){
            err['username'] = 'Username must only contain letters and numbers';
            count++;
        }

        if(!email){
            err['email'] = 'Email is required';
            count++;
        }
        
        // The email must be a valid email address
        if(!/\S+@\S+\.\S+/.test(email)){
            err['email'] = 'Email must be a valid email address';
            count++;
        }


        if(!country){
            err['country'] = 'Country is required';
            count++;
        }

        if(!mobile){
            err['mobile'] = 'Mobile is required';
            count++;
        }

         // The mobile must only contain numbers
        if(!/^[0-9]+$/.test(mobile)){
            err['mobile'] = 'Mobile must only contain numbers';
            count++;
        }

        if(!password){
            err['password'] = 'Password is required';
            count++;
        }

        // The password must be at least 8 characters
        if(password.length < 8){
            err['password'] = 'Password must be at least 8 characters';
            count++;
        }

        // if confirm password is empty
        if(!confirmPassword){
            err['confirmPassword'] = 'Confirm Password is required';
            count++;
        }

        // if confirm password is not equal to password
        if(confirmPassword !== password){
            err['confirmPassword'] = 'Confirm Password must be equal to password';
            count++;
        }


        return count === 0 ? true : false;
    }
 
    
    
    // submit login system
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        
        const data = {
            username,
            email,
            country: country?.country,
            phone,
            password,
            confirm_password: confirmPassword,
            password_confirmation: confirmPassword, 
            mobile: Number(mobile),
            country_code: country?.country_code,
            mobile_code: country?.dial_code,
            agree
        }


        if(isValid()){
            const res = await registerNewUser(data);
            if(res?.status === 200){
                setValue(res?.data?.data?.access_token);
                setUser(res?.data?.data?.user);
                route.push('/dashboard');
            }
        } else {
            setError(error);
        }
    } 
    


    return (
        <div className='w-screen h-screen flex items-center justify-center'>  
            <div className='w-full max-w-[450px] shadow-lg p-5'>
                <div>
                    <h1 className='text-2xl font-bold text-center'>Register</h1>
                </div>
                <form action="" className='w-full'>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <label htmlFor='username' className='text-sm font-medium text-slate-500'> Username <sup className='text-red-500'>*</sup> </label>
                            <Input
                                type='text' 
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Username'
                                required
                            />

                            {error?.username && (
                                <p className='text-red-500 text-sm mt-1'>{error?.username}</p>
                            )}
                        </div>

                        {/* email */}
                        <div className="col-span-12">
                            <label htmlFor='email' className='text-sm font-medium text-slate-500'> Email <sup className='text-red-500'>*</sup> </label>
                            <Input
                                type='email' 
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                required
                            />

                            {error?.email && (
                                <p className='text-red-500 text-sm mt-1'>{error?.email}</p>
                            )}
                        </div>

                        {/* country */}
                        <div className="col-span-12">
                            <label htmlFor='country' className='text-sm font-medium text-slate-500'> Country <sup className='text-red-500'>*</sup> </label>
                            <div className='relative'>
                                <Combobox value={country} onChange={setCountry}>
                                    <Combobox.Button className="w-full flex items-center">

                                        <div className='px-2 bg-slate-200 flex items-center justify-center border h-11 border-r-0'>
                                            {country?.country_code ? 
                                                <Image
                                                    src={`https://flagcdn.com/${_.lowerCase(country.country_code)}.svg`}
                                                    alt={country?.country}
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

                                    {error?.country && (
                                        <p className='text-red-500 text-sm mt-1'>{error?.country}</p>
                                    )}

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

                        {/* Mobile */}
                        <div className="col-span-12">
                            <label htmlFor='mobile' className='text-sm font-medium text-slate-500'> Mobile <sup className='text-red-500'>*</sup> </label>
                            <div className='flex items-center w-full'>
                                <div className='py-2 px-2 bg-slate-200 border text-base font-medium text-slate-700'>
                                    +{country?.dial_code}
                                </div>
                                <Input
                                    type='text' 
                                    id='mobile'
                                    name='mobile'
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder='Mobile'
                                    required
                                    className='w-full py-2 flex-1 px-2'
                                />
                            </div>

                            {error?.mobile && (
                                <p className='text-red-500 text-sm mt-1'>{error?.mobile}</p>
                            )}
                        </div>                    

                        {/* Password */}
                        <div className="col-span-12">
                            <label htmlFor='Password' className='text-sm font-medium text-slate-500'> Password <sup className='text-red-500'>*</sup> </label>
                            <PasswordInput
                                type='password' 
                                id='password'
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                required
                            />

                            {error?.password && (
                                <p className='text-red-500 text-sm mt-1'>{error?.password}</p>
                            )}
                        </div>               
                        
                        {/* Confirm Password */}
                        <div className="col-span-12">
                            <label htmlFor='Confirm Password' className='text-sm font-medium text-slate-500'> Confirm Password <sup className='text-red-500'>*</sup> </label>
                            <PasswordInput
                                type='password' 
                                id='confirmPassword'
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm Password'
                                required
                            />

                            {error?.confirmPassword && (
                                <p className='text-red-500 text-sm mt-1'>{error?.confirmPassword}</p>
                            )}
                        </div> 

                        {/* Agree */}
                        <div className="col-span-12">
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id='agree'
                                    name="agree"
                                    value={agree.toString()}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className='mr-2'
                                />
                                <label htmlFor='agree' className='text-sm font-medium text-slate-500'> I agree to the <a href="#" className='text-primary-600 hover:text-primary-700'>Terms and Conditions</a> </label>
                            </div>
                            
                        </div>              

                        {/* button */}
                        <div className="col-span-12">
                            <Button
                                type='button'
                                onClick={handleSubmit}
                                className='w-full py-2 rounded-sm bg-primary-600 hover:bg-primary-700 text-white font-medium'
                            >
                                Register
                            </Button>
                        </div>

                        {/* login */}
                        <div className="col-span-12">
                            <p className='text-center text-sm text-slate-500'>Already have an account? <Link href="/login" className='text-primary-600 hover:text-primary-700'>Login</Link></p>
                        </div>
                    </div> 
                </form>  
            </div>
        </div>
    )

} 