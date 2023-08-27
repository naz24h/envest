'use client';
import * as React from 'react';
import {useDebounce} from 'react-use';
import Icon from '../Icon';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    className?: string;
    children?: React.ReactNode;
    onChange?: (value:any) => void;
    ref?: React.ForwardedRef<HTMLInputElement>;
    icon?: string;
    iconPosition?: 'left' | 'right';
}

const Input:React.FC<InputProps> = React.forwardRef(function Input(props, ref) {
    const [value, setValue] = React.useState(props.value);

    useDebounce(
        () => { props.onChange && props.onChange(value)  },
        100,
        [value]
    );

    const iconPosition = props.iconPosition ?? 'left';

    return(
        <div className='relative border border-rad-500 p-0'> 
            {props.icon && 
            <Icon 
                name={props.icon ?? 'wallet-check'} 
                className={`absolute ${iconPosition === 'left' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-[#0621378e]`}
            />}
            
            <input
                ref={ref}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className = {`py-3 px-3 rounded-sm bg-transparent text-[#0621378e] placeholder-[#0621378e] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent w-full`}
                {...props}
            />
        </div>
    )
});

export default Input;