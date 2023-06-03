import { Row ,Col, Divider} from "antd"
import './history.scss'
import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOrderHistory } from "../../service/api";


const History = () => {
    const [dataOrder , setDataOrder] = useState([])
    const [currentPage , setCurrentPage ] = useState(1)
    const columns = [
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
          
        },
        {
          title: 'Thời Gian',
          dataIndex: 'time',
          key: 'time',
        },
      
        {
            title: 'Tổng số tiền',
            dataIndex: 'total',
            key: 'total',
          },
        {
          title: 'Trạng thái',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },

        {
             title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'action',
             
            },

        {
          title: 'Tên sản phẩm',
          dataIndex: 'detail',
          key: 'action',
         
        },
       
      ];
    
      useEffect(() => {
        fetchGetListOrder()
      },[])

      const formatter = new Intl.NumberFormat( {
        style: 'currency',
        currency: 'USD',
      

      });

      const fetchGetListOrder = async () => {
        let res = await getOrderHistory()
        console.log(res)
        if(res && res.statusCode == 200) {
            let detailCurrent = []
            // res.data.forEach((order,index) => {
            //     let detailNew = Object.assign({}, order.detail)
            //     detailCurrent.push(detailNew)
            // })
            res.data.forEach((order,index) => {
                let detailNew = order.detail
                detailCurrent.push(detailNew)
            })

            console.log(detailCurrent)


            let resData = res.data.map((item,index) => {
                return {
                    key : `${index}`,
                    stt : index + 1,
                    time : item.updatedAt,
                   
                    total : `${formatter.format(item.totalPrice)} đ`,
                    tags: ['done'],
                    detail: <ul>
                      { detailCurrent[index].map((order,index) => {
                      return <li key={index} style={{margin :'5px 0', fontWeight : 600}}> {order?.bookName}  </li>
                    })}
                    </ul>,
               
                    quantity: detailCurrent[index].map((order,index) => {
                      return <div key={index} style={{margin :'5px 15px' , fontWeight : 600}}>{order?.quantity}</div>
                    }),
              
                    

                }
               
            })

            setDataOrder(resData)
        }
      }

      const onChange = async (pagination, filters, sorter, extra) => {
        console.log(sorter)
        setCurrentPage(pagination.current)
       
    


    };

      
    return (
        <Row className="main-history">
            <Col span={24}>
                <div className="title-bistory">LỊCH SỬ ĐẶT HÀNG </div>
            </Col>
            <Divider/>
            <Col span={24}>
                  <Table columns={columns} dataSource={dataOrder} onChange={onChange} 
                    pagination =  {{current :currentPage , pageSize :7 } }
                  />
            </Col>
        </Row>
    )
}

export default History