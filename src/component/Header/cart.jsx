
import { AntDesignOutlined ,  ShoppingCartOutlined} from "@ant-design/icons"
import { Avatar, Badge, Space,Button, Popover, Divider  } from 'antd';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dataCart  = useSelector(state => state.order.cart)
  const navigate = useNavigate()
 
  const content = (
    
    dataCart.length > 0 ? <>
      {dataCart.map((item,index) => {
      return (
        
        <>
          <div key={index} className="item-cart" style={{width : 500 , display : 'flex' ,  margin :'15px 0'}}>
          <div style={{ display : 'flex' , width : '75%' ,}}>
            <img width={60} height={70} src={`https://backend-fresher.onrender.com/images/book/${item.detail.img}`} alt="image" />
            <p style={{margin : '0 10px' , fontSize :15 ,fontWeight :600 }}>{item.detail.mainText} </p>
          </div>

          <span style={{marginLeft : 'auto' , color: '#1677ff' ,  fontSize :15 , fontWeight :600}}>
               {item.detail.price} đ
          </span>
          
        </div>
        <Divider/>
        </>
        
      
      
      )}) }
      <div style={{width : '100%' , position : 'relative' , marginTop : 100}}>
       <Button onClick={() => navigate('order') } style={{width : 300,fontWeight : 490 ,position :'absolute' , bottom : 0 , right : '50%' , transform : 'translateX(50%)'}} 
       size="large" type="primary" >Xem giỏ hàng</Button>
      </div>
    </>
      
    : <>
      Bạn chưa có sản phẩm nào được thêm vào giỏ hàng
    </>
   
    
  );
  return (
    <>
      <Space size="middle">

      <Popover content={content}  trigger="hover" >
          <Badge   count={dataCart.length } showZero>
          <ShoppingCartOutlined   style={{fontSize : 27 , color :'#1677FF' , marginLeft : 20 , cursor : 'pointer' }}  />
        </Badge>
      </Popover>
          
        
    </Space>
    
    </>
  )
 
  };
export default Cart;