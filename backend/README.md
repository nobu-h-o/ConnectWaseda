# ConnectWaseda Backend Setup
Initialization
```shell
poetry update
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

Deployment
```shell
gcloud run deploy connect-waseda-backend \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated
```