# Coding Challenge - Backend Engineer: Prosig
Author: Gerardo Benitez

Github User: github.com/g3r4benitez

Linkedin: https://www.linkedin.com/in/gerardobenitez/

## Description
This RESTful API let manage a simple blogging platform. Include managin blog posts and their associated comments.

## About the project
### Arquitecture
  1. API RESTfull created with NestJs 
  2. N-Tier Arquitecture
  - Controllers
  - Services
  - Modules
  3. Dependency Injection Pattern
  4. Metodologies and Frameworks
  - NestJS
  - TypeScript
  - POO
  - Testing
### Clean Code and Good Practices
1. Separation of Concerns
2. Managing configuration using environment variables
3. Use of ORM (Object Relational Mapping)
4. Containerization with Docker
5. Deployment's scripts
6. Clear Documentation: README.md
7. Unit Test 


## Ways to run the app

### Using Docker: 
```bash 
$ docker-compose up
```

### Using NPM:

#### Installation

```bash
$ npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

#### Deploy to aws
```bash
# deploy to aws
$ npm run deploy

# deploy to dev
$ npm run deploy:dev

# deploy to prod
$ npm run deploy:prod

```

## Next Steps if I had more time available
- Add authentication and authorization
- Add pagination for posts and comments
- Add search functionality for posts
