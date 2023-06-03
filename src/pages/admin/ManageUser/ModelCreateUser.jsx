import {  Modal } from 'antd';
import { useState } from 'react';
import { Button, Checkbox, Form, Input , message } from 'antd';
import { fetchCreateUser } from '../../../service/api';


const ModelCreateUser = (props) => {
 const {isModalOpen , setIsModalOpen , getAllUser} = props
 const [form] = Form.useForm();


  const handleOk = () => {
    form.submit()
    
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {

    createNewUser(values.username,values.password,values.email,values.phone)
  };

  const createNewUser = async (fullName ,  password, email  , phone) => {
    let res = await fetchCreateUser(fullName ,  password, email  , phone)
    if(res && res.statusCode == 201) {
        setIsModalOpen(false);
        message.success('Tạo user mới thành công !')    
        form.setFieldsValue({
            username : "",
            password : "",
            email : "",
            phone : "",

        })
        getAllUser()
    }else {
        message.error(res.message)   
    }

  }

  return (
    <>
     
      <Modal title="Add New User " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
            form={form}
            style={{
            marginTop  : 50,
            maxWidth: 600,
            }}
          
            onFinish={onFinish}
          
        >
            <Form.Item
             labelCol={{span :24}}
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
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
            label="Phone"
            name="phone"
            rules={[
                {
                required: true,
                message: 'Please input your phone number!',
                },
            ]}
            >
            <Input />
            </Form.Item>
           
        </Form>
      </Modal>
    </>
  );
};
export default ModelCreateUser;