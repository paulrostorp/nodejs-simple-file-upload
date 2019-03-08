# Define node version for all stages
FROM node:10.15.1-stretch-slim as node-version

FROM node-version as builder
WORKDIR /usr/src/app
# Create upload folder. Makes sure inheriting images on Docker Desktop are not creating this folder belonging to root.
RUN mkdir uploads
# Use cache
COPY package*.json ./
RUN npm install
COPY . .

FROM node-version
WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/app .
USER node
EXPOSE 3000
CMD [ "npm", "start" ]
