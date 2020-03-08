import { createApp } from 'ice';

import * as  iceworksConfig from '@iceworks/config';

const config = iceworksConfig.get();

console.log(111, config);

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  }
};

createApp(appConfig);
