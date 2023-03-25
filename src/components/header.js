import React, { useState } from "react";
import classNames from "classnames";
import { SearchOutlined } from '@ant-design/icons'
import { Button, Popover, Tooltip } from 'antd';
export default function HeaderInfo({ rate, info }) {
    const content = (
        <div className="max-w-md">
            <div>
                法定代表人：{info.legalRepresentation}
            </div>
            <div>
                办公室地点：{info.officeProvince} {info.officeCity}
            </div>
            <div className="mb-3">
                公司类型：{info.comOwnership}
            </div>
            <div>
                {info.comIntro}
            </div>
        </div>
    );
    function determineValue(str) {
        switch (str) {
            case 'F':
            case 'C':
            case 'CC':
                return '落后者';
            case 'B':
            case 'BB':
                return '持平者';
            case 'A':
            case 'AA':
                return '领先者';
            default:
                return 'N/A';
        }
    }

    const colors = {
        F: 'bg-red-500',
        C: 'bg-red-500',
        CC: 'bg-red-500',
        B: 'bg-yellow-500',
        BB: 'bg-yellow-500',
        A: 'bg-green-500',
        AA: 'bg-green-500',
    };


    function Grid({ activeLetter }) {
        const [activeIndex, setActiveIndex] = useState(null);

        const handleClick = (index) => {
            setActiveIndex(index);
        };

        return (
            <div className="flex justify-center">
                {['F', 'C', 'CC', 'B', 'BB', 'A', 'AA'].map((letter, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 border border-gray-600  mx-1 rounded-md  cursor-pointer flex items-center justify-center ${activeLetter === letter ? colors[letter] : 'bg-gray-300'} ${activeIndex === index && 'opacity-50'}`}
                        onClick={() => handleClick(index)}
                    >
                        <span className={`${activeLetter === letter ? 'text-white' : 'text-gray-700'} text-center text-xl font-bold`}>
                            {letter}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return <div >
        <div className="w-full flex md:flex-row flex-col justify-between p-4 ">
            <div className="flex flex-col justify-center">
                <div className="text-2xl flex space-x-2 items-center">{info.comName || "N/A"} <Popover placement="bottom" content={content} title="公司简介">

                    <div className="mb-2 ml-2 text-blue-500"><SearchOutlined></SearchOutlined></div>
                </Popover></div>
                <div className="text-xl">产业: {info.industryName || "N/A"}</div>
                <div>国家/地区：中国大陆</div>
                <div className="text-2xl mt-2">该公司是
                    <code className="">
                        {info.industryName}
                    </code>
                    业的
                    <code className={`text-white m-2 p-1 rounded-md font-bold shadow-md border border-gray-300 ${colors[rate]}`}>
                        {determineValue(rate)}
                    </code>

                </div>
            </div>
            <div className="flex ani">
                <div className="overflow-hidden  font-mono text-green-700 md:px-3">
                    <div className="flex items-baseline my-3 pl-1">

                        <div className="md:mx-4">
                            <div className="text-3xl font-sans font-bold">ESG RATINGS</div>
                            <div className="text-xl  -my-1">GLOBAL GREEN FINTECH </div>
                        </div>

                        <div className={`w-24 h-24 ${colors[rate] || "bg-red-500"} rounded-full flex justify-center items-center  border-4 border-gray-200 shadow-lg text-3xl text-white`}>
                            {rate || "N/A"}
                        </div>
                    </div>

                    <Grid activeLetter={rate} />
                </div>
            </div>
        </div>

    </div >
}