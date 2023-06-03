import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx';
import templateFile from '../../assets/testXLXS.xlsx?url'

const { Dragger } = Upload;

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };




const DragFile = (props) => {

    const propsFile = {
        name: 'file',
        multiple: false,
        maxCount : 1,
        accept : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest : dummyRequest,
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
          //   console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            handleFile(info.fileList[0].originFileObj)
           
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

      
    const {setDataFileUpload} = props

    const handleFile = async (file) => {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: ["Password","Username","Email","PhoneNumber"],
            range : 1
        });
        let jsonDataNew = jsonData.map((item , index) => {
            return {
                key : index,
                fullName : item.Username,
                email : item.Email,
                phone : item.PhoneNumber,
                password : item.Password,
           
                
            }
           
        })

        setDataFileUpload(jsonDataNew)
    
    }
    return (
    <>
            <Dragger {...propsFile}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. <a onClick={(e) => e.stopPropagation()} href={templateFile} download>Click here to Download Exemple File</a>
            </p>
        </Dragger>
    </>)
 
};
export default DragFile;