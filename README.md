# lg-tv-web

Control supported LG TVs over HTTP and serial in the cloud.

This service can be installed locally, or deployed as a container. It provides both a responsive web UI and a REST interface.

## Build and running

### Build and run

`yarn start`

## Container examples

### Build docker container

e.g.
`docker build --build-arg uid=1001 -t rayui/lg-tv-web .`

### Run docker container

e.g.
`docker run -t -i --device=/dev/ttyUSB0 -p 3001:3001 rayui/lg-tv-web`
