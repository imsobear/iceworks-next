import { shell } from 'electron';
import { store } from 'ice';
import React, { useState, ReactElement } from 'react';

import { Button, Icon, Switch, Dialog, Form, Input, Radio } from '@alifd/next';

import styles from './index.module.scss';

const Settings = (): ReactElement => {
  const [materials, materialActions] = store.useModel('materials');
  const [npm, npmActions] = store.useModel('npm');
  const { collections } = materials;

  const [show, setShow] = useState(false);

  const materialToggle = (url) => {
    return function toggle(enable: boolean): void {
      materialActions.enableCollection({
        enable,
        url,
      });
    };
  };

  const removeMaterial = (material) => {
    return function remove(): void {
      materialActions.removeCollection(material);
    };
  };

  const openAddMaterial = (): void => {
    setShow(true);
  };

  const closeAddMaterial = (): void => {
    setShow(false);
  };

  const confirmAddMaterial = (values, errors): void => {
    if (!errors) {
      materialActions.addCollection(values);

      setShow(false);
    }
  };

  const updateNpmClient = (value: string): void => {
    npmActions.setClient(value);
  };

  const updateNpmRegistry = (value: string): void => {
    npmActions.setRegistry(value);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>
        <span>物料设置</span>
        <Button size='small' type='secondary' onClick={openAddMaterial}>
          <Icon type='add' /> 添加自定义物料
        </Button>
      </h1>
      <div className={styles.desc}>
        物料即组成一个前端项目的不同单位，根据抽象粒度的不同，我们将物料从小到大分为组件、区块、和模板。在基于物料体系的开发中，我们使用项目物料来初始化前端工程，提供最佳实践，解决工程问题，再使用区块和组件像搭积木一样快速搭建页面
        <a
          href='#'
          onClick={(): void => {
            shell.openExternal('https://ice.work/docs/materials/about');
          }}
        >
          查看更多
        </a>
      </div>
      <div>
        {collections.map((item) => {
          return (
            <div key={item.url} className={styles.materialItem}>
              <div className={styles.materialItemHeader}>
                <div className={styles.materialItemTitle}>{item.title}</div>
                <div className={styles.materialItemDesc}>{item.description}</div>
                <div className={styles.materialItemUrl}>{item.url}</div>
              </div>
              <div className={styles.materialItemFooter}>
                <Switch
                  disabled={item.official}
                  onChange={materialToggle(item.url)}
                  style={{ width: 60 }}
                  size='small'
                  checked={item.enable !== false}
                  checkedChildren='启用'
                  unCheckedChildren='禁用'
                />
                {item.official ? (
                  <span className={styles.materialItemFlag}>ICE 官方出品</span>
                ) : (
                  <Button size='small' type='normal' onClick={removeMaterial(item)}>
                    移除
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <h1 className={styles.pageTitle}>
        <span>NPM 设置</span>
      </h1>
      <dl className={styles.radioForm}>
        <dt>CLI :</dt>
        <dd>
          <Radio.Group value={npm.client} onChange={updateNpmClient}>
            <Radio value='npm'>Npm</Radio>
            <Radio value='yarn'>Yarn</Radio>
          </Radio.Group>
        </dd>
      </dl>
      <dl className={styles.radioForm}>
        <dt>Registry :</dt>
        <dd>
          <Radio.Group value={npm.registry} onChange={updateNpmRegistry}>
            <Radio value='https://registry.npm.taobao.org'>https://registry.npm.taobao.org</Radio>
            <Radio value='https://registry.npmjs.org'>https://registry.npmjs.org</Radio>
          </Radio.Group>
        </dd>
      </dl>
      <Dialog visible={show} title='添加自定义物料' footer={false}>
        <Form style={{ width: '36vw' }}>
          <Form.Item label='物料名称' required>
            <Input name='title' />
          </Form.Item>
          <Form.Item label='物料地址' required format='url'>
            <Input name='url' />
          </Form.Item>
          <Form.Item label='物料描述' required>
            <Input.TextArea name='description' />
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Form.Submit type='primary' validate onClick={confirmAddMaterial}>
              确定
            </Form.Submit>
            <Form.Reset style={{ marginRight: 10 }} onClick={closeAddMaterial}>
              取消
            </Form.Reset>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default Settings;
