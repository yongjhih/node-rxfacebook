# rx-facebook.js

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/rx-facebook.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/rx-facebook
[travis-image]: https://img.shields.io/travis/yongjhih/rx-facebook.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/yongjhih/rx-facebook.js
[coveralls-image]: https://img.shields.io/coveralls/yongjhih/rx-facebook.js.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yongjhih/rx-facebook.js

## Usage

```js
var RxFacebook = require('rx-facebook');
RxFacebook.Members(groupId).subscribe(function (it) {
  console.log(it.user.id);
});
```

cli.js

```sh
node cli --members {group-id} --token | jq '. | select (.administrator != true)' users.json > non-admin-users.json
```

```sh
node cli.js --members {group-id} --token |jq '. | select (.administrator != true) | .id' users.json > non-admin-users-id.json
```

## License

MIT
