Installation
------------
`cp .env.example .env`

`docker-compose build`

Running
-------
Before running ensure that port 5432 is free ( or remove `ports` option in `docker-compose.yml` )

In order to run:

`docker-compose up`

By default API uses port 1337 ( you can change it in `.env` file - but don't forget to rebuild )
