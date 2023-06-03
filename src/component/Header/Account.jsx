import { Modal,Tabs} from 'antd';
import { Row, Col , Button , Form ,Input , Checkbox , message , Upload , Avatar  } from "antd"
import { UploadOutlined ,AntDesignOutlined} from '@ant-design/icons';

import { useState } from 'react';
import './header.scss'
import { callUploadAvatarImg, callUploadBookImg, fetchLoginUser, updateUserInfo, updateUserPassword } from '../../service/api';
import { useDispatch } from 'react-redux';
import { doChangePassword, doLoginAction, doUpdateInfo } from '../../redux/account/accountSlice';
import { useForm } from 'antd/es/form/Form';



const Account = (props) => {
    const {showModalAccount , setShowModalAccount , dataUser} = props
    const [imgShow , setImgShow] = useState(`${dataUser?.user?.avatar}`)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    console.log(dataUser)
    const onFinish = async (values) => {
        console.log('Success:', values);
        let res = await updateUserInfo(dataUser.user.id ,values.phone , values.username , imgShow )
        console.log(res)
        if(res && res.statusCode <= 201) {
            localStorage.removeItem('access_token')
            let resLogin = await fetchLoginUser(dataUser.user.email,dataUser.password , 0 )
            if(resLogin && resLogin.data && resLogin.statusCode == 201 ) {
                localStorage.setItem('access_token',resLogin.data.access_token )      
                dispatch(doLoginAction({
                    data : resLogin.data.user,
                    password : dataUser.password 
                }))   
            }
            
           
            setShowModalAccount(false)
            message.success("Update info successfully !")
        }
        }
    
    const onFinishChangePassowrd = async (values) => {
        console.log(values)
        const {email , newPassword , oldPassword} = values
        let res = await updateUserPassword(email,oldPassword,newPassword)
        console.log(res)
        if(res && res.statusCode == 201) {
            dispatch(doChangePassword(newPassword))
            setShowModalAccount(false)
            message.success("Update password successfully !")
            form.setFieldsValue({
                "oldPassword" : "",
                "newPassword" : ""
            })
        }else {
            message.error(res.message)
        }
    }
        
    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
            const res = await callUploadAvatarImg(file);
            console.log(res)
            if (res && res.data) {
                
                setImgShow(`${res.data.fileUploaded}`)
               
                onSuccess('ok')
            } else {
                onError('Đã có lỗi khi upload file');
            }
        };   

    
    const items = [
        {
          key: '1',
          label: `Thông Tin`,
          children: 
          <Row gutter={20}>
                <Col span={12}>
                    <Row  gutter={[50,50]} style={{height : '100%'}}>
                        <Col span={24}>
                                <Avatar
                                className='avatar-account'
                                src ={imgShow ? `https://backend-fresher.onrender.com/images/avatar/${imgShow}` : ''}
                                size={156}
                                icon={<AntDesignOutlined />}
                               />
                        </Col>

                        <Col span={24}>
                            <Upload 
                                className='upload-account'
                                maxCount={1}
                                multiple={false}
                                customRequest={handleUploadFileThumbnail}
                                showUploadList = {false}
                                
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>
               
                    
                </Col>

                <Col span={12}>
                <Form
                           name="basic"
                           onFinish={onFinish}
                            initialValues={{
                                "email" : dataUser.user.email,
                                "username" : dataUser.user.fullName,
                                "phone" : dataUser.user.phone
                            }}
                              
                       >

                            <Form.Item
                           label="Email"
                           
                           name="email"
                           labelCol={{span :24}}
                         
                           >
                           <Input  size="large" disabled/>
                           </Form.Item>

                           <Form.Item
                           label="Tên hiển thị"
                           name="username"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your name!',
                               },
                           ]}
                           >
                           <Input    placeholder="Name : Nguyễn Đức Anh" size="large" />
                           </Form.Item>

                           <Form.Item
                           label="Số điện thoại"
                           name="phone"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your phone!',
                               },
                           ]}
                           >
                           <Input  placeholder="Phone : 09876543120" size="large" />
                           </Form.Item>

                          
                           <Form.Item
                               
                           >
                           <Button  style={{width : '100%' , height : 60 , position: 'absolute' , bottom : -40 , fontSize : 20}} 
                           size="large"  type="primary" htmlType="submit">
                              UPDATE
                           </Button>
                           </Form.Item>
                       </Form>
                </Col>
          </Row>,
        },
        {
          key: '2',
          label: `Đổi Mật Khẩu`,
          children: <Row>
            <Col style={{margin :'20px auto'}} span={18}>
                <Form       
                            form={form}
                           name="changepasss"
                           onFinish={onFinishChangePassowrd}
                            initialValues={{
                                "email" : dataUser.user.email,
                                
                            }}
                              
                       >

                            <Form.Item
                           label="Email"
                           
                           name="email"
                           labelCol={{span :24}}
                         
                           >
                           <Input  size="large" disabled/>
                           </Form.Item>

                           <Form.Item
                           label="Mật khẩu cũ"
                           name="oldPassword"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your name!',
                               },
                           ]}
                           >
                           <Input    size="large" />
                           </Form.Item>

                           <Form.Item
                           label="Mật khẩu mới"
                           name="newPassword"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your phone!',
                               },
                           ]}
                           >
                           <Input.Password   size="large" />
                           </Form.Item>

                          
                           <Form.Item
                               
                           >
                           <Button  style={{width : '100%' , height : 60 , position: 'absolute' , bottom : -40 , fontSize : 20}} 
                           size="large"  type="primary" htmlType="submit">
                              Đổi mật khẩu
                           </Button>
                           </Form.Item>
                       </Form>
                </Col>
          </Row>,
        }
       
      ];

    const onChange = (key) => {
        console.log(key);
      };

    return (
        <> 
          <Modal
            title="TÀI KHOẢN CỦA BẠN"
            style={{
                marginTop  : 50,
            
                }}
            open={showModalAccount}
            onOk={() => setShowModalAccount(false)}
            onCancel={() => setShowModalAccount(false)}
            width={1000}
            okButtonProps={{className : "button-props"}}
            cancelButtonProps={{className : "button-props"}}
        >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
           
        </>
    )
}

export default Account