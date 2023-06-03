import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import TableBook from './TableBook';
import { useState , useEffect } from 'react';
import { fetchGetAllBook, fetchGetListBook, fetchGetListBookByName } from '../../service/api';


const ManageBox = () => {
    const [form] = Form.useForm();
    const [listBook , setListBook] = useState([])
    const [panaginateBook , setPanaginateBook] = useState({
        current : 1,
        pageSize : 7
    })
    // const dataChangePanaginate = useSelector(state => state.panaginate)

    // console.log('main',dataChangePanaginate)
    const onFinish = async (values) => {
       console.log(values)
          let res =  await fetchGetListBookByName(1,2,values.name.trim())
         
          if(res && res.statusCode == 200 && res.data.result.length > 0) {
            setListBook(res.data.result)
          }
        
      };


    useEffect(() => {
        getListBookWithPanaginate()
        },[])
    

    const getListBookWithPanaginate = async () => {
        let res = await fetchGetAllBook()
        console.log(res)
        if(res && res.statusCode == 200) {
            setListBook(res.data)
        }
    }
   
  
    return (
        <>
        <Form
        name="basic"
        form= {form}
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
                    label="Search Book Name "
                    name="name"
                
                    >
                    <Input  />
                </Form.Item>
            </Col>
            
            <Col span={6} style={{ textAlign: 'right' , marginTop : 40}}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.setFieldsValue({name : ""})
                            }}
                        >
                            Clear
                        </Button>
                       
                    </Col>
        </Row>
    
            
       
      </Form>
      <TableBook panaginateBook = {panaginateBook} getListBookWithPanaginate = {getListBookWithPanaginate}
      setPanaginateBook = {setPanaginateBook} listBook = {listBook} setListBook = {setListBook}/>
      </>
    )
  };

export default ManageBox