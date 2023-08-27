import * as React from 'react'
import Icon from '../Icon'

interface BadgeProps{
    icon?: string | React.ReactNode,
    className?: string,
    children?: React.ReactNode,
    outline?: boolean,
}

const Badge:React.FC<BadgeProps> = ({
    icon,
    className,
    children,
    outline
}) =>{ 


  
    return(
        <div >
            {icon && typeof icon === 'string' ? <Icon name={icon} /> : icon }
            {children}
        </div>
    )
}

export default Badge;