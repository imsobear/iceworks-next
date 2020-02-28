import { addBlock } from '..';

test('addBlock', async () => {
  const result = await addBlock(1);
  expect(result).toBe(1);
});