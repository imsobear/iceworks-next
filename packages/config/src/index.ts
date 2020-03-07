import * as path from 'path';
import * as fse from 'fs-extra';
import * as userHome from 'user-home';

const configPath: string = path.join(userHome || __dirname, '.iceworks/cli-config.json');

export interface IConfig {
  registry: string;
  unpkgHost: string;
  'fusion-token': string;
  'fusion-token-ali': string;
}

export function set(key: string, value: any): IConfig {
  const config: IConfig = fse.readJSONSync(configPath);
  config[key] = value;

  fse.writeJSONSync(configPath, config);
  return config;
}

export function get(key?: string): any {
  const config: IConfig = fse.readJSONSync(configPath);
  return key ? config[key] : config;
}

export function remove(key): IConfig {
  const config: IConfig = fse.readJSONSync(configPath);
  delete config[key];
  fse.writeJSONSync(configPath, config);
  return config;
}
