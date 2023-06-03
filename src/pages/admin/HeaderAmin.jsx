import {
    MenuFoldOutlined,
    DesktopOutlined ,
    UserOutlined,
    PieChartOutlined,
    TeamOutlined,
    FileOutlined
    
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme  } from 'antd';
  import { useState } from 'react';
import './admin.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import DropDown from '../../component/Header/dropdown';

  const { Header, Sider, Content } = Layout;

  const items = [
    getItem(<Link to='/admin'>Dashboard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/admin/manage-user'>Manage Users</Link>,'2', <UserOutlined />), 
    getItem(<Link to='/admin/manage-book'>Manage Books</Link>, '4', <TeamOutlined />),
    getItem(<Link to='/admin/manage-orders'>Manage Orders</Link>, '5', <FileOutlined />),
  ];
    
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }
    
      
 

  const HeaderAdmin = (props) => {
    const dataUser  = useSelector(state => state.account)
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout className='admin-container'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
           {collapsed == false && <div className='title-admin'>Admin</div>} 
          <Menu
            theme="dark"
           
            items={items}


         
          />
        </Sider>
        <Layout>
          <Header  style={{
              display : 'flex',
              justifyContent :'space-between',
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            
              <DropDown dataUser = {dataUser}/>
            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default HeaderAdmin;