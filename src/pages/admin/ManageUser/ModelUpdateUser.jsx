import {  Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input , message } from 'antd';
import { fetchCreateUser, fetchUpdateUser } from '../../../service/api';


const ModelUpdateUser = (props) => {
 const {isModalOpen , setIsModalOpen ,dataUserUpdate, getAllUser} = props
 const [form] = Form.useForm();


  const handleOk = () => {
    form.submit()
    
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
        console.log(values)
        let res = await fetchUpdateUser(dataUserUpdate?._id , values.username , values.email , values.phone)
        if(res && res.statusCode == 200) {
            message.success('Update user thành công !')    
            setIsModalOpen(false);
            getAllUser()
        }else {
            message.error(res.message)  
        }
  };

  useEffect(() => {
    form.setFieldsValue({
        username : dataUserUpdate?.fullName,
        email :dataUserUpdate?.email,
        phone : dataUserUpdate?.phone,
    
    })

    
  },[dataUserUpdate])


  return (
    <>
     
      <Modal forceRender  title="Update user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
export default ModelUpdateUser;