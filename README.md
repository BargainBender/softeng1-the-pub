# The Pub

A website for blog articles and discussion threads.

## Development
To get started development, you must have [Docker](https://www.docker.com/) installed and running.
Then `cd` into this project's root directory and run the docker compose:
```sh
docker-compose up -d
```

This will start the both the Django server and the Next.js server in port `8000` and `3000` respectively. See `docker-compose.yml` for more details.

The project files for backend and frontend are mounted automatically into their containers. So any changes you save into your local project files will be reflected into the containers.

Happy coding!