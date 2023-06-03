import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { Badge, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { v4 as uuidv4 } from 'uuid';




const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DrawerBox = (props) => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([ ]);

  const {openDrawer , setOpenDrawer , dataDrawer} =props
   let dataImage = dataDrawer?.slider?.map(item => {
        return {
            uid: uuidv4(),
            name: item,
            status: 'done',
            url: 'https://backend-fresher.onrender.com/images/book/' + item,
        }
   })

   if(dataDrawer?.thumbnail?.length > 0) {
    dataImage.push({
            uid: uuidv4(),
            name: dataDrawer.thumbnail,
            status: 'done',
            url: 'https://backend-fresher.onrender.com/images/book/' + dataDrawer.thumbnail,
        
    })
  

   }
  
 

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  


  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Drawer width={'50%'} title="Book Details" placement="right" onClose={onClose} open={openDrawer}>
            <Descriptions  bordered>
                    <Descriptions.Item span={1} label="ID">{dataDrawer._id}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Tên sách">{dataDrawer.mainText}</Descriptions.Item>
                    <Descriptions.Item span={1} label="Tác giả">{dataDrawer.author}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Loại sách">{dataDrawer.category}</Descriptions.Item>
              
                    <Descriptions.Item label="Price" span={3}>
                         <Badge status="processing" text={dataDrawer.price} />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Số lượng">{dataDrawer.quantity}</Descriptions.Item>
                
                    <Descriptions.Item span={3} label="Created At">{dataDrawer.createdAt}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Updated At">{dataDrawer.updatedAt}</Descriptions.Item>
               
                    
            </Descriptions>
            <div style={{fontSize : 25 , fontWeight : 600 , margin : '15px 0'}}>Book Images</div>
            <Upload 
            
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={dataImage}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList = {{showRemoveIcon: false}}
            >
              
            </Upload>
            <Modal open={previewOpen} title={previewTitle} onCancel={handleCancel}>
                <img
                alt="example"
                style={{
                    width: '100%',
                }}
                src={previewImage}
                />
            </Modal>
      </Drawer>
    
    </>
  );
};
export default DrawerBox;