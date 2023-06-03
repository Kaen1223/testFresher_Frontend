import {  Modal , Space ,message  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchDeleteUser } from '../../../service/api';



const ModelDeleteUser = (props) => {
    const {isModalOpen , setIsModalOpen ,dataUserUpdate, getAllUser} = props
    console.log(dataUserUpdate)
    const handleOk = async () => {
        let res = await fetchDeleteUser(dataUserUpdate._id)
        if(res && res.statusCode == 200) {
            message.success('Delete user thành công !')   
            setIsModalOpen(false);
            getAllUser()
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
          <p>Bạn có chắc chắn muốn xóa user này không ?</p>
          
        </Modal>
      </>
    );
  };


export default ModelDeleteUser;