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
This will start the both the Django server and the Next.js server in port `8000` and `3000` respectively. See `docker-compose.yml` for more details.

The project files for backend and frontend are mounted automatically into their containers. So any changes you save into your local project files will be reflected into the containers.

Happy coding!