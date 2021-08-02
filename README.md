<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

## Live demo

https://explore-firebase-37b42.web.app/ - Uses Firebase hosting for [frontend part (React application)](https://github.com/Oleksandr-kopaevich/client-okta-integration-with-firebase) and Firebase functions for backend part (Nestjs application)

## Installation

1. Create .env file and add next value:  
<b>OKTA_ORG_URL</b> - You can copy your domain from the Okta Admin Console. (without 'https://')  
2. Download credentials file from firebase project settings, rename it to `firebase.config.json` and put in `src` folder
3. Install all npm packages
```bash
$ npm install
``` 
and make sure thay your Firebase CLI is up to date
```bash 
$ npm install -g firebase-tools
```
4. Run Firebase functions emulator locally 
```bash
$ npm run serve
```
or deploy to clouds via
```bash
$ npm run deploy
```

## Enpoints map
```/firebaseCustomToken``` - [GET] - is used for token exchange (must be authorization token in headres)