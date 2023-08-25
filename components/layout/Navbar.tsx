'use client'
import Icon from "../ui/Icon"
import IconButton from "../ui/IconButton"
import IconLink from "./IconLink"
import Logo from "./Logo"
import Link from "next/link"
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from "react"
import { useWindowScroll } from "react-use"

const Navbar = () => { 
    const scrolling = useWindowScroll(); 

    return (
        <div className={
                scrolling.y > 0 ? 
                'fixed top-0 left-0 w-full z-[999] shadow-lg bg-primary py-3 transition-all duration-300' : 
                'sticky top-0 left-0 w-full z-10 py-5 transition-all duration-300'
            }> 
            <div className="container flex items-center justify-between gap-10">
                <Logo /> 

                {/* menu link */}
                <Menu as="div" className="block md:hidden">
                    <Menu.Button className="border p-1.5 rounded-sm border-primary-700 hover:bg-primary-900/50">
                        <Icon name="menu" className="w-10 h-10" />
                    </Menu.Button> 
                    <Transition
                        as='div'
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute overflow-hidden right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                            <Menu.Item as="div">
                                <Link href="/" className="text-primary block px-3 py-1 w-full hover:bg-primary hover:text-primary-100 transition-colors duration-300 rounded-sm text-sm">Home</Link> 
                            </Menu.Item> 

                            <Menu.Item as="div">
                                <Link href="/" className="text-primary block px-3 py-1 w-full hover:bg-primary hover:text-primary-100 transition-colors duration-300 rounded-sm text-sm">Assets</Link> 
                            </Menu.Item> 

                            <Menu.Item as="div">
                                <Link href="/" className="text-primary block px-3 py-1 w-full hover:bg-primary hover:text-primary-100 transition-colors duration-300 rounded-sm text-sm">Investment</Link> 
                            </Menu.Item>  

                            <Menu.Item as="div">
                                <Link href="/" className="text-primary block px-3 py-1 w-full hover:bg-primary hover:text-primary-100 transition-colors duration-300 rounded-sm text-sm">Übersicht</Link> 
                            </Menu.Item> 


                            <div className="flex items-center justify-between pt-2 pb-1.5 px-3 ">
                                <IconLink
                                    href="/"
                                    icon="search"
                                    className="w-8 h-8 rounded-lg hover:bg-primary/10 group flex items-center justify-center"
                                    iconClassName="stroke-black w-3.5 h-3.5 group-hover:stroke-black"
                                />

                                <IconLink
                                    href="/"
                                    icon="bell"
                                    className="w-8 h-8 rounded-lg hover:bg-primary/10 group flex items-center justify-center"
                                    iconClassName="stroke-black w-3.5 h-3.5 group-hover:stroke-black"
                                />
                                
                                <IconLink
                                    href="/"
                                    icon="settings"
                                    className="w-8 h-8 rounded-lg hover:bg-primary/10 group flex items-center justify-center"
                                    iconClassName="stroke-black w-3.5 h-3.5 group-hover:stroke-black"
                                />
                                <IconLink
                                    href="/"
                                    icon="logout"
                                    className="w-8 h-8 rounded-lg hover:bg-primary/10 group flex items-center justify-center"
                                    iconClassName="stroke-black w-3.5 h-3.5 group-hover:stroke-black"
                                />
                            </div>
                        </Menu.Items>
                    </Transition> 
                </Menu> 



                {/* nav links */}
                <nav className="hidden md:flex items-center gap-3 lg:gap-10 text-sm">
                    <Link href="/">Home</Link>
                    <Link href="/">Assets</Link>
                    <Link href="/">Investment</Link>
                    <Link href="/">Übersicht</Link>
                </nav>

                <nav className="hidden md:flex items-center gap-3 lg:gap-10 text-sm">
                    <IconLink
                        href="/"
                        icon="search"
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full hover:bg-white group flex items-center justify-center"
                        iconClassName="w-4 h-4 lg:w-6 lg:h-6 stroke-white group-hover:stroke-black"
                    />

                    <IconLink
                        href="/"
                        icon="bell"
                        className="w-8 h-8 lg:w-10 lg:h-10  rounded-full hover:bg-white group flex items-center justify-center"
                        iconClassName="w-4 h-4 lg:w-6 lg:h-6 stroke-white group-hover:stroke-black"
                    />


                    <IconLink
                        href="/"
                        icon="settings"
                        className="w-8 h-8 lg:w-10 lg:h-10  rounded-full hover:bg-white group flex items-center justify-center"
                        iconClassName="w-4 h-4 lg:w-6 lg:h-6 stroke-white group-hover:stroke-black"
                    />


                    <IconLink
                        href="/"
                        icon="user"
                        className="w-8 h-8 lg:w-10 lg:h-10  rounded-full hover:bg-white group flex items-center justify-center"
                        iconClassName="w-4 h-4 lg:w-6 lg:h-6 stroke-white group-hover:stroke-black"
                    />


                    <IconLink
                        href="/"
                        icon="logout"
                        className="w-8 h-8 lg:w-10 lg:h-10  rounded-full hover:bg-white group flex items-center justify-center"
                        iconClassName="w-4 h-4 lg:w-6 lg:h-6 stroke-white group-hover:stroke-black"
                    />
                </nav>
            </div>
        </div>
    )
}

export default Navbar