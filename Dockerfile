FROM node:10.15-stretch
EXPOSE 8080

WORKDIR /usr/app/

COPY package.json package-lock.json /usr/app/
RUN npm install
RUN npm i -D

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

COPY . /usr/app/
RUN npm run build

CMD /wait && npm run insert && npm run start
