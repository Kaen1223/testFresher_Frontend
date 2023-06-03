import { useEffect, useState } from "react"
import { getDashboard } from "../../service/api"
import { Col, Row , Statistic } from "antd"
import { Card } from 'antd';
import CountUp from 'react-countup';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


const formatter = (value) => <CountUp end={value} separator="," />;

const AdminPage = () => {
    const [dataDasboard , setDataDashboard] = useState({
        countOrder : 0,
        countUser : 0
    })

    const fetchGetDashboard = async () => {
        let res = await getDashboard()
        if(res && res.statusCode == 200) {
            setDataDashboard({...dataDasboard , countOrder: res.data.countOrder , countUser : res.data.countUser})
        }
        console.log(res)
    }


    useEffect(() => {
        fetchGetDashboard()
    },[])

    console.log(dataDasboard)
    return (
        <Row gutter={39}>
            <Col span={12} >
                <Card
                    title="USER TOTAL"
               
                    style={{
                    display: 'grid',
                    placeItems:'center',
                    height: 300,
                    backgroundColor : '#fbfbfb'
                    }}
                >
                    
                    <Statistic  valueStyle={{
                            color: '#3f8600',
                            fontSize : 40,
                            marginBottom : 40
                          }} value={dataDasboard.countUser}   prefix={<ArrowUpOutlined />} formatter={formatter} />
                </Card>
            </Col>

            <Col span={12}>
                <Card
                        title="ORDER TOTAL"
                       
                        style={{
                            display: 'grid',
                            placeItems:'center',
                            height: 300,
                            backgroundColor : '#fafafa'
                        }}
                    >
                         <Statistic  valueStyle={{
                            color: '#cf1322',
                            fontSize : 40,
                            marginBottom : 40
                          }} value={dataDasboard.countOrder}   prefix={<ArrowUpOutlined />} formatter={formatter} />
                    
                </Card>
            </Col>
        </Row>
    )
}

export default AdminPage