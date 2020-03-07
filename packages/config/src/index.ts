import * as path from 'path';
import * as fse from 'fs-extra';
import * as userHome from 'user-home';

const configPath: string = path.join(userHome || __dirname, '.iceworks/cli-config.json');

export interface IConfig {
  npmClient?: string;
  registry?: string;
  unpkgHost?: string;
  'fusion-token'?: string;
  'fusion-token-ali'?: string;
}

function getConfig(): IConfig {
  const defaultConfig: IConfig = {
    npmClient: 'npm',
    registry: 'https://registry.npmjs.org',
  };
  fse.ensureFileSync(configPath);
  const config: IConfig = fse.readJSONSync(configPath);
  const result = {...defaultConfig, ...config};

  if (['yarn', 'npm'].indexOf(result.npmClient) === -1) {
    // 私有的 npmClient 理论上不应该设置 registry
    delete result.registry;
  }

  return result;
}

export function set(key: string, value: any): IConfig {
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
  const config = getConfig();
  delete config[key];
  fse.writeJSONSync(configPath, config);
  return config;
}
