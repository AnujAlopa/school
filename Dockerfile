FROM node:10-alpine 
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /appp
EXPOSE 80
CMD [ "node","index.js" ]