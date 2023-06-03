import { Button, Result } from 'antd';
const Page404 = () => (
 <div style={{position : 'fixed' , top : '50%' , right : '50%' , transform : ' translate(50% , -50%)'}}>
   <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
 </div>
);
export default Page404;