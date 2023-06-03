import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { Badge, Descriptions } from 'antd';


const DrawerUser = (props) => {
  const {openDrawer , setOpenDrawer , dataDrawer} =props

  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Drawer width={'50%'} title="Infomation" placement="right" onClose={onClose} open={openDrawer}>
            <Descriptions title="User Info" bordered>
                    <Descriptions.Item span={1} label="ID">{dataDrawer._id}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Full Name">{dataDrawer.fullName}</Descriptions.Item>
                    <Descriptions.Item span={1} label="Email">{dataDrawer.email}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Phone Number">{dataDrawer.phone}</Descriptions.Item>
              
                    <Descriptions.Item label="Roles" span={3}>
                         <Badge status="processing" text={dataDrawer.role} />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Created At">{dataDrawer.createdAt}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Updated At">{dataDrawer.updatedAt}</Descriptions.Item>
               
                    
        </Descriptions>
      </Drawer>
    </>
  );
};
export default DrawerUser;