import { Row, Col , Space, Button , Divider , Empty , Steps , Form ,Input , Checkbox ,Result , notification, message} from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AntDesignOutlined ,  DeleteOutlined} from "@ant-design/icons"
import './order.scss'
import { useEffect, useRef, useState } from "react"
import { doChangeQuantity, doOrderSuccess, doRemoveItem } from "../../redux/order/orderSlice"
import { Link } from "react-router-dom"
import { fetchCreateNewOrder } from "../../service/api"

const Order = () => {
    const [totalPrice , setTotalPrice] = useState(0)
    const [showFormOrder , setShowFormOrder] = useState(false)
    const [currentStep , setCurrentStep] = useState(1)
    const [statusProgress ,setStatusProgress] = useState("process ")

 
    const dispatch = useDispatch()
    const dataCart  = useSelector(state => state.order.cart)
    const dataUser = useSelector(state => state.account.user)
    const items=[
        {
          title: 'Đơn Hàng',
        },
        {
          title: 'Đặt Hàng',
        },
        {
          title: 'Thanh Toán',
        },
      ]

    const formatter = new Intl.NumberFormat( {
        style: 'currency',
        currency: 'USD',
      

      });

    const handleChangeQuantity = (e , item) => {
        if(e.target.value >= 100) {
            e.target.value = 100
         
        }
        if(e.target.value <= 1) {
            e.target.value = 1
        }

       
       
        dispatch(doChangeQuantity({
            id : item.id  ,
            quantity :  e.target.value
        }))
    }

    const handleRemoveItem = (index) => {
        console.log(dataCart.length)
        dispatch(doRemoveItem(index))
       
    }


    const onFinish = async (values) => {
        console.log('Success:', values);
       
        let name = values.username
        let address = values.address
        let  phone = values.phone
        let  detail = dataCart.map(item => {
                  return {
                    bookName : item.detail.mainText,
                    quantity : item.quantity,
                    _id : item.id
                }
            })
        

        if(detail.length > 0) {
            let res = await fetchCreateNewOrder(name,address,phone,totalPrice,detail)
            console.log(res)
            if(res && res.statusCode == 201) {
                dispatch(doOrderSuccess())
                setCurrentStep(3)
                notification.open({
                    message: 'Bạn đã đặt hàng thành công ',
                    type : 'success',
                    description:
                      'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
                    
                  });
            }else {
                notification.open({
                    message: res.message,
                    type : 'error',
                    description:
                      'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
                    
                  });
                  return
            }
        }

   
      

    
        }

        

    
     
    useEffect(() => {
      let totalPrice = 0
      dataCart.forEach(item => {
        totalPrice += item.detail.total
      })
      if(dataCart.length < 1) {
        setStatusProgress("error")
    }
      setTotalPrice(totalPrice)
    },[dataCart])


    return ( 
        <>
            <Row style={{ padding: '50px 45px 0px 50px'}} >
                <Col className="progress-order" span={24}>
                    <Steps
                     status={statusProgress}
                    current={currentStep}
                    items={items}
                />
                </Col>
            </Row>

               {currentStep == 3 ? 
                <Result 
                status="success"
                title="Đơn hàng đã được đặt thành công!"
                
                extra={[
                  <Button style={{marginTop : 10}} type="primary" key="console">
                    <Link to='/history'> Xem lịch sử</Link>
                  </Button>,
                  <Button key="buy"><Link to = '/'>Về trang chủ</Link></Button>,
                ]}
              />
               : 
               <Row gutter={[75]} className="main-order">
              


               <Col  xs={24} sm={24} md={24} lg={24} xl={24}  xxl={showFormOrder ? 16 :19} >
                   {dataCart && dataCart.length > 0 ? dataCart.map((item,index) => {
                       return (
                           <Row  className="item-order" gutter={60} key={index}>
                               <Col xs={5} sm={5} md={5} lg={4} xl={3} xxl={3}>
                               <img className="lg-img" width={120} src = {`https://backend-fresher.onrender.com/images/book/${item.detail.img}`} />
                               </Col>
                               
                               <Col style={{lineHeight : '30px'}} xs={13} sm={11} md={9} lg={8} xl={7} xxl={7}>
                               <h3 className="lg-text">{item.detail.mainText} </h3>

                               </Col>

                               <Col className="lg-col-price"  style={{marginLeft : 50 , marginBottom : 25}}  xs={0} sm={0} md={0} lg={4} xl={3} xxl={3}>
                               <span className="price-item-order lg-price " >{formatter.format(item.detail.price)} đ</span>

                               </Col>

                               <Col style={{marginLeft : '10px', marginBottom : 23}} xs={0} sm={1} md={3} lg={3} xl={3} xxl={3}>
                               <input value={item.quantity} 
                                onChange={(e) => handleChangeQuantity(e,item)}  className="input-item-order lg-input" type="number" />

                               </Col>

                               <Col style={{marginLeft : '20px' ,  marginBottom : 29}} xs={0} sm={0} md={0} lg={0} xl={4} xxl={4} >
                               <span className="total-item-order">Tổng : {formatter.format(item.detail.total)} đ</span>

                               </Col>
                               <Col  style={{marginLeft : 'auto' ,marginBottom : 26}} xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                               <DeleteOutlined onClick={() => handleRemoveItem(index)} className="lg-icon" style={{fontSize : 20 , cursor : 'pointer' , color :'#1677ff'}} />

                               </Col>

                               <Col style={{position  : 'relative',marginTop : 50}} xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} >
                                   <Button ghost style={{position :'absolute' , bottom : 0 , right : 0}} type="primary" size="large">256.000 đ</Button>
                               </Col>
                           </Row>
                       )
                   }) : <>
                          <Empty style={{fontSize : 15 , fontWeight : 490 , backgroundColor : '#fff' , height : 400}}
                          description = {<Button  type="primary"><Link to= '/'>Về trang chủ sắm đồ</Link></Button>} imageStyle = {{height :250 }}/>
                           
                          
                       </>
                    }
                       
                       
                     
                       
                   
               </Col>

               {!showFormOrder ?   
               <Col style={{padding : '25px 20px' , backgroundColor : '#fdfdfd'}} xs={0} sm={0} md={0} lg={0} xl={0}  xxl={5}>
                   <div style={{display : 'flex' , justifyContent : 'space-between',  marginBottom : 50}}>
                       <span style={{fontSize : 18 , fontWeight : 500}}>Tạm tính</span>
                       <span style={{fontSize : 18 , fontWeight : 500}}>{formatter.format(totalPrice)} đ</span>

                   </div>
                   <Divider />
                   <div style={{display : 'flex' ,alignItems :'center', justifyContent : 'space-between' , margin : '50px 0'}}>
                       <span style={{fontSize : 20 , fontWeight : 700}}>{dataCart.length > 0 ? 'Tổng tiền' : 'Có méo gì đâu mà tính ?'}</span>
                       <span style={{fontSize : 27 , fontWeight : 700 , color : '#1677ff'}}>{formatter.format(totalPrice)} đ</span>

                   </div>
                   <Divider />
                   <Button onClick={() => {setShowFormOrder(true) 
                       setCurrentStep(2)} } disabled ={dataCart.length > 0 ?false : true} 
                       size="large" style={{height : 60, marginTop : 50 , width : '100%' , fontSize : 20 }} 
                         type="primary">
                        Mua hàng  ({dataCart.length})
                   </Button>
               </Col> :

               <Col style={{padding : '25px 20px' , backgroundColor : '#fdfdfd'}} xs={0} sm={0} md={0} lg={0} xl={0}  xxl={8}>
                       
                       <Form
                           name="basic"
                           onFinish={onFinish}
                           initialValues={{
                               "username" : dataUser.fullName,
                               "phone" : dataUser.phone
                           }}
                              
                       >
                           <Form.Item
                           label="Tên người nhận"
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
                           label="Địa chỉ"
                           
                           name="address"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your address!',
                               },
                           ]}
                           >
                           <Input  size="large" style={{height : 200 , fontSize : 18 , padding : 20}}/>
                           </Form.Item>

                         

                        
                           <Checkbox style={{marginTop : 15}}  checked ={true}>Thanh toán khi nhận hàng</Checkbox>
                       
                           <div style={{display : 'flex' ,alignItems :'center', justifyContent : 'space-between' , margin : '40px 0'}}>
                               <span style={{fontSize : 20 , fontWeight : 700}}>Tổng tiền : </span>
                               <span style={{fontSize : 27 , fontWeight : 700 , color : '#1677ff'}}>{formatter.format(totalPrice)} đ</span>

                           </div>
                           <Form.Item
                               
                           >
                           <Button disabled = {dataCart.length > 0 ? false : true}  style={{width : '100%' , height : 60 , position: 'absolute' , bottom : -40 , fontSize : 20}} 
                           size="large"  type="primary" htmlType="submit">
                               ĐẶT HÀNG  ({dataCart.length})
                           </Button>
                           </Form.Item>
                       </Form>
              </Col>}

               {!showFormOrder ? 
               
               <Col style={{padding : '25px 20px' , backgroundColor : '#fff',margin : '100px auto',position: 'relative',height :250 }} xs={20} sm={20} md={20} lg={20} xl={18}  xxl={0}>
                   {/* <div style={{display : 'flex' , justifyContent : 'space-between',  marginBottom : 50}}>
                       <span style={{fontSize : 18 , fontWeight : 500}}>Tạm tính</span>
                       <span style={{fontSize : 18 , fontWeight : 500}}>{formatter.format(totalPrice)} đ</span>

                   </div>
                   <Divider /> */}
                   <div style={{display : 'flex' ,alignItems :'center', justifyContent : 'space-between', marginTop : 20 }}>
                       <span style={{fontSize : 20 , fontWeight : 700 }}>Tổng tiền</span>
                       <span style={{fontSize : 27 , fontWeight : 700 , color : '#1677ff'}}>{formatter.format(totalPrice)} đ</span>

                   </div>
                   <Divider />
                   <Button  onClick={() => {setShowFormOrder(true) 
                       setCurrentStep(2)} } size="large" style={{height : 60, width : '95%' , fontSize : 20 ,position :'absolute',bottom : 10
                       }} type="primary">
                       Mua hàng  ({dataCart.length})
                   </Button>
               </Col> :
               
               <Col style={{padding : '25px 20px' , backgroundColor : '#fff',margin : '80px auto',position: 'relative'}} xs={20} sm={20} md={20} lg={20} xl={18}  xxl={0}>
                  <Form
                           name="basic"
                           onFinish={onFinish}
                           initialValues={{
                               "username" : dataUser.fullName,
                               "phone" : dataUser.phone
                           }}
                              
                       >
                           <Row gutter={34}>
                               <Col span={12}>
                                   <Form.Item
                                   label="Tên người nhận"
                                   name="username"
                                   labelCol={{span :24}}
                                   rules={[
                                       {
                                       required: true,
                                       message: 'Please input your name!',
                                       },
                                   ]}
                                   >
                                   <Input placeholder="Name : Nguyễn Đức Anh" size="large" />
                                   </Form.Item>

                               </Col>

                              <Col span={12}>
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
                              </Col>
                               
                           </Row>

                           <Form.Item
                           label="Địa chỉ"
                           
                           name="address"
                           labelCol={{span :24}}
                           rules={[
                               {
                               required: true,
                               message: 'Please input your address!',
                               },
                           ]}
                           >
                           <Input  type="textarea"  size="large" style={{height : 200 , fontSize : 28}}/>
                           </Form.Item>

                         

                        
                           <Checkbox style={{marginTop : 10}}   checked ={true}>Thanh toán khi nhận hàng</Checkbox>
                       
                           <div style={{display : 'flex' ,alignItems :'center', justifyContent : 'space-between' , margin : '50px 0'}}>
                               <span style={{fontSize : 20 , fontWeight : 700}}>Tổng tiền : </span>
                               <span style={{fontSize : 27 , fontWeight : 700 , color : '#1677ff'}}>{formatter.format(totalPrice)} đ</span>

                           </div>
                           <Form.Item
                               
                           >
                           <Button disabled = {dataCart.length > 0 ? false : true}   style={{width : '100%' , height : 60 , position: 'absolute' , bottom : -40 , fontSize : 20}} 
                           size="large"  type="primary" htmlType="submit">
                               ĐẶT HÀNG  ({dataCart.length})
                           </Button>
                           </Form.Item>
                       </Form>
               </Col>}


           </Row>}
        </>
    )
}


export default Order