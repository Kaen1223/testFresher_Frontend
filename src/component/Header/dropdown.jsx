
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { fetchLogOutUser } from '../../service/api';
import {  message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogOutAction, doLoginAction } from '../../redux/account/accountSlice';
import Avatar from '../avatar/Avatar';
import { useState } from 'react';
import Account from './Account';



  
const DropDown = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModalAccount , setShowModalAccount] = useState(false)

    const handleClickAccount = () => {
      setShowModalAccount(true)
    }


    let items = [
        {
          key: '1',
          label: (
            <a onClick={handleClickAccount}>
              My Account
            </a>
          ),
        },
        {
          key: '5',
          label: (
            <Link to= '/history'> Lịch sử mua hàng </Link>
          ),
        },
        {
          key: '2',
          danger: true,
          label: 'Log out',
          onClick : async () => {
            let res = await fetchLogOutUser()
            console.log(res)
            if(res && res.statusCode == 201) {
                message.success('LogOut thành công !')    
                dispatch(doLogOutAction())  
                localStorage.removeItem('access_token')
                navigate('/')
            }
          }
        },
       
      ];
    
    let {dataUser} = props
    if(dataUser.user.role == 'ADMIN') {
      items.unshift({
        key: '3',
        label: (
          <Link to= '/admin'> Pages Admin </Link>
        ),
      })

      if( window.location.pathname.includes('admin')) {
        items.splice(0,1,{
          key: '4',
          label: (
            <Link to= '/'> Home </Link>
          ),
        })
      }
    }

  
  

     
    return (
        <div style={{marginRight : 15 }}>
            <Dropdown
            style = {{
              marginLeft: 'auto'
            }}
            menu={{
            items,
            }}
            
            >
            <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar src ={`https://backend-fresher.onrender.com/images/avatar/${dataUser?.user?.avatar}`}/>  {dataUser?.user?.fullName}
                <DownOutlined />
            </Space>
            </a>
            </Dropdown>
            <Account dataUser = {dataUser} showModalAccount ={showModalAccount} setShowModalAccount = {setShowModalAccount}/>
        </div>
    )
}

export default DropDown