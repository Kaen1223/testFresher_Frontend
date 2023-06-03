import { Button, Form, Input , notification , Space , message } from 'antd';
import '../register/register.scss'
import { fetchLoginUser, fetchRegisterUser } from '../../service/api';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';




const Login = () => {
    const [isLoading , setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const dispatch = useDispatch()
 

    const onFinish = async (values) => {
        setLoading(true)
        const res = await fetchLoginUser(values.email , values.password , 3000)
        setLoading(false)

        console.log(res)
        if(res && res.data && res.statusCode == 201) {
            localStorage.setItem('access_token',res.data.access_token )      
            dispatch(doLoginAction({
                data : res.data.user,
                password : values.password
            }))      

            message.success('Đăng nhập thành công !')      
            navigate('/')
           
        }else {
            notification.error({
                message: 'Có lỗi xảy ra !',
                description : res.message
            })
        }
    }

 
    return (
        
        <div className='register-container'>
             {contextHolder}
           

           <div className='form-main'>
           <h2>Login</h2>
                    <Form
                        name="basic"
                        labelCol={{
                        span: 8,
                        }}
                        wrapperCol={{
                        span: 16,
                        }}
                        style={{
                        minWidth: 600,
                        marginLeft: 200
                        
                        }}
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                       
                        <Form.Item
                            labelCol={{span :24}}
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your email!',
                                },
                            ]}
                            >
                                <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{span :24}}
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                                <Input.Password />
                        
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                            >
                            <Button type="primary" htmlType="submit" loading = {isLoading}>
                                Submit
                            </Button>
                        </Form.Item>
                </Form>
                <span className='span-login' >Do not have an account ? {<Link className='link-login' to= '/register'>Resgister here !</Link>} </span>
           </div>
        </div>
    )
}

export default Login