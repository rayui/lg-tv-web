FROM node:lts-bullseye-slim

ARG API_PORT=3000
ARG HDMI_ROUTER_URI="http://192.168.1.6/cgi-bin/instr"
ARG TV_SERIAL_DEVICE="/dev/ttyUSB0"

ENV API_PORT=$API_PORT
ENV HDMI_ROUTER_URI=$HDMI_ROUTER_URI
ENV TV_SERIAL_DEVICE=$TV_SERIAL_DEVICE

RUN echo "API_PORT=${API_PORT}"
RUN echo "HDMI_ROUTER_URI=${HDMI_ROUTER_URI}"
RUN echo "TV_SERIAL_DEVICE=${TV_SERIAL_DEVICE}"

ARG uid
RUN useradd -m --uid $uid -g users -G dialout user

RUN apt update -y
RUN apt install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt update -y
RUN apt install -y nodejs gcc g++ make
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm_config_build_from_source=true yarn install
RUN yarn build

EXPOSE $API_PORT
USER user

RUN chown -R user:users /app

CMD yarn start


