import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { DownloadOutlined , SearchOutlined ,UserAddOutlined , ImportOutlined , RedoOutlined , DeleteOutlined ,LinkedinOutlined } from '@ant-design/icons';

import * as XLSX from 'xlsx';
import { fetchGetListBookByName, fetchSortBookByDate, fetchSortBookByName, fetchSortBookByPrice } from '../../service/api';
import DrawerBox from './DrawerBox';
import ModelCreateBook from './ModelCreateBook';
import ModelUpdateBook from './ModelUpdateBook';
import ModelDeleteUser from './ModelDeleteBook';



const TableBook = (props) => {
let {listBook ,getListBookWithPanaginate ,setListBook ,setPanaginateBook , panaginateBook} = props
const [dataDrawer , setDataDrawer] = useState({})
const [openDrawer , setOpenDrawer] = useState(false)
const [isModalOpen , setIsModalOpen]  = useState(false)
const [isModalUpdateOpen , setIsModalUpdateOpen] = useState(false)
const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false)
const [dataUserUpdate , setDataUserUpdate] = useState([])
const dataBook = Array.from(listBook)
const data = dataBook.map((item,index) => {
    return {
        key : index,
        id : <Button onClick={() => showDrawer(item , index)} >{item._id}</Button> ,
        fullName : item.mainText,
        category : item.category,
        author : item.author,
        price : item.price,
        date : item.updatedAt,
        button : <Space> 
                    <Button onClick={() =>  handleDeleteUser(item)} type="primary" danger> <DeleteOutlined /> </Button> 
                    <Button onClick={() => handleUpdateUser(item)} style={{backgroundColor : 'orange' ,color : '#fff'}} > <LinkedinOutlined /> </Button>
                 </Space>
    }
})


const showDrawer = (item , index) => {
  setOpenDrawer(true)
  setDataDrawer(item)
}

const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '30%',
    
    },
    {
      title: 'Tên Sách',
      dataIndex: 'fullName',
      sorter: true,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
   
    },
    {
      title: 'Tác Giả',
      dataIndex: 'author',
   
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      sorter: true,
    },
    {
        title: 'Ngày Cập Nhật',
        dataIndex: 'date',
        sorter: true,
    },
    {
        title: 'Action',
        dataIndex: 'button'
    },
  ];

const onChange = async (pagination, filters, sorter, extra) => {
        console.log(sorter)
        setPanaginateBook({...panaginateBook , current : pagination.current })
        if(sorter.field == 'fullName') {
            let res = await fetchSortBookByName(panaginateBook.current , panaginateBook.pageSize,sorter.field)
             
             if(res && res.statusCode == 200) {
                console.log('res',res)
                setListBook(res.data.result)
             }
        }

        if(sorter.field == 'price') {
            let res = await fetchSortBookByPrice(panaginateBook.current , panaginateBook.pageSize,sorter.field)
             console.log(res)
             if(res && res.statusCode == 200) {
                setListBook(res.data.result)
             }
        }

        
        if(sorter.field == 'date') {
            let res = await fetchSortBookByDate(panaginateBook.current , panaginateBook.pageSize)
             console.log(res)
             if(res && res.statusCode == 200) {
                setListBook(res.data.result)
             }
        }
    


    };

const handleOnlickRefresh = () => { 
  fetchGetAllBook()
}

const handleExport = async () => {
  let res = await fetchListUserPaganigate(dataChangePanaginate.current,dataChangePanaginate.pageSize)
  if(res && res.statusCode == 200) {
    const data = res.data.result
    const newData = data.map(item => {
       return {
      fullName : item.fullName,
      email : item.email,
      phone : item.phone,
    }

    
  })
  if(newData) {
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  }

   

}

  }

const handleUpdateUser = (item) => {
  console.log(item)
  setIsModalUpdateOpen(true)
  setDataUserUpdate(item)
}

const handleDeleteUser = (item) => {
  setIsModalDeleteOpen(true)
  setDataUserUpdate(item)

}




  return (
    <>
    <ModelDeleteUser   getListBookWithPanaginate = {getListBookWithPanaginate} 
     dataUserUpdate = {dataUserUpdate} setIsModalOpen = {setIsModalDeleteOpen}
     isModalOpen = {isModalDeleteOpen} />
     
  {/* <ModelImportListUser getAllUser = {getAllUser} setIsModalOpen = {setIsModalImportOpen} isModalOpen = {isModalImportOpen}  /> */}
      <ModelUpdateBook  dataUserUpdate = {dataUserUpdate} getListBookWithPanaginate= {getListBookWithPanaginate} 
      setIsModalOpen = {setIsModalUpdateOpen} isModalOpen = {isModalUpdateOpen} />
      <ModelCreateBook  getListBookWithPanaginate = {getListBookWithPanaginate}
       setIsModalOpen = {setIsModalOpen} isModalOpen = {isModalOpen} /> 

      <DrawerBox openDrawer = {openDrawer} setOpenDrawer = {setOpenDrawer} dataDrawer = {dataDrawer}/> 
     <div style={{marginTop : 50 , padding : 10 , display : 'flex' , justifyContent : 'space-between'}} >
        <h3>TABLE LIST BOOKS</h3>
        <Space>
            <Button onClick={() => setIsModalOpen(true) }  type="primary" icon={<UserAddOutlined />} >
            Add New Book
            </Button>
            <Button onClick={() => setIsModalImportOpen(true) } type="primary" icon={<ImportOutlined  />} >
                Import
            </Button>
            <Button  onClick={() => handleExport(data) } type="primary" icon={<DownloadOutlined />} >
                Export
            </Button>
            <Button onClick={() => handleOnlickRefresh() 
            } shape="circle" icon={<RedoOutlined  />} />
        </Space>
      

       
     </div>
    <Table dataSource={data} columns={columns}  onChange={onChange} 
             pagination =  {{current :panaginateBook.current , pageSize :panaginateBook.pageSize } } />
    </>
  )
}

export default TableBook;