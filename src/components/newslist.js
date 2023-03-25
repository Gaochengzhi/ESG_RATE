const newsList = ({ news }) => {
    return (
        <div className="md:p-4 text-lg overflow-auto rounded-md">

            <h1 className="font-bold text-2xl w-full border-b-2 py-2 mb-2">ESG新闻列表</h1>

            <div className="">
                <ul className="">
                    {news?.map((news) => (
                        <li className="my-2 border-b-2" key={news.link}>
                            <h2 className="text-xl font-bold mb-2 hover:text-blue-500">{news[0]}</h2>
                            <p>时间：{news[1]}</p>
                            <p>摘要：{news[2]}</p>
                            <a href={news[3]}>链接: {news[3]}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default newsList;

