# Gitstars

Application to view starred projects and be able to search for tags that can be created and edited. All user starred repositories came from github API and only the tags will be saved in database with repository id to search and tag.

You can access the application page by [Gitstars]()

![Record](./screenshots/tag-search.gif)

## Back-end

Back-end was made in node.js with express, and you can find the repository application accessing this [Gitstars-backend](https://github.com/TuxPK/Gitstars-backend)

## Front-end

The front-end application was made using [Quasar Framework](https://quasar.dev/), a framework based in Vue.js.

### Project dependecies

* axios
* lodash
* eslint

### Set the enviroment variables at quasar.conf.js
```bash
  build: {
    env: {
      GITHUB_CLIENT_ID: '*********************',
      GITHUB_CLIENT_SECRET: '**************************************',
    },
  },
```

### To load the project install the dependencies
```bash
yarn
  or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc...)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
  or
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
