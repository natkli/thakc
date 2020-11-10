import { useState } from 'react';
import Head from 'next/head';
import { Layout, Menu} from 'antd';
export const siteTitle = 'THAKC - Thailands artisan keycaps community';

const { Header, Content, Footer } = Layout;


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

      <Layout style={{ height: '100vh'}}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">All</Menu.Item>
            <Menu.Item key="2">Thai Artists</Menu.Item>
            <Menu.Item key="3">International Artist</Menu.Item>
          </Menu>
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
        <Footer style={{ textAlign: 'center' }}>Created by Thailands Artisan Keycaps Community</Footer>
      </Layout>
    </>
  );
}
