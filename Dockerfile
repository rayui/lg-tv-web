FROM node:lts-bullseye-slim

ARG API_PORT=3001
ARG HDMI_ROUTER_URI="http://hdmi/cgi-bin/instr"
ARG TV_SERIAL_DEVICE="/dev/ttyUSB0"

ENV API_PORT=$API_PORT
ENV HDMI_ROUTER_URI=$HDMI_ROUTER_URI
ENV TV_SERIAL_DEVICE=$TV_SERIAL_DEVICE

RUN echo "API_PORT=${API_PORT}"
RUN echo "HDMI_ROUTER_URI=${HDMI_ROUTER_URI}"
RUN echo "TV_SERIAL_DEVICE=${TV_SERIAL_DEVICE}"

ARG uid
RUN useradd -m --uid $uid -g users -G dialout user

WORKDIR /app

COPY package.json /app
RUN yarn install
COPY --chown=user:users . /app

EXPOSE $API_PORT
USER user

CMD yarn start


