import * as React from 'react';
import Link from 'next/link';

type LinkButtonProps = React.RefAttributes<HTMLAnchorElement> & {
    href?: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
}

const LinkButton: React.FC<LinkButtonProps> = React.forwardRef(
    function LinkButton({ href = "/", children, className, ...props }, ref) {

        let variantClass = () => {
            switch (props.variant) {
                case 'primary':
                    return 'bg-[#00D296] text-primary hover:bg-primary-dark';
                case 'secondary':
                    return 'bg-secondary text-white hover:bg-secondary-dark';
                case 'danger':
                    return 'bg-danger text-white hover:bg-danger-dark';
                case 'success':
                    return 'bg-[]';
                case 'warning':
                    return 'bg-warning text-white hover:bg-warning-dark';
                case 'info':
                    return 'bg-info text-white hover:bg-info-dark';
                case 'light':
                    return 'bg-light text-white hover:bg-light-dark';
                case 'dark':
                    return 'bg-dark text-white hover:bg-dark-dark';
            }
        }


        const classes = `inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md font-medium ${variantClass()} transition duration-300 ease-in-out ${className ?? ''}`;


        return (
            <Link ref={ref} href={href} className={classes} {...props}>
                {children}
            </Link>
        )
    })

export default LinkButton;