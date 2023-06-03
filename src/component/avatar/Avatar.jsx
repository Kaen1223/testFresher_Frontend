import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const AvatarHeader = (props) => (
    
      <Avatar src = {props.src} size={40} icon={<UserOutlined />} />
     
);
export default AvatarHeader;