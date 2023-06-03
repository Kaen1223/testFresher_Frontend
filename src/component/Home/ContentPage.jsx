import { Tabs } from 'antd';
import { Col, Row , Space , Card ,Rate , Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { fetchGetBookWithPaganigate, fetchSortBook, fetchSortBookByDate, fetchSortBookByPriceAtHomePage, fetchSortBookBySold } from '../../service/api';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doChangeListBook } from '../../redux/book_content/bookContentSlice';



const items = [
    {
        key: '0',
        label: `Tất Cả`,
      },

  {
    key: '-sold',
    label: `Phổ Biến`,
 
  },

  {
    key: '-updatedAt',
    label: `Hàng Mới`,

  },
  {
    key: 'price',
    label: `Giá Thấp Đến Cao`,

  },
  {
    key: '-price',
    label: `Giá Cao Đến Thấp`,

  },
];

const ContentPage = (props) => {
    const {dataListBook } = props
    const [keyCurrent , setKeyCurrent] = useState('0')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangePanaginate = async (page) => {
       
        if(keyCurrent != 0) {
            let res = await fetchSortBook(page,8,keyCurrent)
            
            if(res && res.statusCode == 200) {
              
              dispatch(doChangeListBook({
                listBook : res.data.result,
                total : res.data.meta.total,
                page : page
              }))    
            }

          }else {
          
            getBookWithPaganigate(page,8)
         }
        
      
        // setCurrent(page);
      };

    const onChange = async (key) => {
       setKeyCurrent(key)
        if(key ==0 ) {
            getBookWithPaganigate(1)
        }else {
          let res = await fetchSortBook(1,8,key)
          
          if(res && res.statusCode == 200) {
            dispatch(doChangeListBook({
              listBook : res.data.result,
              total : res.data.meta.total
            }))
            
           
             }
        }

      };

      useEffect(() => {
        getBookWithPaganigate(1)
      },[])

      const getBookWithPaganigate = async (currentPage) => {
      
            let res = await fetchGetBookWithPaganigate(currentPage , 8)
            
            if(res && res.statusCode == 200) {
                dispatch(doChangeListBook({
                  listBook : res.data.result,
                  total : res.data.meta.total,
                  page : currentPage
                }))
                
               
            }
      }


    const convertSlug = (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
      
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                 .replace(/\s+/g, '-') // collapse whitespace and replace by -
                 .replace(/-+/g, '-'); // collapse dashes
      
        return str;
      }

    const handleNavigate = (item) => {
      console.log(item)
      let bookName = convertSlug(item.mainText)
      navigate(`book/${bookName}?id=${item._id}`)
    
      }

      const formatter = new Intl.NumberFormat( {
        style: 'currency',
        currency: 'USD',

      });

      
    return (
   <>
        <div className='header-content'>
              <Tabs defaultActiveKey='0' items={items} onChange={onChange} />
        </div>
        <Row   gutter={{ xs: 8, sm: 16,  md: 24, lg: 32,}}>
            {dataListBook && dataListBook.listBookShow.length > 0 ?  dataListBook.listBookShow.map((item,index) => {
                    return (
                        <Col onClick={() => handleNavigate(item)} className='move-mid'  key={index}  >
                        <Card
                                hoverable
                                style={{
                                    width: 340,
                                height : 410,
                                margin:'20px 0'
                                }}
                                cover={<img style={{height : 250 , objectFit : 'cover'}}  
                                src={`https://backend-fresher.onrender.com/images/book/${item.thumbnail}`} />}
                            >
                                <div className='title-item'>{item.mainText}</div>
                                <div className='price-item'>{formatter.format(item.price)} VNĐ</div>
                                <div className='rating-item'>
                                     <Rate style={{fontSize : 14}} disabled defaultValue={10} />
                                     <span className="item-sold">Đã bán {item.sold}</span>
                                </div>
                        </Card>
                    </Col>
                    )
            }) : <>
                <Loading/>
            </>}
      
           
         
        </Row>
        <div className='panaginate'>
            {dataListBook && dataListBook.listBookShow.length > 0 ? 
             <Pagination current={dataListBook.currentPaniganate > 0 ? dataListBook.currentPaniganate : 1 }  
              total={dataListBook.totalBook > 0 ? dataListBook.totalBook : 100} pageSize={8} onChange={onChangePanaginate} /> 
             : <></> }
       
        </div>
        </>
)}

export default ContentPage