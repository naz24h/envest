'use client';
import * as React from 'react';
import Icon from '../Icon';

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    className?: string;
    children?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref?: React.ForwardedRef<HTMLInputElement>;
    icon?: string;
    iconPosition?: 'left' | 'right';
}

const Input:React.FC<InputProps> = React.forwardRef(function Input(props, ref) { 
     
    const iconPosition = props.iconPosition ?? 'left';

    return(
        <div className='relative border border-rad-500 p-0 w-full'> 
            {props.icon && 
            <Icon 
                name={props.icon ?? 'wallet-check'} 
                className={`absolute ${iconPosition === 'left' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-[#0621378e]`}
            />}
            
            <input
                ref={ref}
                value={props?.value}
                onChange={props.onChange}
                className = {`py-3 px-3 rounded-sm bg-transparent text-[#0621378e] placeholder-[#0621378e] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent w-full`}
                {...props}
            />
        </div>
    )
});

export default Input;