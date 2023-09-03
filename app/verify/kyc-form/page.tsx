'use client';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useGlobalLoading } from '@/context/GlobalLoader';
import * as React from 'react';

const KYCValidation = () => {
    // form data
    const [frontImageData, setFrontImageData] = React.useState<File | null>(null);
    const [backImageData, setBackImageData] = React.useState<File | null>(null);
    const [faceImageData, setFaceImageData] = React.useState<File | null>(null);

    const { setGlobalLoading } = useGlobalLoading();
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    React.useEffect(() => {
        setGlobalLoading(false);
    }, []);


    // handle image upload
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>, 
        setState: React.Dispatch<React.SetStateAction<File | null>> 
    ) => {
        const file = e.target.files?.[0];
        if(!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setState(file);
       }
    }

    // handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!frontImageData || !backImageData || !faceImageData) return;

        // submit
        setSubmitting(true);

        // log
        console.log({
            frontImageData,
            backImageData,
            faceImageData
        });

        // timeout 
        setTimeout(() => {
            setSubmitting(false);
        }, 3000);

        // reset
        setFrontImageData(null);
        setBackImageData(null);
        setFaceImageData(null);
    }


    return(
        <section className='w-screen h-screen relative'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex flex-col items-center shadow-xl shadow-primary-200 rounded-lg overflow-hidden'>
                    <div className='w-96 h-fit py-10 bg-white flex flex-col items-center justify-center'>  

                        <div className='text-2xl font-bold mt-4'>KYC Validation</div>

                        <div className='text-sm text-center text-primary-500 mt-4 max-w-[270px]'>Your KYC is being validated. Please wait for a few minutes.</div>

                        {/* form */}

                        <form action="" className='mt-5 px-10 w-full' onSubmit={handleSubmit}>
                            {/* input grpup */}
                            <div className='mb-4'>
                                <label
                                    htmlFor='frontPartImage'  
                                    className='font-medium text-sm block flock mb-1 text-primary-500'
                                >
                                    Upload Front Part Image:
                                </label>
                                <div className='flex items-center border rounded-md overflow-hidden'>
                                    <div className='bg-primary-700 py-1.5 px-3 w-fit'>
                                        <Icon name="photo-id" className='w-5 fill-primary-100' />
                                    </div>
                                    <div className='relative w-3/4 px-2'>
                                        <span className='text-sm text-primary-400 line-clamp-1'>
                                            {frontImageData ? frontImageData.name : 'Upload here...'}
                                        </span>
                                        <input 
                                            type='file' 
                                            id='frontPartImage'
                                            onChange={(e) => handleImageChange(e, setFrontImageData)}
                                            className='absolute top-0 left-0 w-full h-full opacity-0 z-10' 
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='my-2 w-full'>
                            <label
                                    htmlFor='backPartImage'  
                                    className='font-medium text-sm block flock mb-1 text-primary-500'
                                >
                                    Upload Back Part Image:
                                </label>
                                <div className='flex items-center border rounded-md overflow-hidden'>
                                    <div className='bg-primary-700 py-1.5 px-3 w-fit'>
                                        <Icon name="photo-id" className='w-5 fill-primary-100' />
                                    </div>
                                    <div className='relative px-2 py-1.5 w-full'>
                                        <span className="block text-sm text-primary-400 line-clamp-1">
                                           {backImageData ? backImageData.name : 'Upload here...'}
                                        </span>
                                        <input 
                                            type='file' 
                                            id='backPartImage'
                                            onChange={(e) => handleImageChange(e, setBackImageData)}
                                            className='absolute top-0 left-0 w-full h-full opacity-0 z-10'
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* photo upload */}
                            <div className='mt-8'>
                                <h5 className='text-center text-primary-400 font-normal'>Face Image</h5>

                                <label
                                    htmlFor='faceImage'
                                    className='font-medium text-sm block flock mb-1 text-primary-500'
                                >
                                    Upload Face Image
                                </label>
                                <div className='flex items-center border rounded-md overflow-hidden'>
                                    <div className='bg-primary-700 py-1.5 px-3 w-fit'>
                                        <Icon name="photo-capture" className='w-5 fill-primary-100' />
                                    </div>

                                    <div className='relative px-2 py-1.5 w-full'>
                                        <span className='text-sm text-primary-400 line-clamp-1'>
                                            {faceImageData ? faceImageData.name : 'Upload here...'}
                                        </span>
                                        <input
                                            type='file'
                                            id='faceImage'
                                            onChange={(e) => handleImageChange(e, setFaceImageData)}
                                            className='absolute top-0 left-0 w-full h-full opacity-0 z-10'
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* button */}

                            <div className='mt-8'>
                                <Button
                                    type='submit'
                                    loading={submitting}
                                    className='w-full py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-md font-medium'
                                    loadingClass='flex justify-center w-full py-2 bg-primary-500 text-white rounded-md font-medium'
                                >
                                    Submit
                                </Button>
                            </div> 

                        </form>


                            
                         <div className='w-full flex justify-center mt-4'>
                            <div className='w-1/2 h-1 bg-gray-300 rounded-full'>
                                <div 
                                    className='h-1 bg-primary-500 rounded-full' 
                                    style={{width: '50%'}}
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KYCValidation;