import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { Spin, Table } from 'antd';

const googleSheetId = '1O6Ewaxp6TbsoPoJuHPh4YUmVJl7yUXx_uq9_GHxKRmc';
const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${googleSheetId}/od6/public/values?alt=json`;
const columns = [
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Instagram',
    dataIndex: 'instagram',
    key: 'instagram',
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [googleSheetJson, setGoogleSheetJson] = useState();
  let filteredData = [];

  useEffect(() => {
    getGoogleSheetData();
  }, []);

  const getGoogleSheetData = () => {
    setIsLoading(true);

    axios.get(googleSheetUrl).then((response) => {
      const { entry } = response.data.feed;
      setGoogleSheetJson(entry);
      setIsLoading(false);
      setIsLoaded(true);
    });
  };

  const objectMapper = (obj) => {
    const { gsx$artisan, gsx$website, gsx$instagram, id } = obj;
    const key = id[Object.keys(id)[0]];
    const artist = gsx$artisan[Object.keys(gsx$artisan)[0]];
    const website = gsx$website[Object.keys(gsx$website)[0]];
    const instagram = gsx$instagram[Object.keys(gsx$instagram)[0]];

    const mappedObject = { key, artist, website, instagram };

    return mappedObject;
  };

  if (isLoaded) {
    googleSheetJson.map((obj) => {
      const newObj = objectMapper(obj);
      filteredData = [...filteredData, newObj];
    });
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Table dataSource={filteredData} columns={columns} loading={isLoading}/>
      </section>
    </Layout>
  );
}
