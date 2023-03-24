import React from 'react'
import BottomBar from '../component/SandBox/BottomBar'
import TopBar from '../component/SandBox/TopBar'
import { Layout, Space} from 'antd';
import { Outlet } from 'react-router';
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };




const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };

export default function SandBox() {
    return (

        <Space>
          <Layout>
          <Header style={headerStyle}><TopBar/></Header>
         
            <Layout>
                
                <Content className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow:"auto"
                }}>
                  
                  <Outlet></Outlet>
                
                </Content>


               
             </Layout>
             <Footer style={footerStyle}><BottomBar/></Footer>
            </Layout>
        </Space>
     
          
    )
}
