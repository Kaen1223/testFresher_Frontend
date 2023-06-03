import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doChangePanaginate } from '../../../redux/tablePanaginate/tablePanaginateSlice';
import { isArray } from 'lodash';
import { fetchListUserPaganigate, fetchSortUserByEmail, fetchSortUserByName } from '../../../service/api';
import { Button, Space } from 'antd';
import { DownloadOutlined , SearchOutlined ,UserAddOutlined , ImportOutlined , RedoOutlined , DeleteOutlined ,LinkedinOutlined } from '@ant-design/icons';
import DrawerUser from './Drawer';
import ModelCreateUser from './ModelCreateUser';
import ModelImportListUser from './ModelImportListUser';
import * as XLSX from 'xlsx';
import ModelUpdateUser from './ModelUpdateUser';
import ModelDeleteUser from './ModelDeleteUser';


const TableUser = (props) => {
let {listUser ,getAllUser ,setListUser } = props
const [openDrawer, setOpenDrawer] = useState(false);
const [dataDrawer , setDataDrawer] = useState({})
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalImportOpen, setIsModalImportOpen] = useState(false);
const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
const [dataUserUpdate, setDataUserUpdate] = useState({});
const dataUser = Array.from(listUser)
const dispatch = useDispatch()
const data = dataUser.map((item,index) => {
    return {
        key : index,
        id : <Button onClick={() => showDrawer(item , index)} >{item._id}</Button> ,
        fullName : item.fullName,
        email : item.email,
        phone : item.phone,
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
      sorter: true,
    },
    {
      title: 'Username',
      dataIndex: 'fullName',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'button'
    },
  ];

const onChange = async (pagination, filters, sorter, extra) => {

        let payload = {
            current : pagination.current,
            pageSize : pagination.pageSize
        }
        dispatch(doChangePanaginate(payload))
        if(sorter.field == 'fullName') {
            let res = await fetchSortUserByName(dataChangePanaginate.current,dataChangePanaginate.pageSize,sorter.field)
             console.log(res)
             if(res && res.statusCode == 200) {
                setListUser(res.data.result)
             }
        }

        if(sorter.field == 'email') {
            let res = await fetchSortUserByEmail(dataChangePanaginate.current,dataChangePanaginate.pageSize,sorter.field)
             console.log(res)
             if(res && res.statusCode == 200) {
                setListUser(res.data.result)
             }
        }
    


    };

const handleOnlickRefresh = () => {
                let payload= {
                    current : 1,
                    pageSize : 10
                }
           dispatch(doChangePanaginate(payload))
           getAllUser()

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
  setIsModalUpdateOpen(true)
  setDataUserUpdate(item)
}

const handleDeleteUser = (item) => {
  setIsModalDeleteOpen(true)
  setDataUserUpdate(item)

}




const dataChangePanaginate = useSelector(state => state.panaginate)

  return (
    <>
      <ModelDeleteUser   getAllUser = {getAllUser}  dataUserUpdate = {dataUserUpdate} setIsModalOpen = {setIsModalDeleteOpen} isModalOpen = {isModalDeleteOpen} />
      <ModelUpdateUser  getAllUser = {getAllUser} dataUserUpdate = {dataUserUpdate}  
      setIsModalOpen = {setIsModalUpdateOpen} isModalOpen = {isModalUpdateOpen} />
      <ModelImportListUser getAllUser = {getAllUser} setIsModalOpen = {setIsModalImportOpen} isModalOpen = {isModalImportOpen}  />
      <ModelCreateUser getAllUser = {getAllUser} setIsModalOpen = {setIsModalOpen} isModalOpen = {isModalOpen} />
      <DrawerUser openDrawer = {openDrawer} setOpenDrawer = {setOpenDrawer} dataDrawer = {dataDrawer}/>
     <div style={{marginTop : 50 , padding : 10 , display : 'flex' , justifyContent : 'space-between'}} >
        <h3>TABLE LIST USER</h3>
        <Space>
            <Button onClick={() => setIsModalOpen(true) }  type="primary" icon={<UserAddOutlined />} >
            Add New User
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
    <Table columns={columns} dataSource={data} onChange={onChange}
                            pagination =  {{current : dataChangePanaginate.current, pageSize : dataChangePanaginate.pageSize
                             , showSizeChanger : true }}/>
    </>
  )
}

export default TableUser;