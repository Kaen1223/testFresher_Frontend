
import { Button, Modal, Table , message } from 'antd';
import { useState } from 'react';
import DragFile from '../../../component/DragFile/DragFile';
import { fetchImportListUser } from '../../../service/api';

const columns = [
    {
      title: 'Username',
      dataIndex: 'fullName',
      width: '30%',
      
    },
    {
      title: 'Password',
      dataIndex: 'password',
      
    },
    {
      title: 'Email',
      dataIndex: 'email',
      
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      
    },
   
  ];


const ModelImportListUser = (props) => {
 const {isModalOpen , setIsModalOpen , getAllUser} = props
 const [dataFileUpload , setDataFileUpload] = useState([])

  const handleOk =  () => {
 
    handleImport()
  };
  const handleCancel = () => {
    setDataFileUpload([])
    setIsModalOpen(false);
  };

  const handleImport = async () => {
  
     let res = await fetchImportListUser(dataFileUpload)
     if(res && res.statusCode == 201) {
      message.success(`Import succsess ${res.data.countSuccess} , faild ${res.data.countError}` );
      getAllUser()
      setIsModalOpen(false);
     }else {
       message.error(`${res?.message}`);
     }

  }

  return (
    <>
     
      <Modal okText ={"Import "} maskClosable = {false} width={800} title="Import List User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <DragFile setDataFileUpload = {setDataFileUpload}/>
        <Table  dataSource={dataFileUpload} columns={columns}/>
      </Modal>
    </>
  );
};
export default ModelImportListUser;