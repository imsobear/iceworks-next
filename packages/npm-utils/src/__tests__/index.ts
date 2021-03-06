import 'jest-extended';
import * as path from 'path';
import { tmpdir } from 'os';
import * as rimraf from 'rimraf';
import {
  getNpmRegistry,
  getUnpkgHost,
  getNpmLatestSemverVersion,
  getLatestVersion,
  getNpmInfo,
  getNpmClient,
  checkAliInternal,
  getNpmTarball,
  getAndExtractTarball,
} from '../index';

const defaultRegistry = 'https://registry.npm.taobao.org';

jest.setTimeout(10 * 1000);

test('getNpmRegistry', () => {
  const aliRegistry = 'https://registry.npm.alibaba-inc.com';

  expect(getNpmRegistry('koa')).toBe(defaultRegistry);
  expect(getNpmRegistry('@alixxx/ice-test')).toBe(defaultRegistry);
  expect(getNpmRegistry('@ali/ice-test')).toBe(aliRegistry);
  expect(getNpmRegistry('@alife/ice-test')).toBe(aliRegistry);
  expect(getNpmRegistry('@alipay/ice-test')).toBe(aliRegistry);
});


test('getUnpkgHost custom host', () => {
  const custom = 'https://unpkg.example.com';

  process.env.UNPKG = custom;

  expect(getUnpkgHost('koa')).toBe(custom);
  expect(getUnpkgHost('@ali/ice-test')).toBe(custom);

  delete process.env.UNPKG;
});

test('getUnpkgHost', () => {
  const defaultRegistry = 'https://unpkg.com';
  const aliRegistry = 'https://unpkg.alibaba-inc.com';

  expect(getUnpkgHost('koa')).toBe(defaultRegistry);
  expect(getUnpkgHost('@ali/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alife/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alipay/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@kaola/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alixxx/ice-test')).toBe(defaultRegistry);
});

test('getLatestVersion should throw error when no dist-tags', () => {
  return getLatestVersion('http').catch((err) => {
    expect(err).toMatch('error');
  });
});

test('getLatestVersion', () => {
  // 找一个非常稳定的包
  return getLatestVersion('co').then((version) => {
    expect(version).toBe('4.6.0');
  });
});

test('getNpmLatestSemverVersion', () => {
  // 找一个非常稳定的包
  return getNpmLatestSemverVersion('co', '3.0.0').then((version) => {
    expect(version).toBe('3.1.0');
  });
});

test('getNpmInfo success', () => {
  return getNpmInfo('koa').then((data) => {
    expect(data.name).toBe('koa');
  });
});

test('getNpmInfo 404 error case', () => {
  return getNpmInfo('not-exis-npm-error').catch((err) => {
    expect(err.statusCode).toBe(404);
  });
});

test('getNpmClient custom registry', () => {
  const custom = 'cnpm';
  process.env.NPM_CLIENT = custom;

  expect(getNpmClient('koa')).toBe(custom);
  expect(getNpmClient('@ali/ice-test')).toBe(custom);

  delete process.env.NPM_CLIENT;
});

test('getNpmClient', () => {
  const defaultData = 'npm';
  const ali = 'tnpm';

  expect(getNpmClient('koa')).toBe(defaultData);
  expect(getNpmClient('@ali/ice-test')).toBe(ali);
  expect(getNpmClient('@alife/ice-test')).toBe(ali);
  expect(getNpmClient('@alipay/ice-test')).toBe(ali);
  expect(getNpmClient('@kaola/ice-test')).toBe(ali);
  expect(getNpmClient('@alixxx/ice-test')).toBe(defaultData);
});


test('checkAliInternal', () => {
  return checkAliInternal().then((internal) => {
    console.log('checkAliInternal', internal);
    expect(internal).toBeBoolean();
    // expect().toBeInstanceOf();
  });
});

test('getNpmTarball', () => {
  return getNpmTarball('ice-npm-utils', '1.0.0').then((tarball) => {
    expect(tarball).toBe(`${defaultRegistry}/ice-npm-utils/download/ice-npm-utils-1.0.0.tgz`);
  });
});

test('getNpmTarball should get latest version', () => {
  return getNpmTarball('http').then((tarball) => {
    expect(tarball).toBe(`${defaultRegistry}/http/download/http-0.0.0.tgz`);
  });
});

test('getAndExtractTarball', () => {
  const tempDir = path.resolve(tmpdir(), 'ice_npm_utils_tarball');
  return getAndExtractTarball(tempDir, `${defaultRegistry}/ice-npm-utils/download/ice-npm-utils-1.0.0.tgz`)
    .then((files) => {
      rimraf.sync(tempDir);
      expect(files.length > 0).toBe(true);
    })
    .catch(() => {
      rimraf.sync(tempDir);
    });
});

test('getAndExtractTarballWithDir', () => {
  const tempDir = path.resolve(tmpdir(), 'babel_helper_function_name_tarball');
  return getAndExtractTarball(tempDir, `${defaultRegistry}/@babel/helper-function-name/download/@babel/helper-function-name-7.1.0.tgz`)
    .then((files) => {
      rimraf.sync(tempDir);
      expect(files.length > 0).toBe(true);
    })
    .catch(() => {
      rimraf.sync(tempDir);
    });
});
