# Build and return

`yarn start`

# Build docker container

e.g.
`docker build --build-arg uid=1001 -t lg-tv-web .`

# Run docker container

e.g.
`docker run -t -i --device=/dev/ttyUSB0 -p 3001:3001 lg-tv-web`
