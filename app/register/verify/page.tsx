"use client";
import { getCountries } from '@/api/countries';
import { loginWithUsernameAndPassword } from '@/api/loginApi';
import { registerNewUser } from '@/api/registerApi';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Spinner from '@/components/ui/Spinner';
import Input from '@/components/ui/form/Input';
import PasswordInput from '@/components/ui/form/PasswordInput'; 
import { useUser } from '@/context/UserProvider';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import * as React from 'react';


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
    const [agree, setAgree] = React.useState(false)

    const [countryFilter , setCountryFilter] = React.useState('')
    const [error, setError] = React.useState<{[key: string]: any} | null>(null);


    const {user, setUser} = useUser();
     
    // ger countries
    React.useEffect(() => {
        const getCountriesData = async () => {
            const res = await getCountries();
            setCountries(res);
        } 
        getCountriesData();
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
            // const res = await registerNewUser(data);
            setUser(res?.data as any);
        } else {
            setError(error);
        }
    } 
    


    return (
        <div className='w-screen h-screen flex items-center justify-center'>  
            <div className='w-full max-w-[450px] shadow-lg p-5'>
                <div>
                    <h1 className='text-2xl font-bold text-center'>Verify</h1>

                    <p className='text-center text-sm text-slate-500 mt-2'>Please verify your account</p>
                </div>
                <form action="" className='w-full'>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <label htmlFor='username' className='text-sm font-medium text-slate-500'> 
                             Verify Code
                             <sup className='text-red-500'>*</sup> </label>
                            <Input
                                type='text' 
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Verify Code'
                                required
                            /> 
                        </div>  
                    </div> 

                    <Button className='px-3 py-2 rounded-sm float-right mt-3'>
                        Verify
                    </Button>
                </form>  
            </div>
        </div>
    )

} 