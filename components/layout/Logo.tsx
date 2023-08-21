import * as React from 'react'
import Image from 'next/image';

const Logo = () => {
    return (
        <Image
            src="/site/logo.png"
            alt="envest"
            width={126}
            height={30}
            quality={70}
            priority={true}
            style={{ width: '126px', height: '30px' }}
        />
    )
}

export default Logo