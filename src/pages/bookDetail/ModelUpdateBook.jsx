import {  Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input , message ,Select, notification} from 'antd';
import { PlusOutlined , LoadingOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { callFetchCategory, callUploadBookImg, fetchCreateNewBook, fetchUpdateBook } from '../../service/api';
import { v4 as uuidv4 } from 'uuid';







const ModelUpdateBook = (props) => {
    const { isModalOpen, setIsModalOpen ,getListBookWithPanaginate , dataUserUpdate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [listCategory, setListCategory] = useState([])
    const [form] = Form.useForm();


    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);

    const [dataThumbnail, setDataThumbnail] = useState([])
    const [dataSlider, setDataSlider] = useState([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory();
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(d);
            }
        }
        fetchCategory();

        form.setFieldsValue({
            mainText : dataUserUpdate?.mainText,
            author :dataUserUpdate?.author,
            price : dataUserUpdate?.price,
            category : dataUserUpdate?.category,
            quantity : dataUserUpdate?.quantity,
            selled : dataUserUpdate?.sold,
        
        })
        if(dataUserUpdate?.slider) {
        
            let imgSlider = dataUserUpdate.slider.map(item => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: 'https://backend-fresher.onrender.com/images/book/' + item,
                }
           })
           setDataSlider(imgSlider)
        }
        if(dataUserUpdate?.thumbnail) {
        
            let imgThumbnail =  [{
                    uid: uuidv4(),
                    name: dataUserUpdate.thumbnail,
                    status: 'done',
                    url: 'https://backend-fresher.onrender.com/images/book/' + dataUserUpdate.thumbnail,
                }]
          setDataThumbnail(imgThumbnail)
        }


    }, [dataUserUpdate])


    const onFinish = async (values) => {
      
        const newDataSliser = dataSlider.map(item => {
            return item.name
        })
        console.log(dataThumbnail[0].name)
      
        const { mainText, author, price, category , quantity , selled } = values;
        const res = await fetchUpdateBook(dataUserUpdate._id,dataThumbnail[0].name, newDataSliser, mainText, author, +price, +selled , +quantity , category);
        console.log(res)
        if (res && res.data) {
            message.success('Tạo mới  thành công');
            form.resetFields();
            setIsModalOpen(false);
            getListBookWithPanaginate()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };


    const getBase64 = (img, callback) => {
        console.log('img',img)
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

  



    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
        
            setDataThumbnail([{
                name: res.data.fileUploaded,
                uid: file.uid,
                status: 'done',
                url: `https://backend-fresher.onrender.com/ + ${res.data.fileUploaded}`,
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);
        console.log(res)
        if (res && res.data) {
            //copy previous state => upload multiple images
            setDataSlider((dataSlider) => [...dataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid,
                status: 'done',
                url: `https://backend-fresher.onrender.com/ + ${res.data.fileUploaded}`,
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider);
        }
    }

    const handlePreview = async (file) => {
        console.log('file',file)
        getBase64(file, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };

    const handleCreateNewBook = async () => {
            form.submit()
            
    }


  return (
    <>
     
      <Modal  forceRender width = {'50%'} title="Update Book " open={isModalOpen}  onOk={() => handleCreateNewBook()} onCancel={() => {
                    // form.resetFields();
                    setIsModalOpen(false)
                }}>
            <Form
            form={form}
            style={{
            marginTop  : 50,
        
            }}
          
            onFinish={onFinish}
          
        >
          
         <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                    labelCol={{span :24 }}
                    wrapperCol={24}
                    label="Book Name"
                    name="mainText"
                    rules={[
                        {
                        required: true,
                        message: 'Please input  Book name!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

             
      
            </Col>
            <Col span={12}>
          
                <Form.Item
                labelCol={{span :24}}
                label="Author"
                name="author"
                rules={[
                    {
                    required: true,
                    message: 'Please input Author!',
                    },
                ]}
                >
                <Input/>
                </Form.Item>
      
            </Col>
         </Row>
         <Row gutter={24}>
            <Col span={6}>
                <Form.Item
                    labelCol={{span :24 }}
                    wrapperCol={24}
                    label="Price"
                    name="price"
                    rules={[
                        {
                        required: true,
                        message: 'Please input price!',
                        },
                    ]}
                    >
                        <Input type='number'  addonAfter={'VND'}  />

                    </Form.Item>

             
      
            </Col>
            <Col span={6}>
          
                <Form.Item
                labelCol={{span :24}}
                label="Category"
                name="category"
                rules={[
                    {
                    required: true,
                    message: 'Please input Category!',
                    },
                ]}
                >
                     <Select
                        
                 
                        style={{
                            width: 120,
                        }}
                        
                        options={listCategory}
    />
                </Form.Item>
      
            </Col>

            <Col span={6}>
                <Form.Item
                    labelCol={{span :24 }}
                    wrapperCol={24}
                    label="Quantity"
                    name="quantity"
                    rules={[
                        {
                        required: true,
                        message: 'Please input quantity!',
                        },
                    ]}
                    >
                        <Input type='number'    />

                    </Form.Item>

             
      
            </Col>

            <Col span={6}>
                <Form.Item
                    labelCol={{span :24 }}
                    wrapperCol={24}
                    label="Selled"
                    name="selled"
            
                    >
                        <Input type='number'    />

                    </Form.Item>

             
      
            </Col>
         </Row>
             
         <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                    labelCol={{span :24 }}
                    wrapperCol={24}
                    label="Thumbail Image"
                    name="thumbnail"
                    rules={[
                        {
                        required: true,
                        message: 'Please input min 1 thumbnail !',
                        },
                    ]}
                         > 
                           <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                                    onPreview={handlePreview}
                                    fileList={dataThumbnail}
                                >
                                    <div>
                                         <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                          
                           
                    </Form.Item>

             
      
            </Col>
            <Col span={12}>
          
                <Form.Item
                labelCol={{span :24}}
                label="Slider"
                name="slider"
                >
                              <Upload
                                    multiple
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    // onChange={(info) => handleChange(info, 'slider')}
                                    onRemove={(file) => handleRemoveFile(file, "slider")}
                                    onPreview={handlePreview}
                                    fileList={dataSlider}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                </Form.Item>
      
            </Col>
         </Row>
        
           
        </Form>
      </Modal>
      <Modal open={previewOpen} title={previewTitle} footer={null}>
                                <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                                />
      </Modal>
    </>
  );
};
export default ModelUpdateBook;