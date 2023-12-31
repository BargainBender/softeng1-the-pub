# The Pub

A website for blog articles and discussion threads.

## Development
To get started development, you must have [Docker](https://www.docker.com/) installed and running. Also install the dependencies for both `frontend` and `backend`.

Install dependencies for projects: </br>

**Backend**
```sh
# create venv
cd backend
python3 -m venv venv

# Choose the appropriate command

# Linux and MacOS venv activation
source venv/bin/activate

# Windows in cmd.exe
venv\Scripts\activate.bat

# Windows in PowerShell
venv\Scripts\Activate.ps1

pip install -r requirements.txt

```

**Frontend** </br>
> Don't forget to `cd` into project root before running the next set of commands.
```sh
cd frontend
npm install
# or if using pnpm
pnpm install
```

Finally, `cd` into this project's root directory and run docker compose:
```sh
docker-compose up -d
```
This will start the both the Django, Next.js, and MySQL services in port `8000`, `8080`, and`3306` respectively. See `docker-compose.yml` for more details.

The project files for backend and frontend are mounted automatically into their containers. So any changes you save into your local project files will be reflected into the containers.

``my-db`` will contain the `database` service's data. You can delete this anytime but data will be lost. This is not saved in the git repository.

Run migrations:
```sh
docker-compose run backend python manage.py migrate
```

## Testing
### backend
```sh
docker exec -it django_server pytest
```

## Some notes
When you encounter an error installing a certain package in the `backend` folder called `mysqlclient==2.1.1`, specifically an error where a package called `wheels` is involved and you're using WSL or Ubuntu, try install these packages first:
```sh
sudo apt install libmysqlclient-dev default-libmysqlclient-dev
```

To rerun migrations, just call the migrate command in the `backend` service (after backend has started):
```sh
docker exec -it django_server python manage.py migrate
```

Happy coding!