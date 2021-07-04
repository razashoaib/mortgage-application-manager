# mortgage-application-manager
This service handles the home loan application data. It is a REST API, which is developed using Node.js and an in-memory database LokiJS.

## Getting Started

The code assumes you have Docker running on your machine.  If you do not, they offer easy to install binaries ([Mac](https://docs.docker.com/docker-for-mac/install/)) ([Windows](https://docs.docker.com/docker-for-windows/install/)).

- Clone this repository
- Make sure you don't have anything running on port `3000`
- From the docker folder of this project, run `sudo chmod +x ./configure-app.sh` which will make `./configure-app.sh` script executable
- Now run `./configure-app.sh` which will take a while as it will setup everything for you and run the API tests before starting the server. It will perform the following steps: 
    - Build the docker container needed for this application to run in the local environment for server
    - Install all the dependencies while building the docker containers for server
    - After building the containers, it will start the containers and run tests for server
    - Finally after runnnig the tests, it will start the server on the localhost
- You should now have the server running at http://localhost:3000

### Documentation

The complete documentation of this service can be found [here](https://www.postman.com/razashoaib91/workspace/services/documentation/4947249-75d7268b-eab0-458e-a430-57195abf7b2e).

### Project Built Using

- git
- Node.js v15.3.0
- NPM
- ExpressJS Framework for NodeJS v4.16.1
- LokiJS (In-memory database) v1.5.12
- Docker v20.10.7

### Acknowledgements

- [W3Schools](https://www.w3schools.com/)
- [Stack Overflow](https://stackoverflow.com/)
- [Node.js Documentation](https://nodejs.org/docs/latest-v12.x/api/)
- [Express For Node.js Documentation](https://expressjs.com/en/api.html)
- [LokiJS](https://github.com/techfort/LokiJS)