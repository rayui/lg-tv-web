FROM node:lts-bullseye-slim as node
WORKDIR /app

RUN apt update -y
RUN apt install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt update -y
RUN apt install -y gcc g++ make
RUN rm -rf /var/lib/apt/lists/*

COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn config set network-timeout 600000 -g
RUN yarn install
RUN yarn build

FROM --platform=linux/arm64 node:lts-bullseye-slim
WORKDIR /app

ARG PORT=3000
ARG HDMI_ROUTER_URI="http://192.168.1.6/cgi-bin/instr"
ARG TV_SERIAL_DEVICE="/dev/ttyUSB0"

ENV PORT=$PORT
ENV HDMI_ROUTER_URI=$HDMI_ROUTER_URI
ENV TV_SERIAL_DEVICE=$TV_SERIAL_DEVICE

RUN echo "PORT=${PORT}"
RUN echo "HDMI_ROUTER_URI=${HDMI_ROUTER_URI}"
RUN echo "TV_SERIAL_DEVICE=${TV_SERIAL_DEVICE}"

ARG UID=1001
ENV UID=$UID
RUN useradd -m --uid $UID -g users -G dialout user

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

COPY --chown=user:users --from=node /app .

USER user
EXPOSE $PORT

CMD yarn start


