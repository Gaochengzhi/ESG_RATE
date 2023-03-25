import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const onSearch = (value) => {

}
export default function Searchbar(props) {
    const { onSearch } = props;
    const handleSearch = (value) => {
        onSearch(value);
    };
    return <>
        <div>
            <Search
                placeholder="输入公司名称"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
        </div>
    </>

}

