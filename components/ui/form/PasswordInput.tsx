import Input, {InputProps} from './Input';
import * as React from 'react';


const PasswordInput:React.FC<InputProps> = React.forwardRef(function PasswordInput(props, ref) {
    const [value, setValue] = React.useState(props.value);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const toggleShow = () => setShow(!show);

    return(
       <div className='relative'>
            <Input 
                ref={ref}
                type={show ? 'text' : 'password'}
                {...props}
            />

            <div className='flex justify-end'>
                <button 
                    type='button'
                    onClick={toggleShow} 
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-primary-600 py-1 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent'
                >
                    {show ? 'Hide' : 'Show'}
                </button>
            </div>
       </div>
    )
});

export default PasswordInput;