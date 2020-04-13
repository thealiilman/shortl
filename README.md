# shortl
Shortl is a simple application for users to generate shortened links.

## Tech Stack
Shortl is hosted on Heroku.

### Front-End
1. Stimulus.js
2. TypeScript
3. HTML5
4. SCSS
### Back-End
1. Ruby
2. Ruby on Rails

## How To Setup
After you cloned the repo, enter the relevant directory.

### With Docker
These steps assume that you already have Docker and Docker Compose on your machine.
#### Prerequisite
If you're using [Postgres.app](https://postgresapp.com/), please ensure that **it is not** running.
#### Steps
```sh
docker-compose build
docker-compose run web rails db:create db:migrate
docker-compose up
```

### Without Docker
Shortl uses `yarn` for managing packages.
#### Steps
```sh
bundle install
yarn install

rails db:create db:micreate
rails s
```
