FROM node:10.15-stretch
EXPOSE 8080

WORKDIR /usr/app/

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run insert && npm run start
