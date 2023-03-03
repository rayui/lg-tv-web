FROM node:lts-bullseye-slim

ARG uid
RUN useradd -m --uid $uid -g users -G dialout user

WORKDIR /app

COPY package.json /app
RUN yarn install
COPY --chown=user:users . /app

EXPOSE 3001
USER user

CMD yarn start


