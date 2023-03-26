import Image from "next/image";
import big from "public/big.png";
import small from "public/small.png";
import mid from "public/mid.png";
import miro from "public/miro.jpeg";
import { useState, useEffect } from "react";
function BarChart({ info, cap }) {
    const [companySize, setCompanySize] = useState("");

    const getCompanySize = (marketCap) => {
        if (marketCap === "unknown") {
            return "unknown";
        } else if (marketCap >= 1000) {
            return "big.png";
        } else if (marketCap >= 500) {
            return "mid.png";
        } else if (marketCap >= 100) {
            return "small.png";
        } else {
            return "miro.jpeg";
        }
    };

    useEffect(() => {
        setCompanySize(cap / 100);
        console.log("market", companySize);
        console.log(typeof (companySize));
    }, [cap]);

    return (
        <>
            <div className="text-lg md:m-4">
                <div className="border-b-2 py-2 text-2xl font-bold">ESG 建议</div>
                <div className=" my-5">基于{info.comName}的ESG 指标及财务情况，本团队为其构建的ESG 框架 如下所示：</div>
                <img className="mix-blend-darken md:p-6 md:px-36" src={`${getCompanySize(companySize)}`} alt="calendar image" />


            </div>

        </>
    );
}

export default BarChart;
