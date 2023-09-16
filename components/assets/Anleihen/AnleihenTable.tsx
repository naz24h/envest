import React from 'react';
import { AnleihenTableColumns } from "./AnleihenTableColumns";

const AnleihenTable = () => { 
    const container = React.useRef(null);
    const [rander, setRander] = React.useState(false);

    React.useEffect(() => {
        if(container.current && !rander){
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
                {
                    "colorTheme": "light",
                    "dateRange": "12M",
                    "exchange": "US",
                    "showChart": true,
                    "locale": "en",
                    "width": "100%",
                    "height": "100%",
                    "largeChartUrl": "",
                    "isTransparent": false,
                    "showSymbolLogo": true,
                    "showFloatingTooltip": false,
                    "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
                    "plotLineColorFalling": "rgba(41, 98, 255, 1)",
                    "gridLineColor": "rgba(42, 46, 57, 0)",
                    "scaleFontColor": "rgba(134, 137, 147, 1)",
                    "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
                    "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
                    "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
                    "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
                    "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
            }
            `

            // @ts-ignore
            container.current.appendChild(script);
            setRander(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
 

  return (
    <div className="py-10 h-[650px]"> 

      {/* Uncomment this section when you want to use DataTable */}
      {/* <DataTable
        tableData={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
        tableColumns={AnleihenTableColumns}
        tableTitle='Anleihen'
      /> */}

    <div ref={container} className="tradingview-widget-container h-96">
      <div className="tradingview-widget-container__widget h-96"></div>
        <div className="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
            </a>
        </div>
    </div>
    </div>
  );
};

export default AnleihenTable;
