import Input from '@/components/ui/form/Input'
import React from 'react'

const NewTicket = () => {
    return (
        <div className="container py-20">
            <div className="relative flex items-center justify-center">
                <div className="max-w-[800px] w-full h-full shadow-xl shadow-primary-100 p-8 rounded-xl">
                    <form action="" className='w-full'>
                        <div className='grid grid-cols-12 gap-5'>
                            <div className='col-span-6'>
                                <label htmlFor="name">Name</label>
                                <Input
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>


                            <div className='col-span-6'>
                                <label htmlFor="email">Email</label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            {/* subject */}
                            <div className='col-span-12'>
                                <label htmlFor="subject">Subject</label>
                                <Input
                                    type='subject'
                                    id='subject'
                                    name='subject'
                                    className='py-2 px-3 w-full border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTicket