import { shell } from 'electron';
import React, { ReactElement } from 'react';

import { Message } from '@alifd/next';

import styles from './index.module.scss';

interface IProps {
  [k: string]: string;
}

interface IView {
  title: string;
  props: IProps;
  screenshot: string;
  html: string;
}

interface ISource {
  type: string;
  npm: string;
  version: string;
  registry: string;
}

interface IDependencies {
  [k: string]: string;
}

export interface IMaterialItem {
  name: string;
  title: string;
  category: string;
  views: IView[];
  screenshot: string;
  description: string;
  homepage: string;
  categories: string[];
  repository: string;
  source: ISource;
  dependencies: IDependencies;
  screenshots: string[];
  publishTime: Date;
  updateTime: Date;

  showDownload?: boolean;
  previewText?: string;
}

interface IMaterialGroupProps {
  dataSource: IMaterialItem[];
  showDownload?: boolean;
  previewText?: string;
}

function MaterialItem(props: IMaterialItem): ReactElement {
  function openUrl(url: string): void {
    shell.openExternal(url);
  }

  const desc = props.description || props.title;
  const title = props.title || props.name;

  const previewText = props.previewText || '预览';

  return (
    <div className={styles.item}>
      {props.screenshot && <div className={styles.cover} style={{ backgroundImage: `url(${props.screenshot})` }} />}
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.ops}>
        <div
          className={styles.opButton}
          onClick={(): void => {
            openUrl(props.homepage);
          }}
        >
          {previewText}
        </div>
        <div
          className={styles.opButton}
          onClick={(): void => {
            openUrl(props.repository);
          }}
        >
          源码
        </div>
        {props.showDownload && (
          <div
            className={styles.opButton}
            onClick={(): void => {
              // TODO
              Message.warning('TODOTODOTODOTODOTODO');
            }}
          >
            下载
          </div>
        )}
      </div>
    </div>
  );
}

export default function MaterialGroup(props: IMaterialGroupProps): ReactElement {
  return (
    <div className={styles.group}>
      {props.dataSource.map((item, index) => {
        return <MaterialItem key={index} {...item} showDownload={props.showDownload} previewText={props.previewText} />;
      })}
    </div>
  );
}
