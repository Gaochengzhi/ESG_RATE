import Head from 'next/head'
import Image from 'next/image'
import HeaderInfo from '../components/header.js'
import Detail from '../components/detail.js'
import RateInfo from '../components/rateinfo.js'
import NewsList from '../components/newslist.js'
import Exempt from '../components/exempt.js'
import Suggest from '../components/suggest.js'
import Cal from '../components/cal.js'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Search from '../components/search.js'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    const [newsList, setNewsList] = useState([]);
    const [rateData, setRateData] = useState("");
    const [rateItemList, setRateItemList] = useState("");
    const [companyInfo, setCompanyInfo] = useState("");
    const [rankBar, setrankBar] = useState([]);
    const [inputdata, setInput] = useState({});
    const [otherRate, setOtherRate] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [marketCap, setMarketCap] = useState("");
    async function fetchNewsList(name) {
        const company_name = name;
        const response = await axios.post(`http://124.220.179.145:8001/get_esg_news`, {
            company_name: company_name
        }).then(
            response => setNewsList(response.data))
    }


    const handleInputChange = (value) => {
        setInput(value);
        fetchData(value)
    };
    const fetchData = async (cName = "美的集团股份有限公司") => {

        axios.post('http://47.106.13.220:8081/esg/queryCompanyInfo', {
            companyName: cName
        }).then(response => {
            setCompanyInfo(response.data)
            setCompanyName(response.data.comName)
            console.log(companyName);
            fetch(`http://124.220.179.145:8000/esg?company_name=${companyName}`)
                .then(response => response.json())
                .then(data => setOtherRate(data))
                .catch(error => console.error(error))
            fetchNewsList(companyName)

            fetch(`http://124.220.179.145:8002/get_market_value?company_name=${companyName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => response.json())
                .then(data => setMarketCap(data.market_value.market_value))
                .catch(error => console.error(error))
            fetchNewsList(companyName)

        }
        )

        axios.post('http://47.106.13.220:8081/esg/queryCompanyIndicatorFinalValue', {
            companyName: companyName
        }).then(response => setRateData(response.data[companyName]))
        axios.post('http://47.106.13.220:8081/esg/queryRankingData', {
            companyName: companyName
        }).then(
            response => setrankBar(response.data)
        )
        const rateitemList = await axios.post('http://47.106.13.220:8081/esg/queryIndicatorData', {
            companyName: cName
        }).then((response) =>
            setRateItemList(response.data))
    };
    useEffect(() => {
        fetchData(companyName)
        return () => {
        }
    }, [companyName])

    return (
        <>
            <Head>
                <title>ESG Online Evaluation Platform</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className="flex sm:flex-row flex-col w-full justify-between items-center ">
                    <div>
                        <a
                            href=""
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/favicon.ico"
                                alt="Vercel Logo"
                                className={styles.vercelLogo}
                                width={150}
                                height={24}
                                priority
                            />
                        </a>
                    </div>

                    <div className='p-1 bg-green-600  backdrop-blur-sm rounded-md'>
                        <Search input={inputdata} onSearch={handleInputChange} />
                    </div>
                </div>
                <div className='shadow-md border border-gray-300 bg-slate-200 w-full rounded-lg my-7'>
                    <HeaderInfo rate={rateData} info={companyInfo} />
                </div>

                <div className='shadow-md border border-gray-300  bg-slate-100 w-full rounded-lg p-5 my-5'>
                    <Detail rank={rankBar} otherRate={otherRate} info={companyInfo} />
                </div>

                <div className='bg-slate-100 w-full rounded-lg p-5 shadow-md border border-gray-300 mb-7'>
                    <RateInfo ratelist={rateItemList} info={companyInfo} />
                </div>
                <div className='bg-slate-100 w-full rounded-lg p-5 shadow-md border border-gray-300 mb-7'>
                    <NewsList news={newsList} info={companyInfo} />
                </div>

                <div className='bg-slate-100 w-full rounded-lg p-5 shadow-md border border-gray-300 mb-7'>
                    <Suggest info={companyInfo} cap={marketCap} />
                </div>

                <div className='bg-slate-100 w-full rounded-lg p-5 shadow-md border border-gray-300 mb-7'>
                    <Cal info={companyInfo} />
                </div>
                <div className='bg-slate-100 w-full rounded-lg p-5 shadow-md border border-gray-300 mb-7'>
                    <Exempt />
                </div>

            </main >
        </>
    )
}
