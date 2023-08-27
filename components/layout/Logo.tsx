import * as React from 'react'
import Image from 'next/image';

const Logo = () => {
    return (
        <div className='relative w-[126px] h-[30px]'  >
            <>
                <Image
                    src="/site/logo.png"
                    alt="envest" 
                    quality={70}
                    priority={true}
                    fill={true}
                />
            </>
        </div>
    )
}

export default Logo