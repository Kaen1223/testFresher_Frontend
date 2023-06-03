import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import TableUser from './TableUser';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doChangePanaginate } from '../../../redux/tablePanaginate/tablePanaginateSlice';
import { fetchSearchUser } from '../../../service/api';
import { fetchAllUser } from '../../../service/api';



const ManageUser = () => {
    const dispatch = useDispatch()
    const [listUser , setListUser] = useState([])
    // const dataChangePanaginate = useSelector(state => state.panaginate)

    // console.log('main',dataChangePanaginate)
    const onFinish = async (values) => {
       
          let res =  await fetchSearchUser(1,2,values.email)
         
          if(res && res.statusCode == 200 && res.data.result.length > 0) {
            console.log(res)
                let payload= {
                    current : 1,
                    pageSize : 2
                }
               dispatch(doChangePanaginate(payload))
               setListUser(res.data.result)
          }
        
      };


    useEffect(() => {
        getAllUser()
        },[])
    
    const getAllUser = async () => {
        let res = await fetchAllUser()
        if(res && res.statusCode == 200) {
            setListUser(res.data)
        }
    }
   
    return (
        <>
        <Form
        name="basic"
     
        style={{
          maxWidth: 'none',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
            <Col span={8}>
                <Form.Item
                        labelCol={{span :24}}
                    label="Name"
                    name="username"
                
                    >
                    <Input />
                </Form.Item>
            </Col>
    
            <Col span={8}>
                    <Form.Item
                labelCol={{span :24}}
                label="Email"
                name="email"
                
                >
                   <Input />
                </Form.Item>
            </Col>
    
            <Col span={8}>
                    <Form.Item
                labelCol={{span :24}}
                label="Phone Number"
                name="phone"
                
                >
                  <Input />
                </Form.Item>
            </Col>
        </Row>
    
            <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                       
                    </Col>
       
      </Form>
      <TableUser setListUser = {setListUser} listUser = {listUser} getAllUser = {getAllUser}/>
      </>
    )
  };
export default ManageUser;