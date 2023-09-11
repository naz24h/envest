import * as React from 'react';
import Icon from '../ui/Icon';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import { useCopyToClipboard } from 'react-use';


const EinzahlenButton = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const [state, copyToClipboard] = useCopyToClipboard();

    return(
        <React.Fragment>
            <Button
                variant='primary'
                onClick={() => setIsModalOpen(true)}
                className='mt-3 lg:mt-12 text-sm lg:text-[16px] text-primary bg-[#E8EFF0] hover:bg-[#d0d7d7] w-fit pt-2 pb-2 px-3 rounded-md flex items-center'
            >
                <Icon name="arrow-right" className='stroke-primary' />
                <span className='ml-2'> Einzahlen</span>
            </Button>

            <div className='absolute'>
                <Transition appear show={isModalOpen} as='div'>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 text-gray-900 font-bold"
                                        >
                                           Auszahlen 

                                            <IconButton
                                                icon="x"
                                                onClick={() => setIsModalOpen(false)}
                                                className='px-0 py-0 w-8 h-8 flex items-center justify-center bg-[#F3F3F3] text-[#123857] rounded-full absolute top-3 right-3 hover:bg-primary/20'
                                                iconclassname='w-4 h-4 stroke-primary'
                                            />
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                            Zahlen Sie sich Ihren gewünschten Betrag aus.
                                            </p>
                                        </div>

                                        <div className="mt-3 flex flex-col gap-3">
                                            <div className='px-3 py-3 bg-[#F3F3F3]'> 
                                                <h5 className='uppercase font-bold text-primary'>Max Mustermann</h5>
                                            </div>

                                            <div className='relative px-3 py-3 bg-[#F3F3F3]'>
                                                <label htmlFor="kontoinhaber" className="block text-sm font-medium text-gray-700">
                                                    IBAN
                                                </label>
                                                <h5 className='uppercase font-bold text-primary'>
                                                    DE88 1011 0600 8659 3803 00
                                                </h5>

                                                {!isTooltipOpen &&
                                                    <IconButton
                                                        onClick={() => {
                                                            copyToClipboard('DE88 1011 0600 8659 3803 00');
                                                            setIsTooltipOpen(true);
                                                        }}
                                                        icon='copy'
                                                        className='absolute top-1/2 right-3 -translate-y-1/2 w-fit h-fit p-1 rounded-md bg-transparent group'
                                                        iconclassname='w-6 h-6 stroke-[#00D296] group-hover:stroke-white'
                                                    />
                                                }

                                                {isTooltipOpen && state.value &&
                                                    <span>
                                                        <Icon
                                                            name="check"
                                                            className='absolute top-1/2 right-3 -translate-y-1/2 p-0 bg-transparent w-4 h-4 fill-emerald-500'
                                                        />
                                                    </span>
                                                }
                                            </div>

                                            <div className='px-3 py-3 bg-[#F3F3F3]'>
                                                <label htmlFor="BIC" className="block text-sm font-medium text-gray-700">
                                                    BIC
                                                </label>
                                                <h5 className='uppercase font-bold text-primary'>
                                                    JBKJHJKGXXX
                                                </h5>
                                            </div>

                                            <div className='px-3 py-3 bg-[#F3F3F3]'>
                                                <label htmlFor="BIC" className="block text-sm font-medium text-gray-700">
                                                    Verfügbar
                                                </label>
                                                <h5 className='uppercase font-bold text-primary'>
                                                    1.000 €
                                                </h5>
                                            </div>

                                            
                                            <div className='px-3 py-3 bg-[#F3F3F3]'>
                                                <label htmlFor="BIC" className="block text-sm font-medium text-gray-700">
                                                    Auszahlen
                                                </label>
                                                <h5 className='uppercase font-bold text-primary'>
                                                    0,00 €
                                                </h5>
                                            </div>

                                            <div className='flex items-center gap-4'>
                                                <Button className='w-full py-2 bg-[#E8EFF0] hover:bg-[#cbd4d6] rounded-md'> ⊘ Decline Deposit</Button>
                                                <Button variant='primary' className='flex items-center justify-center gap-3 text-center w-full py-2 rounded-md'> 
                                                    <Icon name='like' className='w-5 h-5' />  Approve deposit
                                                </Button> 
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </React.Fragment>
    )
}

export default EinzahlenButton;