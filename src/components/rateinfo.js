export default function Searchbar({ ratelist, info }) {
    const data = ratelist
    const HighAvgLow = () => {
        return (
            <div className="flex justify-center">
                <div className="flex-1">
                    <h2 className="text-center text-lg border-t-4 p-3 border-green-500 font-bold">优秀指标</h2>
                    {data?.high?.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-200">
                            <div className="font-bold">{item.indicatorLabel}</div>
                            <div>{item.indicatorName}</div>
                            {/* <div>{item.indicatorNewValue}</div> */}
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    <h2 className="text-center text-lg font-bold border-t-4 p-3 border-yellow-500">持平指标</h2>
                    {data?.avg?.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-200">
                            <div className="font-bold">{item.indicatorLabel}</div>
                            <div>{item.indicatorName}</div>
                            {/* <div>{item.indicatorNewValue}</div> */}
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    <h2 className="text-center text-lg font-bold border-t-4 p-3 border-red-500">落后指标</h2>
                    {data?.low?.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-200">
                            <div className="font-bold">{item.indicatorLabel}</div>
                            <div>{item.indicatorName}</div>
                            {/* <div>{item.indicatorNewValue}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    return <>
        <div>
            <div className="m-3 mb-4 font-sans text-xl">
                对于<code className="text-blue-500">{info.industryName || "N/A"}</code>行业关键问题，以下是 <code className="text-xl">{info.comName} </code> 与同行公司的对比
            </div>
            <div>
                <HighAvgLow />
            </div>
        </div>

    </>

}

