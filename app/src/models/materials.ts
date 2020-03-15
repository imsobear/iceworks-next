import { request } from 'ice';

import {
  addMaterialCollection,
  get as getConfig,
  IMaterialCollection,
  modifyMaterialCollection,
  removeMaterialCollection,
} from '@iceworks/config';

export interface IMaterialItem {
  name: string;
  title: string;
  category: string;
  screenshot: string;
  description: string;
  homepage: string;
  categories: string[];
  repository: string;
  source: {
    type: string;
    npm: string;
    version: string;
    registry: string;
  };
  screenshots: string[];
  publishTime: Date;
  updateTime: Date;

  showDownload?: boolean;
  previewText?: string;
}

interface ICollection extends IMaterialCollection {
  data?: {
    type?: string;
    blocks?: IMaterialItem[];
    scaffolds?: IMaterialItem[];
    components?: IMaterialItem[];
  };
}

interface IState {
  collections: ICollection[];
  currentCollection: ICollection | undefined;
}

const materials = {
  state: {
    // TODO 类型
    collections: getConfig('materialCollections'),
    currentCollection: undefined,
  },
  reducers: {
    addCollection(prevState: IState, data: ICollection): IState {
      const collections = addMaterialCollection(data);
      return {
        ...prevState,
        collections,
      };
    },
    removeCollection(prevState: IState, data: ICollection): IState {
      const collections = removeMaterialCollection(data);
      return {
        ...prevState,
        collections,
      };
    },
    modifyCollection(prevState: IState, opts: { url: string; enable: boolean }): IState {
      const collections = modifyMaterialCollection(opts);
      return {
        ...prevState,
        collections,
      };
    },
    setCurrentCollection(prevState: IState, data: ICollection): IState {
      return {
        ...prevState,
        currentCollection: data,
      };
    },
  },
  effects: {
    async fetchCollectionData(prevState: IState, url: string, actions): Promise<void> {
      const currentCollection = prevState.collections.find((item) => {
        return item.url === url;
      });

      if (!currentCollection) {
        throw new Error('Invalid url');
      }

      if (!currentCollection.data) {
        const data = await request({
          url: currentCollection.url,
        });
        currentCollection.data = data;
      }

      actions.setCurrentCollection(currentCollection);
    },

    async enableCollection(prevState: IState, opts: { enable: boolean; url: string }, actions): Promise<void> {
      actions.modifyCollection(opts);
    },
  },
};

export default materials;
