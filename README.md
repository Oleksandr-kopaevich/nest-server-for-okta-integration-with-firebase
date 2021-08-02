<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

[Nest](https://github.com/nestjs/nest) framework TypeScript starter used as backend for integration Okta with Firebase.

## Installation

1. Create .env file and add next values:  
<b>ADMIN_ACCOUNT_KEYS_PATH</b> - path to JSON file with object details from Firebase project to get access  
<b>OKTA_ORG_URL</b> - You can copy your domain from the Okta Admin Console. (without 'https://')  
2. Install all npm packages
```bash
$ npm install
``` 
3. Run Firebase functions emulator locally 
```bash
$ npm run serve
```
or deploy to clouds via
```bash
$ npm run deploy
```

## Enpoints map
```/firebaseCustomToken``` - [GET] - is used for token exchange (must be authorization token in headres)