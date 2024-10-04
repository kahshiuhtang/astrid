# Astrid

File storage and syncing service

## Core Features

-   [ ] Feature 1: Store files
-   [ ] Feature 2: Sync files between computers
-   [ ] Feature 3: Share files between team members
-   [ ] Feature 4: Create different permission levels for different files

## To run

Frontend

```bash
cd astrid-fe

pnpm install

pnpm dev
```

Backend

Note: You will need to make a copy of the .env.local file and place your desired variables before running docker-compose

```bash
cd astrid-be

cd scripts

docker-compose -f services-compose.yml -p astrid up -d

cd ../

make all
```
