import * as React from 'react';
import  Icon  from './Icon';
import  Button  from './Button'


type IconButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon: string;
    className?: string;
    children?: React.ReactNode;
    iconclassname?: string;
    disabled?: boolean;
    loading?: boolean;
    href?: string;
    target?: string;
    variant?: 'primary';
    rel?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
    ref?: React.ForwardedRef<HTMLButtonElement>;
}


const IconButton:React.FC<IconButtonProps> = React.forwardRef(function IconButton(props, ref) {
    return(
        <Button
            ref={ref}
            variant='primary'
            className={`p-2.5 rounded-lg ${props.className ?? ''}`}
            {...props}
        >
            <Icon 
                name={props.icon}
                className={props.iconclassname ?? ''} 
            />
        </Button>
    )
})

export default IconButton;