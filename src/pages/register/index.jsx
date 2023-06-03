import { Button, Form, Input , notification , Space , message } from 'antd';
import './register.scss'
import { fetchRegisterUser } from '../../service/api';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Register = () => {
    const navigate = useNavigate()
    const [isLoading , setLoading] = useState(false)
    const onFinish = async (values) => {
        setLoading(true)
        const res = await fetchRegisterUser(values.fullname , values.email , values.password , values.phone)
        setLoading(false)

        console.log(res)
        if(res && res.data && res.statusCode == 201) {
            message.success('Tạo tài khoản thành công !')
            navigate('/login')
           
        }else {
            notification.error({
                message: 'Có lỗi xảy ra !',
                description : res.message
            })
        }
    }

 
    return (
        
        <div className='register-container'>

           <div className='form-main'>
           <h2>Register</h2>
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
                            label="Full name"
                            name="fullname"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your full name!',
                                },
                            ]}
                            >
                            <Input />
                        </Form.Item>

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
                            labelCol={{span :24}}
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your phone!',
                                },
                            ]}
                            >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                            >
                            <Button type="primary" htmlType="submit"  loading = {isLoading}>
                                Submit
                            </Button>
                        </Form.Item>
                </Form>
               
                <span className='span-login' >Already have an account? {<Link className='link-login' to= '/login'>Login here !</Link>} </span>
           </div>
        </div>
    )
}

export default Register