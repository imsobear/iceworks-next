import * as path from 'path';
import * as fse from 'fs-extra';
import * as userHome from 'user-home';

let configPath: string = path.join(userHome || __dirname, '.iceworks/cli-config.json');

export interface IMaterialCollection {
  url: string;
  official: boolean;
  title: string;
  description: string;
}

export interface IConfig {
  npmClient?: string;
  registry?: string;
  unpkgHost?: string;
  'fusion-token'?: string;
  'fusion-token-ali'?: string;
  materialCollections?: IMaterialCollection[];
  projects?: [];
}

export function setConfigPath(cfgPath: string): void {
  if (process.env.NODE_ENV !== 'unittest') {
    throw new Error('Not allowed!');
  }
  configPath = cfgPath;
}

function getConfig(): IConfig {
  // TODO：需要根据环境区分
  const defaultConfig: IConfig = {
    npmClient: 'npm',
    registry: 'https://registry.npmjs.org',
    materialCollections: [{
      url: 'https://ice.alicdn.com/assets/materials/react-materials.json',
      title: '官方物料源',
      description: '基于 icejs & Fusion 组件',
      official: true,
    }, {
      url: 'https://ice.alicdn.com/assets/materials/vue-materials.json',
      title: 'Vue 物料源',
      description: '基于 Vue CLI & ElementUI 组件',
      official: true,
    }]
  };
  if (!fse.existsSync(configPath)) {
    fse.ensureFileSync(configPath);
    fse.writeJSONSync(configPath, {});
  }
  const config: IConfig = fse.readJSONSync(configPath);

  Object.keys(defaultConfig).forEach((key) => {
    if (key === 'materialCollections') {
      config[key] = [...defaultConfig[key], ...(config[key] || [])];
    } else {
      config[key] = config[key] || defaultConfig[key];
    }
  });

  if (['yarn', 'npm'].indexOf(config.npmClient) === -1) {
    // 私有的 npmClient 理论上不应该设置 registry
    delete config.registry;
  }

  return config;
}

export function set(key: string, value: any): IConfig {
  if (['materialCollections', 'projects'].indexOf(key) !== -1) {
    throw new Error(`Not allowed use set API to update ${key}.`);
  }

  const config = getConfig();
  config[key] = value;

  fse.writeJSONSync(configPath, config);
  return config;
}

export function get(key?: string): any {
  const config = getConfig();
  return key ? config[key] : config;
}

export function remove(key): IConfig {
  if (['materialCollections', 'projects'].indexOf(key) !== -1) {
    throw new Error(`Not allowed use remove API to update ${key}.`);
  }

  const config = getConfig();
  delete config[key];
  fse.writeJSONSync(configPath, config);
  return config;
}

export function addMaterialCollection(data: IMaterialCollection): IMaterialCollection[] {
  const config = getConfig();

  const index = (config.materialCollections || []).findIndex((item) => {
    return item.url === data.url;
  });

  if (index !== -1) {
    if (config.materialCollections[index].official) {
      throw new Error('Official material collection can not update');
    } else {
      config.materialCollections[index] = data;
    }
  } else {
    config.materialCollections.push(data);
  }

  fse.writeJSONSync(configPath, config);
  return config.materialCollections;
}

export function removeMaterialCollection(data: IMaterialCollection): IMaterialCollection[] {
  const config = getConfig();

  const index = (config.materialCollections || []).findIndex((item) => {
    return item.url === data.url;
  });

  if (index !== -1) {
    if (config.materialCollections[index].official) {
      throw new Error('Official material collection can not remove');
    } else {
      config.materialCollections.splice(index, 1);
    }
  }

  fse.writeJSONSync(configPath, config);
  return config.materialCollections;
}
