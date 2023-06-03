import { Col, Row , Space} from 'antd';
import SideBar from './SideBar';
import ContentPage from './ContentPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
    const dataListBook = useSelector(state => state.book_content)
    return (
    <Row style={{padding : 20}} gutter={50}>
       
       <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={4} >
            <SideBar dataListBook = {dataListBook}/>
        </Col>
        <Col  xs={24} sm={24} md={24} lg={24} xl={24} xxl={20} >
            <ContentPage dataListBook = {dataListBook} />
        </Col>
       
    </Row>
    )
}

export default Home