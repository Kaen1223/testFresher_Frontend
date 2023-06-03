import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const IsLogin = () => (

  <div style={{position : 'fixed' , top : '30%' , right : '50%' , transform : ' translate(50% , -50%)'}}>
     <Result
    status="warning"
    title="You need login to use this feature."
    extra={
      <Button type="primary" key="console">
        <Link to='/login'>Go to Login</Link>
      </Button>
    }
  />
  </div>
);
export default IsLogin;