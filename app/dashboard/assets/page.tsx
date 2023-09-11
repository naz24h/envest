'use client';
import AktienTable from "@/components/assets/Aktien/AktienTable";
import AnleihenTable from "@/components/assets/Anleihen/AnleihenTable";
import Icon from "@/components/ui/Icon";
import { Tab } from "@headlessui/react";


const AssetsPage = () => {
    return(
        <section>
            <div className='container py-3'> 
               <Tab.Group defaultIndex={0}>
                    <Tab.List className='flex flex-wrap items-center gap-10 border border-transparent border-b-[#E7EEF0]'>
                        <h3 className='font-medium text-2xl flex items-center gap-3 mr-auto'>
                            <Icon name='single-line' className='w-6 h-6' />
                            <span>Assets</span>
                        </h3>
                       <div className="w-screen overflow-x-auto md:w-fit scrollbar-hidden">
                            <div className="flex items-center gap-10">
                                    {/* <Tab 
                                        className={({ selected }) => selected ? 
                                        'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 
                                        'border-2 border-transparent'
                                        }
                                    >
                                        Alle
                                    </Tab> */}
                                    
                                    <Tab 
                                        className={({ selected }) => selected ? 
                                        'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 
                                        'border-2 border-transparent'
                                        }
                                    >
                                        Aktien
                                    </Tab>
                                    
                                    <Tab 
                                        className={({ selected }) => selected ? 
                                        'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 
                                        'border-2 border-transparent'
                                        }
                                        
                                    >
                                    Anleihen 
                                    </Tab>
                                    
                                    {/* <Tab 
                                        className={({ selected }) => selected ? 
                                        'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 
                                        'border-2 border-transparent'
                                        }
                                    >
                                    Fonds 
                                    </Tab>
                                    
                                    <Tab 
                                        className={({ selected }) => selected ? 
                                        'border-2 border-transparent outline-none border-b-2 border-b-primary py-2 -mb-[1px]' : 
                                        'border-2 border-transparent'
                                        }
                                    >
                                    Rohstoffe 
                                    </Tab> */}
                            </div>
                       </div>
                        
                    </Tab.List>


                    <Tab.Panels className="py-8">
                        <Tab.Panel> <AktienTable /> </Tab.Panel> 
                        <Tab.Panel> <AnleihenTable /> </Tab.Panel> 
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </section>
    )
}

export default AssetsPage;