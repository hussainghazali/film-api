<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# After successfull execution
![Project Running Successfully](https://github.com/hussainghazali/film-api/blob/master/images/Project%20Running%20Successfully.png)
```

## Migration

```bash
# Build the migration
$ npm run build

# create a new migration
$  typeorm -- migration:create database/migrations/CreateRatingTable

# run migration
$  typeorm -d dist/database/data-source.js migration:run

# revert migration
$  typeorm -d dist/database/data-source.js migration:revert

# After successfull execution
<img src="https://github.com/hussainghazali/film-api/assets/50146615/3b323013-3974-4703-9bb9-da2e75f5ec63" width="100" height="100"/>
```

## Swagger API Reference

```bash
# Build the migration
$ http://localhost:3000/api#/

# After successfull execution
[![Swagger-API-Documentation.png](https://i.postimg.cc/KjLM0MKR/Swagger-API-Documentation.png)](https://postimg.cc/WqNz3twv)

# After successfull execution
[![Swagger-Schema-and-DTO-Documentation.png](https://i.postimg.cc/PxvpqwQ2/Swagger-Schema-and-DTO-Documentation.png)](https://postimg.cc/Vr1LG5TC)
```

## Docker - Elasticsearch and Kibana

```bash
# Docker Running After successfull execution
[![Docker-Instance-Elastic-Search-and-Kibana.png](https://i.postimg.cc/G3DSsgMx/Docker-Instance-Elastic-Search-and-Kibana.png)](https://postimg.cc/LhHVcDFJ)

# Pull Elasticsearch
$  docker pull docker.elastic.co/elasticsearch/elasticsearch:7.8.1 

# Pull Kibana
$  docker pull docker.elastic.co/kibana/kibana:7.8.1  

# run docker Elasticsearch
$  docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.8.1

# After successfull execution
[![Elastic-Seach-Configuration.png](https://i.postimg.cc/pTLRdbQC/Elastic-Seach-Configuration.png)](https://postimg.cc/94Kvxknw)

# run docker kibana
$  docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:7.8.1

# After successfull execution
[![Kibana-to-Test-Elastic-Search.png](https://i.postimg.cc/j2zbgxRs/Kibana-to-Test-Elastic-Search.png)](https://postimg.cc/N2fSLwyV)
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
