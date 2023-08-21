import Link from 'next/link';
import * as React from 'react';
import Icon from '../ui/Icon';

type IconLinkProps = {
    href: string,
    icon: string | React.ReactNode,
    className?: string,
    iconClassName?: string,
}


// Icon Link
const IconLink = ({ href = "", iconClassName, icon, className, ...props }: IconLinkProps) => {
    return (
        <React.Fragment>
            <Link
                aria-label="Icon Link"
                href={href}
                className={` transition-all duration-500 ${className}`}
                {...props}
            >
                {typeof icon === 'string' ?
                    <Icon
                        className={`group-hover:stroke-black ${iconClassName}`}
                        name={icon}
                    /> : icon}
            </Link>
        </React.Fragment>
    )
}

export default IconLink;