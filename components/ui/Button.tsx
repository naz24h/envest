import * as React from 'react';


export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link' | 'text';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    href?: string;
    target?: string;
    rel?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
    ref?: React.ForwardedRef<HTMLButtonElement>;
}



const Button:React.FC<ButtonProps> = React.forwardRef( function Button( {
    children, 
    onClick,
    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md font-medium",
    ...props
}, ref){

    const variant = () => {
        switch (props.variant) {
            case 'primary':
                return 'bg-[#00D296] text-primary hover:bg-[#00D296] hover:bg-opacity-80';
            default:
                return 'bg-[#00D296] text-primary hover:bg-primary-dark';
        }
    }


    const classes = `${variant()} ${className}`

    return (
        <button
            ref={ref}
            onClick={onClick}
            className={classes}
            {...props}
        > 
            {children}
        </button>
    )
})

export default Button;