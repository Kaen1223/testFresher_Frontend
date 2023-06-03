import { FilterOutlined ,RedoOutlined , SettingOutlined} from '@ant-design/icons';
import { Checkbox, Col, Row } from 'antd';
import { Cascader, Input, Select, Space ,Button , Rate ,Form,    Divider} from 'antd';
import './HomePage.scss';
import { useEffect, useRef, useState } from 'react';
import { callFetchCategory, fetchGetAllBook, fetchGetBookWithPaganigate } from '../../service/api';
import { useDispatch } from 'react-redux';
import { doChangeListBook } from '../../redux/book_content/bookContentSlice';

const SideBar = (props) => {
    const {dataListBook } = props
    const [category , setCategory] = useState([])
    const [form] = Form.useForm()
    const ref = useRef()
    const dispatch = useDispatch()

    const onChange = async (checkedValues) => {
        let res = await fetchGetAllBook()
        console.log(res)
        if(res && res.statusCode == 200) {
                 let dataFilter = []
                 res.data.map(item => {
                    checkedValues.forEach(category => {
                        if(item.category == category) {
                            dataFilter.push(item)
                        }
                    })
                })
                console.log(dataFilter)
                dispatch(doChangeListBook({
                listBook : dataFilter,
                total : 9,
                page : 1
              })) 
        }
       
        
      };

      useEffect(() => {
        getCategory()
      },[])

      const getCategory =  async () => {
        let res = await callFetchCategory()
        console.log(res)
        if(res && res.statusCode == 200) {
            setCategory(res.data)
        }
      }
      console.log(dataListBook)

      const onFinish = async (values) => {
        const {maxPrice , minPrice} = values
       
        let res = await fetchGetAllBook()
        if(res && res.statusCode == 200) {
                 let dataFilter = []
                 res.data.map(item => {
                   if(+minPrice <= item.price && item.price <= +maxPrice) {
                        dataFilter.push(item)
                   }
                })
           
                dispatch(doChangeListBook({
                    listBook : dataFilter,
                    total : 9,
                    page : 1
                  })) 
        }
      };
      
      const handleReset = async () => {
        let res = await fetchGetBookWithPaganigate(1 , 8)
        console.log(res)
        if(res && res.statusCode == 200) {
            dispatch(doChangeListBook({
              listBook : res.data.result,
              total : res.data.meta.total,
              page : 1
            }))
            
            form.setFieldsValue({
                minPrice : "",
                maxPrice : ""
              })
        
        }
            
             
      }
    return ( 
    <>
        <div className="header-sidebar">
            <div className="filter">
                  <FilterOutlined className='icon-sidebar' />
                  <span>Bộ lọc tìm kiếm</span>
            </div>
            <RedoOutlined onClick={() => handleReset()} className='icon-sidebar' />
        </div>
        <Divider plain></Divider>

        <div className="category-sidebar">
            <div className="category"> 
                  <span>Danh mục sản phẩm </span>
                  <Checkbox.Group
                        style={{
                        width: '100%',
                        marginTop : 20
                        }}
                        onChange={onChange}
                    >
                        <Row>
                            {category && category.length > 0 ? category.map((item,index) => {
                                    return (
                                        <Col key={index} span={24}>
                                           <Checkbox  ref={ref} value={item}>{item}</Checkbox>
                                        </Col>
                                    )
                            }) : <></>}
                       
                        </Row>
                </Checkbox.Group>
            </div>
  
        </div>
        <Divider plain></Divider>
        <div className='price-sidebar'>
             <span>Khoảng giá :  </span>
             <div className='range'>
                        <Form
                            name="basic"
                    
                            style={{
                            maxWidth: 600,
                            }}
                            form={form}
                            onFinish={onFinish}
                         
                            autoComplete="off"
                        >
                        <Space>
                                <Form.Item
                       
                                    name="minPrice"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input min price!',
                                        },
                                    ]}
                                    >
                                    <Input size='large' form={form} type='number' name='min-price' addonBefore={' MIN'} defaultValue="0"  />  
                                    </Form.Item>
                            
                                    <Form.Item
                                    
                                    name="maxPrice"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input  max price!',
                                        },
                                    ]}
                                    >
                                        <Input size='large' type='number' name='max-price'  addonAfter={' MAX'} defaultValue="0"  />
                                    </Form.Item>

                    
                        </Space>

                         <Form.Item
                            wrapperCol={{
                               
                                span: 24,
                            }}
                            >
                            <Button size='large'  style={{marginTop : 30 , width : '100%'}} type="primary" htmlType="submit">
                                Áp dụng
                            </Button>
                       </Form.Item>
                       </Form>
                  
             </div>
            
        </div>     
        <Divider plain></Divider>
        <div className='rating-sidebar'>
              <span>Đánh giá</span>       
              <div className='star'>
             
    
                 <Row>
                        <Col span={24}>
                             <Rate disabled defaultValue={10} />
                             <Rate style={{marginLeft : 8}} disabled defaultValue={10} />
                        </Col>
                        <Col span={24}>
                        <Rate disabled defaultValue={10} />
                        <Rate style={{marginLeft : 8}} disabled defaultValue={4} />
                        </Col>
                        <Col span={24}>
                        <Rate disabled defaultValue={10} />
                        <Rate style={{marginLeft : 8}} disabled defaultValue={3} />
                        </Col>
                        <Col span={24}>
                        <Rate disabled defaultValue={10} />
                        <Rate style={{marginLeft : 8}} disabled defaultValue={2} />
                        </Col>
                        <Col span={24}>
                        <Rate disabled defaultValue={10} />
                        <Rate style={{marginLeft : 8}} disabled defaultValue={1} />
                        </Col>
                 </Row>
            </div>       
        </div>         
        


    </>
)}

export default SideBar