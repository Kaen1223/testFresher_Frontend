import { DotChartOutlined } from '@ant-design/icons';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import { Col, Row ,Image  , Card ,Rate , Pagination ,Modal ,Button} from 'antd';
import './bookpage.scss'
const BookLoading = () => {
    return (
    <Row className="main-bookpage" style={{padding : 150}} >
        <Col className="gallery-book" xs={0} sm={0} md={0} lg={8} style={{width : '100%' , height:'100%'}}>
              <Skeleton.Input block style={{width  : '100%' , height : 700}}  active = {true} size={'large'} />
               <Space style={{marginTop : 15}} >
            
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
               
                    
                    
              
               </Space>
        </Col>

         <Col xs={24} sm={24} md={24} lg={16} style={{padding : '20px 60px' , backgroundColor : '#fff'}} >
            <Skeleton active />;
            <Skeleton active />;
            <Skeleton active />;
            <div style={{marginTop : 100}}>
                <Skeleton.Button style={{width : 200 , height : 50}} active  />
                <Skeleton.Button  style={{width : 100 , height : 50 , marginLeft : 50}}active  />
            </div>
        </Col>                     
    </Row>
    )
}

export default BookLoading