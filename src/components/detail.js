import BarChart from './barChart'
import OtherRate from './otherRate'
export default function rateDetail({ rank, otherRate }) {
    return <div className="flex lg:flex-row flex-col justify-between">
        <div>
            <div className="text-xl px-2 pb-2">
                其他ESG评级机构的最新评级变动:
            </div>
            <div>
                <OtherRate data={otherRate} />
            </div>
        </div>
        <div>
            <div className="flex flex-col text-xl justify-between h-full p-2 ">

                <div className='m-2'>ESG 评级构成</div>
                <div className='h-full flex p-2 border rounded-md'>
                    <BarChart data={rank} />
                </div>


            </div>
        </div>
    </div>

}

