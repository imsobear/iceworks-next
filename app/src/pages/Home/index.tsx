import { remote } from 'electron';
import React, { ReactElement, useEffect, useState } from 'react';

// TODO 根据 config 获取物料的配置信息
import MaterialGroup, { IMaterialItem } from '@/components/MaterialGroup';
import { Notification, Search, Tab } from '@alifd/next';

import styles from './index.module.scss';

const axios = remote.require('axios');

interface IMaterialData {
  blocks?: IMaterialItem[];
  scaffolds?: IMaterialItem[];
  components?: IMaterialItem[];
}

// https://ice.alicdn.com/assets/materials/react-materials.json
const Material = (): ReactElement => {
  const [materialData, setMaterialData] = useState<IMaterialData>({});
  const [tabActive, setTabActive] = useState<string>('scaffold');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    axios({
      url: 'https://ice.alicdn.com/assets/materials/react-materials.json',
    })
      .then(({ data }) => {
        setMaterialData(data);
      })
      .catch(() => {
        Notification.error({
          title: '加载数据失败',
          content: '请确认网络已链接',
        });
      });
  }, []);

  function searchHandler(value): void {
    setKeyword(value);
  }

  function filterByKeyword(arr: IMaterialItem[]): IMaterialItem[] {
    return arr.filter((item) => {
      return (
        item.title.indexOf(keyword) > -1 || item.name.indexOf(keyword) > -1 || item.description.indexOf(keyword) > -1
      );
    });
  }

  let { blocks = [], components = [], scaffolds = [] } = materialData;

  blocks = filterByKeyword(blocks);
  components = filterByKeyword(components);
  scaffolds = filterByKeyword(scaffolds);

  return (
    <div className={styles.materialWrapper}>
      <h1 className={styles.materialTitler}>我的物料-飞冰物料</h1>
      <Tab
        contentStyle={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
        activeKey={tabActive}
        onChange={(key: string): void => {
          setTabActive(key);
        }}
        extra={<Search shape='simple' size='medium' placeholder='请输入关键字查找物料' onChange={searchHandler} />}
      >
        <Tab.Item title='模板' key='scaffold'>
          {scaffolds.length > 0 ? (
            <MaterialGroup dataSource={scaffolds} showDownload />
          ) : (
            <div className={styles.notFound}>未找到与 {keyword} 相关的物料</div>
          )}
        </Tab.Item>
        <Tab.Item title='区块' key='block'>
          {blocks.length > 0 ? (
            <MaterialGroup dataSource={blocks} />
          ) : (
            <div className={styles.notFound}>未找到与 {keyword} 相关的物料</div>
          )}
        </Tab.Item>
        <Tab.Item title='业务组件' key='component'>
          {components.length > 0 ? (
            <MaterialGroup dataSource={components} previewText='文档' />
          ) : (
            <div className={styles.padding}>未找到与 {keyword} 相关的物料</div>
          )}
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default Material;
