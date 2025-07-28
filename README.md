<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A modular and scalable <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient, enterprise-ready backend architectures with NestJS.</p>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

![Visitors](https://img.shields.io/badge/visitors-45_total-brightgreen)
![Clones](https://img.shields.io/badge/clones-24_total_18_unique-blue) <!--CLONE-BADGE-->

## 🧭 Project Overview

This project demonstrates a modular monolith architecture using [Nest](https://github.com/nestjs/nest), incorporating CQRS and Event Sourcing patterns. It supports dynamic event store providers and adheres to Domain-Driven Design principles, providing a scalable and maintainable foundation for application development.

<a href='https://ko-fi.com/F1F82YR41' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## 🏗️ Project Structure & Architecture

The application follows a modular monolith approach with clear bounded contexts. Each module encapsulates its domain logic, application services, and infrastructure concerns. The architecture is layered as follows:

- Domain Layer: Entities, value objects, and domain services.
- Application Layer: Commands, queries, handlers, and facades.
- Infrastructure Layer: Repositories, event stores, and external integrations.
- Interface Layer: Controllers and API endpoints.

The event store integration is achieved through a factory pattern with dynamic modules, allowing seamless switching between MongoDB, Kafka, and EventStoreDB.

## 🧩 Modular Breakdown

Each module resides under the src/modules directory and includes:

- Application: Commands, queries, handlers, services, and DTOs.
- Domain: Entities and interfaces.
- Infrastructure: Repositories and ORM entities.
- Interfaces: Controllers and API definitions.

This separation ensures a clear structure and promotes maintainability.

## ✨ Key Features

- Modular monolith architecture with clear bounded contexts
- CQRS and Event Sourcing patterns
- Dynamic event store integration (MongoDB, Kafka, EventStoreDB)
- JWT authentication and authorization
- Comprehensive logging, custom decorators, interceptors, and exception handling
- Dockerized setup with support for SQLite and PostgreSQL

## 🧠 Design Principles and Benefits

- Domain-Driven Design (DDD): Ensures alignment with business domains and promotes a ubiquitous language.
- Onion Architecture: Separates concerns and enforces dependency inversion.
- Scalability: Modular design allows for independent scaling of modules.
- Maintainability: Clear separation of concerns facilitates easier maintenance and testing.
- Flexibility: Dynamic event store integration allows for easy switching between different providers.

## 🚀 PoC to PMC Ready

The project is structured to evolve from a Proof of Concept (PoC) to a Production-Ready (PMC) application. It includes:

- Comprehensive testing strategies
- CI/CD pipeline configurations
- Environment-based configurations
- Scalable and maintainable codebase

## ⚡ Quick Start

1. Clone the repository:

```bash
git clone https://github.com/deadislove/nestJS-modular-monolith-cqrs-event-sourcing-architecture-template.git
cd nestJS-modular-monolith-cqrs-event-sourcing-architecture-template
```

2. Install dependencies:

```bash
$ npm install
```

3. Install dependencies:

```bash
cp .env.example .env
```

4. Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

5. Run tests:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

6. Run the application:

Navigate to http://localhost:3000 in your browser.

For Docker-based setup, refer to the docker-compose.sqlite.yml or docker-compose.postgresql.yml files.

- Run with SQLite (default)

```bash
docker-compose -f docker-compose.sqlite.yml up
# or 
docker-compose -f docker-compose.sqlite.yml up --build
```

- Run with PostgreSQL

```bash
docker-compose -f docker-compose.postgresql.yml up
# or 
docker-compose -f docker-compose.postgresql.yml up --build
```

## Logging

Application logs are automatically saved to the logs/ directory with daily log rotation (e.g., application-2025-04-27.log).

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Da-Wei Lin](https://www.linkedin.com/in/da-wei-lin-689a35107/)
- Website - [David Weblog](https://davidskyspace.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
