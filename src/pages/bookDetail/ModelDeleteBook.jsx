import {  Modal , Space ,message  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchDeleteBook } from '../../service/api';




const ModelDeleteUser = (props) => {
    const {isModalOpen , setIsModalOpen ,dataUserUpdate, getListBookWithPanaginate} = props
    const handleOk = async () => {
        let res = await fetchDeleteBook(dataUserUpdate._id)
        if(res && res.statusCode == 200) {
            message.success('Delete book thành công !')   
            setIsModalOpen(false);
            getListBookWithPanaginate()
        }else { 
            message.error(res.message)  
        }

    //   setIsModalOpen(false);

    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
     
        <Modal title="Delete"  icon =  {<ExclamationCircleOutlined />} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Bạn có chắc chắn muốn xóa   ?</p>
          
        </Modal>
      </>
    );
  };


export default ModelDeleteUser;