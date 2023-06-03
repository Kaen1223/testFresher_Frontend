import { useLocation } from "react-router-dom"
import { Col, Row ,Image , Space , Card ,Rate , Pagination ,Modal ,Button , message} from 'antd';
import { useEffect, useRef, useState } from "react";
import ImageGallery from 'react-image-gallery';
import './bookpage.scss'

import { AntDesignOutlined ,CarOutlined ,  ShoppingCartOutlined , PlusOutlined  , MinusOutlined } from "@ant-design/icons"
import BookLoading from "./BookLoading";
import { getBookById } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { doAddItemToCart } from "../../redux/order/orderSlice";



const BookPage = () => {
    const [open, setOpen] = useState(false);
    const [indexActive , setIndexActive] = useState(0)
    const [indexActiveDetail , setIndexActiveDetail] = useState(0)
    const [dataBook , setDataBook] = useState({})
    const [bookImage , setBookImage] = useState([])
    const dispatch = useDispatch()
    const ref = useRef()
    const location = useLocation()
    let param = new URLSearchParams(location.search)
    const id = param?.get("id")
    console.log(id)

    const handleMove = () => {
        setOpen(true)
    }
   
    

    const  handleAdditional = () => {
        let number = Number(ref.current.value)
        if(number >= 1000) {
            ref.current.value = 1000
            return
        }
        ref.current.value = number + 1
    }

    const  handleReduce = () => {
        let number = Number(ref.current.value)
        if(number <= 1) {
            ref.current.value = 1
            return
        }
        ref.current.value = number - 1
    }

    const handleChangeInput =(e) => {
        if(e.target.value >= 1000) {
            ref.current.value = 1000
            return
        }
        if(e.target.value <= 1) {
            ref.current.value = 1
            return
        }
    }

    useEffect(() => {
        getBookDetail()
    },[])


    const getBookDetail = async () => {
            let res = await getBookById(id)
            console.log(res)
            if(res && res.statusCode == 200) {
                let listBookImg = {
                    original :'https://backend-fresher.onrender.com/images/book/'+ res.data.thumbnail,
                    thumbnail : 'https://backend-fresher.onrender.com/images/book/'+ res.data.thumbnail
                }
                let listImgSlider =  res.data.slider?.map(item => {
                        return {
                            original :'https://backend-fresher.onrender.com/images/book/'+item,
                            thumbnail : 'https://backend-fresher.onrender.com/images/book/'+item
                        }
                })

                if(listImgSlider.length > 0) {
                    listImgSlider.unshift(listBookImg)
                    setBookImage(listImgSlider)
                    
                }else {
                    setBookImage([...bookImage,listBookImg])
                }
                setDataBook(res.data)
              

            }
    }

    const formatter = new Intl.NumberFormat( {
        style: 'currency',
        currency: 'USD',
      

      });

    const handleAddItem = () => {
        let dataAdd = {
            quantity : +ref.current.value,
            id : dataBook._id,
            detail : {
                thumbnail : dataBook.thumbnail,
                mainText : dataBook.mainText,
                price : dataBook.price,
                total : ref.current.value * dataBook.price
            }
        }
        message.success("Thêm mới sách vào giỏ hàng !!!")
        dispatch(doAddItemToCart(dataAdd))
    }

    return (
        <>
            {Object.keys(dataBook).length > 0 ? 
              <div className="book-page">
              <Row className="main-bookpage" >
                  <Col className="gallery-book" span={8}>
                       <ImageGallery
                            showThumbnails={false}
                         showPlayButton ={false} 
                         showBullets = {false} 
                         showNav = {false}  
                          items={bookImage}
                          startIndex = {indexActive}
                          onClick={handleMove}
                          showFullscreenButton = {false}
                           />
                           <Space style={{ backgroundColor :'#fff' , width : '100%',borderLeft : '3px solid #dddddd'}}>
                                  {bookImage.map((item,index) => {
                              
                              return (<Col key={index} style={{padding:0 , margin : '10px 0' }} 
                              className={indexActive == index ? "active" : ""} >
                              
                              <Image
                                                  width={'100%'}
                                                  height={70}
                                                  className="image-bookpage"
                                                  preview = {false}
                                                 
                                                  onMouseOver={(e) =>setIndexActive(index) }
                                                  src={item.original}
                                              />
                              
                              </Col>
                                  
                                      
  
                                  
                              )})}
                          </Space>
  
                  </Col>
  
                   <Col span={16}  style={{padding : '20px 60px' , backgroundColor : '#fff'}} >
                      <div className="author">
                          <span className="main-author">Tác giả : </span> 
                          <span className="line-auther">{dataBook.author}</span>
                      </div>
  
                      <div className="text-book">{dataBook.mainText}</div>
                      
                     
                      <div className="price-book">
                          <h2>{formatter.format(dataBook.price)} đ</h2>
                      </div>
                      <div className='rating-item-bookpage'>
                                       <Rate style={{fontSize : 14}} disabled defaultValue={10} />
                                       <span className="item-sold">Đã bán {dataBook.sold}</span>
                       </div>

  
                      <div className="ship-book">
                          <span className="light-text">Vận Chuyển</span>    
                          <Space>
                                  < CarOutlined className="icon-ship" /> <span className="bold-text">Miễn phí vận chuyển</span> 
                          </Space>     
                          
                      </div>
                      <div className="quantity">
                          <div className="text-quantity"> Số lượng</div>
                          <div className="btn-quantity">
                            <button onClick={() => handleReduce()}><MinusOutlined/>
                            </button> 
                            <input onChange={(e) => handleChangeInput(e)} defaultValue={1} ref={ref} type="number"></input>
                            <button onClick={() => handleAdditional() }><PlusOutlined/></button>
                          </div>
                      </div>
  
                     
  
                      <div className="btn-buy">
                           <Button onClick={() => handleAddItem()} style={{height: 50}} size='large'   type="primary" > 
                                <ShoppingCartOutlined style={{fontSize:20}}/>
                                  Thêm vào giỏ hàng
                              </Button>
                              <Button className="btn-buy-now" ghost = {true} type="primary"  size='large'   >
                                  Mua ngay
                              </Button>          
                      </div>
                      
                  </Col>                     
              </Row>
             
  
              <Modal
                  okButtonProps={{className : "button-props"}}
                  cancelButtonProps={{className : "button-props"}}
                  okText = 'Cancel'
                  cancelText = ''
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={'70vw'}
                  
                  
               >
                   <Row>
                      <Col style={{height : 700}} span={18}>
                          <ImageGallery
                          ref={ref}
                          showIndex = {true}
                          showPlayButton ={false} 
                          showThumbnails={false}
                          startIndex = {indexActiveDetail}
                          onSlide={(i) =>setIndexActiveDetail(i)}
                          items={bookImage}
                          thumbnailPosition="right"
                       
                          
                      />
                      </Col>
                      <Col span={6}>
                          <span style={{fontSize : 17 , fontWeight : 600 , textAlign : 'center'}}>{dataBook.mainText}</span>
                         <Row style={{marginTop : 30}} >
                        {bookImage.map((item,index) => {
                         
                              return (<Col  key={index} style={{padding:0 , margin : '10px 5px' }} 
                              className={indexActiveDetail == index ? "active" : ""} span={10}>
                              
                              <Image
                                                  width={'100%%'}
                                                  height={130}
                                                  className="image-bookpage"
                                                  preview = {false}
                                                  onClick={(e) =>setIndexActiveDetail(index) }
                                                  src={item.original}
                                              />
                              
                              </Col>
                                 
                                     
  
                                 
                             )})}
                          </Row>
                      </Col>
                   </Row>
  
              </Modal>
              </div> : 
                 <BookLoading/>}
        </>
      
     
    )
}

export default BookPage