const colors = {
    "F": "bg-red-500",
    "C": "bg-red-500",
    "CC": "bg-red-500",
    "B": "bg-yellow-500",
    "BB": "bg-yellow-500",
    "A": "bg-green-500",
    "AA": "bg-green-500",
};

function BarChart({ data }) {
    console.log(data);
    const sortedData = data?.slice()?.sort((a, b) => {
        const order = ["F", "C", "CC", "B", "BB", "A", "AA"];
        return order.indexOf(a.enIndicatorNewValue) - order.indexOf(b.enIndicatorNewValue);
    });

    const maxAmount = Math.max(...sortedData.map(({ indicatorAmount }) => indicatorAmount));

    return (
        <>
            <div className="flex justify-center items-end">
                <div>

                </div>
                {sortedData.map(({ enIndicatorNewValue, indicatorAmount }) => (
                    <div>

                        <div className="text-center ">{indicatorAmount}</div>
                        <div
                            key={enIndicatorNewValue}
                            className={`md:w-16 w-[9vw] rounded-sm ${colors[enIndicatorNewValue]} lg:mx-2 mx-1`}
                            style={{ height: `${(indicatorAmount / maxAmount) * 200}px` }}
                        >
                        </div>
                        <div className="text-center">{enIndicatorNewValue}</div>

                    </div>
                ))}
            </div>


        </>
    );
}

export default BarChart;
