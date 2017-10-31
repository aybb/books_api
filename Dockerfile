FROM node:8

WORKDIR /books_api

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN npm install -g yarn

RUN yarn

COPY . /books_api

EXPOSE 1337

CMD ["./run.sh"]