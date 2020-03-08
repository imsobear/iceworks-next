import '@alifd/next/index.scss';

import { createApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  }
};

createApp(appConfig);
