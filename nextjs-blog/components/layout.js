import { useState } from 'react';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
export const siteTitle = 'THAKC - Thailands artisan keycaps community';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;


export default function MainLayout({ children, home }) {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggle = () => {
   setCollapsed(!collapsed)
  };

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='Artisan keycaps artist'
          content='Artisan keycaps artist list, images, website and instagram'
        />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ 
            padding: 0,
            backgroundColor: '#FFF',
            fontSize: 18,
            lineHeight: '64px',
            padding: '0 40px'
            
            }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {home}{children}
          </Content>
        </Layout>
      </Layout>


    </>

 
  );
}
