import os
from Connect_Waseda_backend.wsgi import application as app

if __name__ == "__main__":
    # for local dev if you ever want to run python main.py
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Connect_Waseda_backend.settings")
    from django.core.management import execute_from_command_line
    execute_from_command_line()