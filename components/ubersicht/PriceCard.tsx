import { features } from "process";
import Icon from "../ui/Icon";
import _ from "lodash";


interface PriceCardProps {
    title: string;
    features: {
        title: string;
        available: boolean;
    }[],
    unit: string;
}



const PriceCard:React.FC<PriceCardProps> = ({
    title,
    features,
    unit
}) => {
    return(
        <div className="bg-white box-shadow border-2 border-green-400 relative">
            <div>
                
            </div>
            <div className="p-6 w-96 h-full">
                    <h3 className="text-[22px] leading-[33px] mb-3">{title}</h3>
                    <ul className="flex flex-col space-y-1.5">

                        {_.map(features, (feature: typeof features[0], index) => (
                            <li 
                                key={index + feature.title} 
                                className="flex space-x-2"
                            >
                                <span className="pt-1.5">
                                    {
                                        feature.available ?
                                        <Icon name="check" className="h-3 w-3 fill-green-500" />
                                        : <Icon name="x" className="h-5 w-5 -ml-1 fill-red-500" />
                                    } 
                                </span> 
                                <span className="text-slate-500 flex-1">{feature.title}</span>
                            </li>
                        ))} 
                    </ul>

                    {unit ? <div className="mt-6">
                        <span className="text-base font-medium text-primary">
                            {unit}
                        </span>
                    </div> : null}
            </div>
        </div>
    )
}

export default PriceCard;