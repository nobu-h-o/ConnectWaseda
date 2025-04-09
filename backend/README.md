# ConnectWaseda Backend Setup
Initialization
```shell
poetry build
```

Running the server
```shell
poetry run python manage.py makemigrations
poetry run manage.py migrate
poetry run manage.py runserver
```

Make an admin on your local server
```shell
poetry run manage.py createsuperuser
```