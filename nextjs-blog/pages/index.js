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
    dataIndex: 'gsx$artisan',
    key: 'gsx$artisan',
  },
  {
    title: 'Website',
    dataIndex: 'gsx$website',
    key: 'gsx$website',
  },
  {
    title: 'Instagram',
    dataIndex: 'gsx$instagram',
    key: 'gsx$instagram',
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

  if (isLoading) {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        {isLoading && <Spin />}
      </Layout>
    );
  }

  const objectMapper = (obj) => {
    const { gsx$artisan, gsx$website, gsx$instagram, id } = obj;
    const key = id[Object.keys(id)[0]];
    const artist = gsx$artisan[Object.keys(gsx$artisan)[0]];
    const website = gsx$website[Object.keys(gsx$website)[0]];
    const instagram = gsx$instagram[Object.keys(gsx$instagram)[0]];

    const mappedObject = {
      key,
      artist,
      website,
      instagram,
    };

    return mappedObject;
  };

  if (!isLoading && isLoaded) {
    googleSheetJson.map((obj) => {
      const { category, content, link, title, updated, ...rest } = obj;
      const newObj = objectMapper(rest);
      filteredData = [...filteredData, newObj];
    });
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        {isLoading && <Spin />}
        {console.log(filteredData)}
        {isLoaded && <Table dataSource={filteredData} columns={columns} />}
      </section>
    </Layout>
  );
}
