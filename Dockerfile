FROM ruby:2.7.0-alpine3.11

WORKDIR /usr/app

RUN apk add --update build-base git postgresql-dev tzdata nodejs yarn

COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
