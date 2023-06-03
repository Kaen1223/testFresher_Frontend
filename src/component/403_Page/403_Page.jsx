import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Page403 = () => (
  <div style={{position : 'fixed' , top : '50%' , right : '50%' , transform : ' translate(50% , -50%)'}}>
    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary"><Link to='/'>Go Home</Link></Button>}
  />
  </div>
);
export default Page403;