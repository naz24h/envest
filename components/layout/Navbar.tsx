import Icon from "../ui/Icon"
import IconLink from "./IconLink"
import Logo from "./Logo"
import Link from "next/link"

const Navbar = () => {
    return (

        <div className="container flex items-center justify-between gap-10">
            <Logo />

            <nav className="flex items-center gap-10 text-sm">
                <Link href="/">Home</Link>
                <Link href="/">Assets</Link>
                <Link href="/">Investment</Link>
                <Link href="/">Übersicht</Link>
            </nav>

            <nav className="flex items-center gap-10 text-sm">
                <IconLink
                    href="/"
                    icon="search"
                    className="w-10 h-10 rounded-full hover:bg-white group flex items-center justify-center"
                    iconClassName="group-hover:stroke-black"
                />

                <IconLink
                    href="/"
                    icon="bell"
                    className="w-10 h-10 rounded-full hover:bg-white group flex items-center justify-center"
                    iconClassName="group-hover:stroke-black"
                />


                <IconLink
                    href="/"
                    icon="settings"
                    className="w-10 h-10 rounded-full hover:bg-white group flex items-center justify-center"
                    iconClassName="group-hover:stroke-black"
                />


                <IconLink
                    href="/"
                    icon="user"
                    className="w-10 h-10 rounded-full hover:bg-white group flex items-center justify-center"
                    iconClassName="group-hover:stroke-black"
                />


                <IconLink
                    href="/"
                    icon="logout"
                    className="w-10 h-10 rounded-full hover:bg-white group flex items-center justify-center"
                    iconClassName="group-hover:stroke-black"
                />


            </nav>
        </div>
    )
}

export default Navbar