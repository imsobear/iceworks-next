
# iceworks-next

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