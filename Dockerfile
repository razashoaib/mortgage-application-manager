FROM node:lts-slim
WORKDIR /var/lib/server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start-test"]