import Icon from "../Icon"



interface StatusProps{
    status: 'pending' | 'success' | 'failed' | 'canceled',
    className?: string,
    children?: React.ReactNode,
}


const Status:React.FC<StatusProps> = ({
    status,
    className,
    children,
}) =>{

    const getStatus = () => {
        switch (status) {
            case 'pending':
                return 'bg-[#fdf4e6] text-[#ee8e02] border border-[#ee8e02]/10'
            case 'success':
                return 'bg-[#E6F8FB] text-[#00D296] border border-[#00D296]/10'
            case 'failed':
                return 'bg-[rgba(234,102,102,0.15)] text-[#EA6666] border border-[#EA6666]/10'
            case 'canceled':
                return 'bg-[rgba(234,102,102,0.15)] text-[#EA6666] border border-[#EA6666]/10'
            default:
                return 'bg-[#E6F8FB] text-[#00D296] border border-[#00D296]/10'
        }
    }

    const getStatusText = () => {
        switch (status) {
            case 'pending':
                return 'Pending'
            case 'success':
                return 'Success'
            case 'failed':
                return 'Failed'
            case 'canceled':
                return 'Canceled'
            default:
                return 'Pending'
        }
    }


    const getStatusIcon = () => {
        switch (status) {
            case 'pending':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="12" height="12" fill="#ee8e02"><path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z"/></svg> 
                )
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1.43512 3.93751L3.99512 6.49751L8.39062 1.50195" stroke="#00D296" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )
            case 'failed':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                    <path d="M7.91309 1L1.91309 7M7.91309 7L1.91309 0.999999" stroke="#EA6666" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )
            case 'canceled':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                    <path d="M7.91309 1L1.91309 7M7.91309 7L1.91309 0.999999" stroke="#EA6666" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )
            default:
                return 'clock'
        }
    }

    return(
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`flex items-center gap-1.5 py-1 px-2 font-[500] text-sm rounded-sm tracking-[0.56px] ${getStatus()}`}>
                {getStatusIcon()}
                {getStatusText()}
            </div>
        </div>
    )

}

export default Status;