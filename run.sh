#!/bin/bash

set -e

while ! (timeout 3 bash -c "</dev/tcp/${DB_HOST}/${DB_PORT}") &> /dev/null;
do
    echo waiting for PgSQL to start;
    sleep 1;
done;

node_modules/.bin/sequelize db:migrate
node_modules/.bin/babel-watch index.js