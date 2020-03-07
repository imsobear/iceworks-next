import { get, set, remove, IConfig} from '..';

test('set normal', async () => {
  const registry = 'http://taobao.com';
  const data: IConfig = set('registry', registry);

  expect(data.registry).toBe(registry);

  remove('registry');
  expect(get('registry')).toBe(undefined);
});


test('get list', async () => {
  const registry = 'http://taobao.com';
  const unpkgHost = 'http://baidu.com';
  set('registry', registry);
  set('unpkgHost', unpkgHost);

  const data = get();

  expect(data.registry).toBe(registry);
  expect(data.unpkgHost).toBe(unpkgHost);
});
