# ConnectWaseda Backend Setup
Initialization
```shell
poetry build
```

Running the server
```shell
poetry run python manage.py makemigrations
poetry run python manage.py migrate
poetry run python manage.py runserver
```

Make an admin on your local server
```shell
poetry run python manage.py createsuperuser
```