


export default function Icon({ name, className = '' }: { name: string, className?: string }) {
    switch (name) {
        case 'search':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 22L20 20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'bell':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.44043V9.77043" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M15.33 18.8203C15.33 20.6503 13.83 22.1503 12 22.1503C11.09 22.1503 10.25 21.7703 9.65004 21.1703C9.05004 20.5703 8.67004 19.7303 8.67004 18.8203" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
            );

        case 'settings':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9.11035V14.8804C3 17.0004 3 17.0004 5 18.3504L10.5 21.5304C11.33 22.0104 12.68 22.0104 13.5 21.5304L19 18.3504C21 17.0004 21 17.0004 21 14.8904V9.11035C21 7.00035 21 7.00035 19 5.65035L13.5 2.47035C12.68 1.99035 11.33 1.99035 10.5 2.47035L5 5.65035C3 7.00035 3 7.00035 3 9.11035Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'user':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.8182 7.00966C14.8182 8.52528 13.5293 9.87491 12 9.87491C10.4707 9.87491 9.18182 8.52528 9.18182 7.00966C9.18182 5.44619 10.516 4 12 4C13.484 4 14.8182 5.44619 14.8182 7.00966ZM20 16.7779C20 17.4743 19.6212 18.235 18.3901 18.8767C17.1259 19.5356 15.0587 20.0002 12 20.0002C8.94127 20.0002 6.87409 19.5356 5.60994 18.8767C4.37885 18.235 4 17.4743 4 16.7779C4 16.2284 4.51302 15.4237 6.06076 14.6976C7.52907 14.0088 9.62782 13.5556 12 13.5556C14.3722 13.5556 16.4709 14.0088 17.9392 14.6976C19.487 15.4237 20 16.2284 20 16.7779Z" strokeWidth="2" />
                </svg>
            );

        case 'logout':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.78019 3.59961H5.07431C4.51268 3.59961 3.97405 3.82086 3.57691 4.21468C3.17977 4.60851 2.95667 5.14265 2.95667 5.69961V18.2996C2.95667 18.8566 3.17977 19.3907 3.57691 19.7845C3.97405 20.1784 4.51268 20.3996 5.07431 20.3996H8.78019M9.04338 11.9996H21.0434M21.0434 11.9996L16.4582 7.19961M21.0434 11.9996L16.4582 16.7996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'clock':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-white ${className}`} width="6" height="6" viewBox="0 0 6 6" fill="none" >
                    <path d="M4.62039 4.43093V0.810548L1 0.810547" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg >
            );

        case 'bar-chart':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M26.9599 29.7324H19.8932C18.2132 29.7324 16.8533 31.0923 16.8533 32.7723V46.4256H26.9599V29.7324V29.7324Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34.0299 17.5996H29.9765C28.2965 17.5996 26.9365 18.9596 26.9365 20.6396V46.3997H37.0432V20.6396C37.0432 18.9596 35.7099 17.5996 34.0299 17.5996Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M44.1282 34.2656H37.0615V46.3991H47.1682V37.3057C47.1415 35.6257 45.7815 34.2656 44.1282 34.2656Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23.9999 58.6673H39.9999C53.3332 58.6673 58.6666 53.334 58.6666 40.0006V24.0006C58.6666 10.6673 53.3332 5.33398 39.9999 5.33398H23.9999C10.6666 5.33398 5.33325 10.6673 5.33325 24.0006V40.0006C5.33325 53.334 10.6666 58.6673 23.9999 58.6673Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'percent':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M23.9999 5.33398H39.9999C53.3333 5.33398 58.6666 10.6673 58.6666 24.0007V40.0007C58.6666 53.334 53.3333 58.6673 39.9999 58.6673H23.9999C10.6666 58.6673 5.33325 53.334 5.33325 40.0007V24.0007C5.33325 10.6673 10.6666 5.33398 23.9999 5.33398Z" stroke="#123857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22.8535 40.7192L40.2935 23.2793" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M23.9468 27.6537C25.7583 27.6537 27.2267 26.1853 27.2267 24.3738C27.2267 22.5623 25.7583 21.0938 23.9468 21.0938C22.1353 21.0938 20.6667 22.5623 20.6667 24.3738C20.6667 26.1853 22.1353 27.6537 23.9468 27.6537Z" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M41.3866 42.9076C43.1981 42.9076 44.6667 41.4391 44.6667 39.6276C44.6667 37.8161 43.1981 36.3477 41.3866 36.3477C39.5751 36.3477 38.1067 37.8161 38.1067 39.6276C38.1067 41.4391 39.5751 42.9076 41.3866 42.9076Z" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        case 'wallet':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M24 58.6673H40C53.3334 58.6673 58.6667 53.334 58.6667 40.0007V24.0007C58.6667 10.6673 53.3334 5.33398 40 5.33398H24C10.6667 5.33398 5.33337 10.6673 5.33337 24.0007V40.0007C5.33337 53.334 10.6667 58.6673 24 58.6673Z" stroke="#123857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21.3334 50.6673H42.6667C48 50.6673 50.6667 48.0007 50.6667 42.6673V21.334C50.6667 16.0007 48 13.334 42.6667 13.334H21.3334C16 13.334 13.3334 16.0007 13.3334 21.334V42.6673C13.3334 48.0007 16 50.6673 21.3334 50.6673Z" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.3334 25.334H19.9467C23.6267 25.334 26.6134 28.3207 26.6134 32.0007C26.6134 35.6807 23.6267 38.6673 19.9467 38.6673H13.3334" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M50.6666 26.6406H42.6666" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M50.6666 37.334H42.6666" stroke="#00D296" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.2006 32H19.4672" stroke="#00D296" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        case 'equal-sign':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.75 9H8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.75 15H8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        case 'arrow-right':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                    <path d="M1.92627 1.74414L10.5105 1.74414V10.3284M1 11.2544L10.3904 1.86404" stroke="#123857" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
    }
}