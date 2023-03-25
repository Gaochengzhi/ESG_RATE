const ExampleComponent = ({ data }) => {
    return (
        <div className="p-4 text-lg border rounded-md">
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <td className="text-xl font-bold px-4 py-2">{data.company_name}</td>
                    </tr>
                    <tr>
                        <td className=" px-4 py-2">华证ESG</td>
                        <td className=" px-4 py-2">{data.huazheng_esg}</td>
                    </tr>
                    <tr>
                        <td className=" px-4 py-2">罗素ESG</td>
                        <td className=" px-4 py-2">{data.luo_esg}</td>
                    </tr>
                    <tr>
                        <td className=" px-4 py-2">彭博ESG</td>
                        <td className=" px-4 py-2">{data.pengbo_esg}</td>
                    </tr>
                    <tr>
                        <td className=" px-4 py-2">WIND ESG评级</td>
                        <td className=" px-4 py-2">{data.wind_esg_rating}</td>
                    </tr>
                    <tr>
                        <td className=" px-4 py-2">WIND ESG评分</td>
                        <td className=" px-4 py-2">{data.wind_esg_score}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default ExampleComponent;

