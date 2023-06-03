import { AntDesignOutlined ,  ShoppingCartOutlined} from "@ant-design/icons"
import { Button, Input } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import './header.scss'
import { Col, Row } from 'antd';
import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./dropdown";
import { Link } from "react-router-dom";
import { doChangeListBook } from "../../redux/book_content/bookContentSlice";
import { fetchGetAllBook } from "../../service/api";




const Header = () => {
    const dataUser  = useSelector(state => state.account)

    const dispatch = useDispatch()


    const handleChangeInput = async (e) => {
        let res = await fetchGetAllBook()
        if(res && res.statusCode == 200) {
            let newData =  res.data.filter(item => {
                return  item.mainText.toLowerCase().includes(e.target.value)
            })
            if(newData.length > 0) {
                dispatch(doChangeListBook({
                    listBook : newData,
                    total : 1,
                    page : 1
                  })) 
             }
        }
        
       
         
       
       
    }


    return ( 
        
        <Row className="home-header">
        

                <Col   xs={1} sm={7} md={10} lg={6} xl={8} xxl={6} >
                          <Link to = '/'>

                                  <div className="title-header-main">

                                    <div className="icon-header">
                                        
                                        <AntDesignOutlined spin = {true} style={{fontSize : 40 , color :'#1677FF'}} />
                                    </div>

                                    <div className="title-header hide">Seoul Store</div>
                                </div>
                            </Link>
                    
                </Col>

                
                <Col xs={0} sm={0} md={0} lg={5} xl={9}  xxl={11} >
                     <div className="search-cart-header">

                        <Input onChange={(e) => handleChangeInput(e)}  size="large" className="input-search" placeholder="Search " />
                        <Cart />
                    </div>
                </Col> 
            
                <Col style={{marginLeft : 'auto'}}   xs={21} sm={17} md={14} lg={11} xl={7} xxl={7} >
                        <div className="dropdown-header">
                            {dataUser && dataUser.isLogOut == false && dataUser.isAuthenticated == true ? 
                                <DropDown dataUser = {dataUser}/> :
                               <Space style={{display : 'flex'}}  wrap>
                               <Button><Link to='/login'>Login</Link></Button>
                               <Button className="hide" style={{marginLeft : 15}} type="primary"><Link to='/register'>Sign up</Link></Button>
                              
                             </Space>
                             
                             }
                           

                    </div>
                </Col>

               
      </Row>
        
        
            
       
    )
}

export default Header