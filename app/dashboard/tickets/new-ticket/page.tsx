'use client'
import { submitNewTicket } from '@/api/ticketApi'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/form/Input'
import React, {useState} from 'react'
import { useLocalStorage } from 'react-use'
import {toast} from 'react-toastify'
 
const NewTicket = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([]) 

    // form data
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [priority, setPriority] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    // token
    const [token] = useLocalStorage('xtx');
    let _token = token as string;
    _token = _token && _token.split('0|')[1];
 
    // handle change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const {value} = e.target
        setState(value)
    }
     


    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        
        const data = {
            name,
            email,
            subject,
            priority,
            type,
            ticket_option: type,
            amount: Number(amount),
            message
        } 

        try{
             const res = await submitNewTicket(data, _token) 
             console.log(res);
            if(res?.status === 200) {   
                const message = res?.data?.success || res?.data?.message;
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        } 
    }

    return (
        <div className="container py-20">
            <div className="relative flex items-center justify-center">
                <div className="max-w-[800px] w-full h-full shadow-xl shadow-primary-100 p-8 rounded-xl">
                    <h1 className='text-2xl font-semibold'>New Ticket</h1>
                    <p className='text-sm text-gray-500 mb-5'>Please fill out the form below to open a new ticket.</p>

                    <form action="" className='w-full' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-12 gap-5'>
                            <div className='col-span-6'>
                                <label htmlFor="name">Name <sup>*</sup></label>
                                <Input
                                    type='text'
                                    id='name'
                                    name='name'
                                    required={true}
                                    value={name}
                                    onChange={(e) => handleChange(e, setName)}
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>


                            <div className='col-span-6'>
                                <label htmlFor="email">Email <sup>*</sup></label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    required={true}
                                    value={email}
                                    onChange={(e) => handleChange(e, setEmail)}
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            {/* subject */}
                            <div className='col-span-12'>
                                <label htmlFor="subject">Subject <sup>*</sup></label>
                                <Input
                                    type='subject'
                                    id='subject'
                                    name='subject'
                                    required={true}
                                    value={subject}
                                    onChange={(e) => handleChange(e, setSubject)}
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            <div className='col-span-4'>
                                <label htmlFor="priority">Priority <sup>*</sup></label>
                                <select
                                    name="priority"
                                    id="priority"
                                    required={true}
                                    value={priority}
                                    onChange={(e) => handleChange(e, setPriority)}
                                    className='py-2 px-3 w-full border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                >
                                    <option value="" disabled className='text-primary-300'>Select Priority</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>


                            <div className='col-span-4'>
                                <label htmlFor="type">Type <sup>*</sup></label>
                                <select
                                    name="type"
                                    id="type"
                                    required={true}
                                    value={type}
                                    onChange={(e) => handleChange(e, setType)}
                                    className='py-2 px-3 w-full border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                >
                                    <option value="" disabled className='text-primary-300'>Select Type</option>
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                    <option value="other">Other</option>
                                </select>
                            </div> 

                            <div className='col-span-4'>
                                <label htmlFor="amount">Amount <sup>*</sup></label>
                                <Input
                                    type='number'
                                    id='amount'
                                    name='amount'
                                    required={true}
                                    value={amount}
                                    onChange={(e) => handleChange(e, setAmount)}
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            <div className='col-span-12'>
                                <label htmlFor="message">Message <sup>*</sup></label>
                                <textarea
                                    name="message"
                                    id="message"
                                    required={true}
                                    value={message}
                                    onChange={(e) => handleChange(e, setMessage)}
                                    className='py-2 px-3 w-full border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                    rows={5}
                                    placeholder='Type your message here...'
                                ></textarea>
                            </div>   

                            <div className='col-span-12'>
                                <Button 
                                    type='submit'
                                    loading={loading}
                                    loadingClass='flex items-center bg-primary-500 text-white py-2 px-5 rounded-md'
                                    className='bg-primary-700 text-white py-2 px-5 rounded-md hover:bg-primary-800 transition duration-200'
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTicket