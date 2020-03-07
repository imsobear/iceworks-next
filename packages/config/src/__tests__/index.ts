import { get, set, remove, IConfig} from '..';

test('set normal', async () => {
  const unpkgHost = 'https://unpkg.com/';
  const data: IConfig = set('unpkgHost', unpkgHost);

  expect(data.unpkgHost).toBe(unpkgHost);

  remove('unpkgHost');
  expect(get('unpkgHost')).toBe(undefined);
});


test('get list', async () => {
  const unpkgHost = 'https://unpkg.com/';
  set('unpkgHost', unpkgHost);

  const data = get();

  expect(data.unpkgHost).toBe(unpkgHost);

  remove('unpkgHost');
});
