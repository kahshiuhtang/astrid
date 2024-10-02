Astrid-FS Backend

## About

## To Run:

There is a .yml file inside the scripts folder. To run all backend services on your local machine with docker-compose, do

```bash
cd scripts
docker-compose -f services-compose.yml -p astrid up -d
```

To run the backend Golang application, do

```bash
make all
```

This will start the Golang server and it will begin listening to requests from your local machine and from any remote servers.

## Creating a Docker Image

```bash
docker build --tag kahshiuh1/astrid-be:latest .
docker push kahshiuh1/astrid-be:latest
```
