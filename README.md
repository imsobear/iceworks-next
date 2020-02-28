
# iceworks-next

<a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
<a href="https://travis-ci.org/imsobear/iceworks-next"><img src="https://travis-ci.org/imsobear/iceworks-next.svg?branch=master" alt="Build Status" /></a>
<a href="https://codecov.io/gh/imsobear/iceworks-next"><img src="https://img.shields.io/codecov/c/github/imsobear/iceworks-next/master.svg" alt="Test Coverage" /></a>
<a href="https://gitter.im/imsobear/iceworks-next"><img src="https://badges.gitter.im/imsobear/iceworks-next.svg" alt="Gitter" /></a>


## Develop

CLI:

```bash
$ yarn run install:deps
# build packages and run link
$ yarn run setup

# start electron app
$ yarn run app:start

# packages
$ yarn run packages:watch
$ yarn run packages:build

# publish packages
$ yarn run publish
$ yarn run publish:beta
```

Directory:

```md
.
├── app               // Electron app
├── extensions        // VS Code extensions
├── packages          // Common packages
│   ├── add-block
│   └── config
└── scripts
```