import Image from "next/image";
import calImage from "public/cal.png";
import valueImage from "public/value.jpeg";
import abc from "public/abc.jpeg";
function cal({ info }) {
    const RATINGS = [
        { label: "AA级", color: "green" },
        { label: "A级", color: "green" },
        { label: "BB级", color: "yellow" },
        { label: "B级", color: "yellow" },
        { label: "CC级", color: "red" },
        { label: "C级", color: "red" },
    ];
    return (
        <>
            <div className="text-lg md:m-4">
                <div className="border-b-2 py-2 text-2xl font-bold">计算框架及评分评级标准</div>
                <div className="flex  md:flex-row flex-col justify-between md:pr-6">
                    <div className="pt-3 flex-1">
                        <Image className="mix-blend-darken md:p-9 pb-5" src={calImage} alt="calendar image" />
                        <Image className="mix-blend-darken md:p-5" src={valueImage} alt="calendar image" />
                    </div>
                    <div className="flex-1">
                        <div className="py-6 text-base">
                            <h2 className="text-2xl font-bold mb-4">本团队评级细则情况</h2>
                            <div className="flex flex-col md:w-full md:justify-between">
                                {RATINGS.map((rating, index) => (
                                    <div
                                        key={index}
                                        className={`w-full items-center bg-${rating.color}-500 p-2 px-4 md:mb-2 md:rounded-md border-gray-500 mb-1`}
                                    >
                                        <h3 className="text-xl font-bold mb-2">{rating.label}</h3>
                                        <p className=" mb-1">
                                            同行业内综合评分排名
                                            {index === 0
                                                ? "前20%以内"
                                                : `${index * 10 + 10}%-${index * 10 + 20}%`}
                                        </p>
                                    </div>
                                ))}
                                <div className="w-full bg-red-500  mb-2 md:mb-0 md:rounded-md px-4 p-2">
                                    <h3 className="text-xl font-bold mb-2 ">F级</h3>
                                    <p className="text  mb-1">
                                        同行业内综合评分排名70%以后或存在数据造假行为
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image className="mix-blend-darken saturate-200" src={abc} alt="calendar image" />
                        </div>
                    </div>

                </div>


            </div>

        </>
    );
}

export default cal;
