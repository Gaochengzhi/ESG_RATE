import Image from "next/image";
import big from "public/big.png";
import small from "public/small.png";
import mid from "public/mid.png";
function BarChart({ info }) {

    return (
        <>
            <div className="text-lg md:m-4">
                <div className="border-b-2 py-2 text-2xl font-bold">ESG 建议</div>
                <div className=" my-5">基于{info.comName}的ESG 指标及财务情况，本团队为其构建的ESG 框架 如下所示：</div>
                <Image className="mix-blend-darken md:p-6 md:px-36" src={big} alt="calendar image" />


            </div>

        </>
    );
}

export default BarChart;
