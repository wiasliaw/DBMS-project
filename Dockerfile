FROM node:10.15-stretch
EXPOSE 8080 9229

WORKDIR /usr/app/

COPY package.json package-lock.json /usr/app/
RUN npm install
RUN npm i -D

COPY . /usr/app/
RUN npm run build

CMD ["npm", "run", "start"]
