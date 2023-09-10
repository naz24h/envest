


export default function Icon({ name, className = 'stroke-white' }: { name: string, className?: string }) {
    switch (name) {
        case 'search':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 22L20 20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'bell':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.44043V9.77043" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M15.33 18.8203C15.33 20.6503 13.83 22.1503 12 22.1503C11.09 22.1503 10.25 21.7703 9.65004 21.1703C9.05004 20.5703 8.67004 19.7303 8.67004 18.8203" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
            );

        case 'settings':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9.11035V14.8804C3 17.0004 3 17.0004 5 18.3504L10.5 21.5304C11.33 22.0104 12.68 22.0104 13.5 21.5304L19 18.3504C21 17.0004 21 17.0004 21 14.8904V9.11035C21 7.00035 21 7.00035 19 5.65035L13.5 2.47035C12.68 1.99035 11.33 1.99035 10.5 2.47035L5 5.65035C3 7.00035 3 7.00035 3 9.11035Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'user':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.8182 7.00966C14.8182 8.52528 13.5293 9.87491 12 9.87491C10.4707 9.87491 9.18182 8.52528 9.18182 7.00966C9.18182 5.44619 10.516 4 12 4C13.484 4 14.8182 5.44619 14.8182 7.00966ZM20 16.7779C20 17.4743 19.6212 18.235 18.3901 18.8767C17.1259 19.5356 15.0587 20.0002 12 20.0002C8.94127 20.0002 6.87409 19.5356 5.60994 18.8767C4.37885 18.235 4 17.4743 4 16.7779C4 16.2284 4.51302 15.4237 6.06076 14.6976C7.52907 14.0088 9.62782 13.5556 12 13.5556C14.3722 13.5556 16.4709 14.0088 17.9392 14.6976C19.487 15.4237 20 16.2284 20 16.7779Z" strokeWidth="2" />
                </svg>
            );

        case 'logout':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.78019 3.59961H5.07431C4.51268 3.59961 3.97405 3.82086 3.57691 4.21468C3.17977 4.60851 2.95667 5.14265 2.95667 5.69961V18.2996C2.95667 18.8566 3.17977 19.3907 3.57691 19.7845C3.97405 20.1784 4.51268 20.3996 5.07431 20.3996H8.78019M9.04338 11.9996H21.0434M21.0434 11.9996L16.4582 7.19961M21.0434 11.9996L16.4582 16.7996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'clock':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} width="6" height="6" viewBox="0 0 6 6" fill="none" >
                    <path d="M4.62039 4.43093V0.810548L1 0.810547" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg >
            );

        case 'bar-chart':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className={className} fill="none">
                    <path d="M26.9599 29.7324H19.8932C18.2132 29.7324 16.8533 31.0923 16.8533 32.7723V46.4256H26.9599V29.7324V29.7324Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34.0299 17.5996H29.9765C28.2965 17.5996 26.9365 18.9596 26.9365 20.6396V46.3997H37.0432V20.6396C37.0432 18.9596 35.7099 17.5996 34.0299 17.5996Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M44.1282 34.2656H37.0615V46.3991H47.1682V37.3057C47.1415 35.6257 45.7815 34.2656 44.1282 34.2656Z" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23.9999 58.6673H39.9999C53.3332 58.6673 58.6666 53.334 58.6666 40.0006V24.0006C58.6666 10.6673 53.3332 5.33398 39.9999 5.33398H23.9999C10.6666 5.33398 5.33325 10.6673 5.33325 24.0006V40.0006C5.33325 53.334 10.6666 58.6673 23.9999 58.6673Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'percent':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className={className} fill="none">
                    <path d="M23.9999 5.33398H39.9999C53.3333 5.33398 58.6666 10.6673 58.6666 24.0007V40.0007C58.6666 53.334 53.3333 58.6673 39.9999 58.6673H23.9999C10.6666 58.6673 5.33325 53.334 5.33325 40.0007V24.0007C5.33325 10.6673 10.6666 5.33398 23.9999 5.33398Z" stroke="#123857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22.8535 40.7192L40.2935 23.2793" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23.9468 27.6537C25.7583 27.6537 27.2267 26.1853 27.2267 24.3738C27.2267 22.5623 25.7583 21.0938 23.9468 21.0938C22.1353 21.0938 20.6667 22.5623 20.6667 24.3738C20.6667 26.1853 22.1353 27.6537 23.9468 27.6537Z" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M41.3866 42.9076C43.1981 42.9076 44.6667 41.4391 44.6667 39.6276C44.6667 37.8161 43.1981 36.3477 41.3866 36.3477C39.5751 36.3477 38.1067 37.8161 38.1067 39.6276C38.1067 41.4391 39.5751 42.9076 41.3866 42.9076Z" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'wallet':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className={className} fill="none">
                    <path d="M24 58.6673H40C53.3334 58.6673 58.6667 53.334 58.6667 40.0007V24.0007C58.6667 10.6673 53.3334 5.33398 40 5.33398H24C10.6667 5.33398 5.33337 10.6673 5.33337 24.0007V40.0007C5.33337 53.334 10.6667 58.6673 24 58.6673Z" stroke="#123857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.3334 50.6673H42.6667C48 50.6673 50.6667 48.0007 50.6667 42.6673V21.334C50.6667 16.0007 48 13.334 42.6667 13.334H21.3334C16 13.334 13.3334 16.0007 13.3334 21.334V42.6673C13.3334 48.0007 16 50.6673 21.3334 50.6673Z" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.3334 25.334H19.9467C23.6267 25.334 26.6134 28.3207 26.6134 32.0007C26.6134 35.6807 23.6267 38.6673 19.9467 38.6673H13.3334" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M50.6666 26.6406H42.6666" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M50.6666 37.334H42.6666" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.2006 32H19.4672" stroke="#00D296" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'equal-sign':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={`stroke-white ${className}`} fill="none">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.75 9H8.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.75 15H8.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'arrow-right':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" className={className} fill="none">
                    <path d="M1.92627 1.74414L10.5105 1.74414V10.3284M1 11.2544L10.3904 1.86404" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'user-chat':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M48 50.2926H45.9733C43.84 50.2926 41.8133 51.1193 40.32 52.6126L35.7599 57.1193C33.6799 59.1726 30.2934 59.1726 28.2134 57.1193L23.6533 52.6126C22.16 51.1193 20.1067 50.2926 18 50.2926H16C11.5733 50.2926 8 46.7461 8 42.3727V13.2793C8 8.90596 11.5733 5.35938 16 5.35938H48C52.4267 5.35938 56 8.90596 56 13.2793V42.3727C56 46.7194 52.4267 50.2926 48 50.2926Z" stroke="#123857" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 26.6668C35.4315 26.6668 38.2134 23.885 38.2134 20.4535C38.2134 17.0219 35.4315 14.2402 32 14.2402C28.5685 14.2402 25.7866 17.0219 25.7866 20.4535C25.7866 23.885 28.5685 26.6668 32 26.6668Z" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M42.6667 41.7596C42.6667 36.9596 37.8933 33.0664 32 33.0664C26.1067 33.0664 21.3333 36.9596 21.3333 41.7596" stroke="#00D296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'transaktionen':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={`stroke-[#292D32] ${className}`} fill="none">
                    <path d="M6.72827 19.7C7.54827 18.82 8.79828 18.89 9.51828 19.85L10.5283 21.2C11.3383 22.27 12.6483 22.27 13.4583 21.2L14.4683 19.85C15.1883 18.89 16.4383 18.82 17.2583 19.7C19.0383 21.6 20.4883 20.97 20.4883 18.31V7.04C20.4883 3.01 19.5483 2 15.7683 2H8.20828C4.42828 2 3.48828 3.01 3.48828 7.04V18.3C3.49828 20.97 4.95827 21.59 6.72827 19.7Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.25 10H14.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'wallet-card':
            return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` stroke-primary ${className}`} viewBox="0 0 24 24" fill="none">
                <path d="M2 8.50586H22" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 16.5059H8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 16.5059H14.5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.44 3.50586H17.55C21.11 3.50586 22 4.38586 22 7.89586V16.1059C22 19.6159 21.11 20.4959 17.56 20.4959H6.44C2.89 20.5059 2 19.6259 2 16.1159V7.89586C2 4.38586 2.89 3.50586 6.44 3.50586Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>);

        case 'money-up':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`stroke-white ${className}`} viewBox="0 0 24 24" fill="none">
                    <path d="M2 8.5H14.5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 16.5H8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 16.5H14.5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 9.5V3.5L22 5.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 3.5L18 5.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );

        case 'wallet-add':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`stroke-[#123857] ${className}`} viewBox="0 0 24 24" fill="none">
                    <path d="M14.2617 15.4375H9.26172" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.7617 12.998V17.998" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.66 2.51814L12.63 2.58814L9.73001 9.31814H6.88001C6.20001 9.31814 5.55001 9.45814 4.96001 9.70814L6.71001 5.52814L6.75001 5.42814L6.82001 5.26814C6.84001 5.20814 6.86001 5.14814 6.89001 5.09814C8.20001 2.06814 9.68001 1.37814 12.66 2.51814Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.05 9.51758C17.6 9.37758 17.12 9.31758 16.64 9.31758H9.73L12.63 2.58758L12.66 2.51758C12.81 2.56758 12.95 2.63758 13.1 2.69758L15.31 3.62758C16.54 4.13758 17.4 4.66758 17.92 5.30758C18.02 5.42758 18.1 5.53758 18.17 5.66758C18.26 5.80758 18.33 5.94758 18.37 6.09758C18.41 6.18758 18.44 6.27758 18.46 6.35758C18.73 7.19758 18.57 8.22758 18.05 9.51758Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.71 5.52734L4.96 9.70734C3.22 10.4573 2 12.1873 2 14.1973V11.2673C2 8.42734 4.02 6.05734 6.71 5.52734Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>);

        case 'three-dots':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11.5C9 12.3284 8.32843 13 7.5 13C6.67157 13 6 12.3284 6 11.5C6 10.6716 6.67157 10 7.5 10C8.32843 10 9 10.6716 9 11.5Z" fill="#123857" />
                    <path d="M13.5 11.5C13.5 12.3284 12.8284 13 12 13C11.1716 13 10.5 12.3284 10.5 11.5C10.5 10.6716 11.1716 10 12 10C12.8284 10 13.5 10.6716 13.5 11.5Z" fill="#123857" />
                    <path d="M18 11.5C18 12.3284 17.3284 13 16.5 13C15.6716 13 15 12.3284 15 11.5C15 10.6716 15.6716 10 16.5 10C17.3284 10 18 10.6716 18 11.5Z" fill="#123857" />
                </svg>
            );
        case 'dot':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={`stroke-white ${className}`}
                >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
            );
        case 'bank':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" className={`stroke-[#00D296] ${className}`}>
                    <path d="M6.33338 23.7508V19.5254M14.7778 23.7508V19.5254M23.2223 23.7508V19.5254M31.6667 23.7508V19.5254M3.80005 29.1341H34.2V34.2008H3.80005V29.1341ZM3.80005 13.9341V10.5563L18.3754 3.80078L34.2 10.5563V13.9341H3.80005Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'wallet-check':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`stroke-[#123857] ${className}`}>
                    <path d="M13.8001 18.8994H4.20043C2.87497 18.8994 1.80047 17.8249 1.80043 16.4995L1.80017 7.49968C1.80013 6.17417 2.87466 5.09961 4.20017 5.09961H18.5996C19.9251 5.09961 20.9997 6.17351 20.9997 7.49903L20.9997 11.6996M17.3997 16.4825L18.9083 17.991L22.1997 14.6995M2.39971 9.29946H20.3997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'menu':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            );
        case 'x':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={className ?? 'stroke-red-500'}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            );
        case 'copy':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={className} viewBox="0 0 24 24" fill="none">
                    <path d="M20 13.1251L20 6.00003C20 4.34317 18.6568 3.00002 17 3.00003L9.875 3.00012M14 21.0001L7.25 21.0001C6.00736 21.0001 5 19.9928 5 18.7501L5 9.00012C5 7.75747 6.00736 6.75011 7.25 6.75011L14 6.75011C15.2426 6.75011 16.25 7.75747 16.25 9.00011L16.25 18.7501C16.25 19.9928 15.2426 21.0001 14 21.0001Z" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'check':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 507.506 507.506"
                    width="24"
                    height="24"
                    className={className}
                >
                    <g>
                        <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
                    </g>
                </svg>
            );
        case 'single-line':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                    viewBox="0 0 24 25"
                    fill="none"
                >
                    <path d="M6.72827 20.2C7.54827 19.32 8.79828 19.39 9.51828 20.35L10.5283 21.7C11.3383 22.77 12.6483 22.77 13.4583 21.7L14.4683 20.35C15.1883 19.39 16.4383 19.32 17.2583 20.2C19.0383 22.1 20.4883 21.47 20.4883 18.81V7.54C20.4883 3.51 19.5483 2.5 15.7683 2.5H8.20828C4.42828 2.5 3.48828 3.51 3.48828 7.54V18.8C3.49828 21.47 4.95827 22.09 6.72827 20.2Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.25 10.5H14.75" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );


        case 'gear':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9.10937V14.8794C3 16.9994 3 16.9994 5 18.3494L10.5 21.5294C11.33 22.0094 12.68 22.0094 13.5 21.5294L19 18.3494C21 16.9994 21 16.9994 21 14.8894V9.10937C21 6.99937 21 6.99937 19 5.64937L13.5 2.46937C12.68 1.98937 11.33 1.98937 10.5 2.46937L5 5.64937C3 6.99937 3 6.99937 3 9.10937Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#123857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'i':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
                    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                    <path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z" />
                    <circle cx="12" cy="6.5" r="1.5" />
                </svg>

            );
        case 'photo-capture':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5,16v4H19V16a3,3,0,0,0-3-3H8A3,3,0,0,0,5,16Z" />
                    <path d="M21,24H16V22h5a1,1,0,0,0,1-1V16h2v5A3,3,0,0,1,21,24Z" /><path d="M2,8H0V3A3,3,0,0,1,3,0H8V2H3A1,1,0,0,0,2,3Z" />
                    <path d="M8,24H3a3,3,0,0,1-3-3V16H2v5a1,1,0,0,0,1,1H8Z" /><path d="M24,8H22V3a1,1,0,0,0-1-1H16V0h5a3,3,0,0,1,3,3Z" />
                </svg>
            );
        case 'photo-id':
            return (
                <svg width="24" height="24" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m19 4h-4v-1a3 3 0 0 0 -6 0v1h-4a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-10a5.006 5.006 0 0 0 -5-5zm-8-1a1 1 0 0 1 2 0v2a1 1 0 0 1 -2 0zm11 16a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3-3v-10a3 3 0 0 1 3-3h4.184a2.982 2.982 0 0 0 5.632 0h4.184a3 3 0 0 1 3 3zm-12-9h-5a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-8a1 1 0 0 0 -1-1zm-1 8h-3v-6h3zm11-3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1zm0-4a1 1 0 0 1 -1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1zm-2 8a1 1 0 0 1 -1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1z" />
                </svg>
            );
        case 'flag':
            return (
                <svg
                    viewBox="0 0 24 24"
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m15 3a3 3 0 0 0 -3-3h-12v24h2v-11h8v1a3 3 0 0 0 3 3h11v-13h-9zm-13-1h10a1 1 0 0 1 1 1v8h-11zm20 4v9h-9a1 1 0 0 1 -1-1v-1h3v-7z" />
                </svg>
            )
    }
}