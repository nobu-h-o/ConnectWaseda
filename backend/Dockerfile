FROM python:3.12-slim

# Install OS deps for psycopg2
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /app

# Copy Poetry files
COPY pyproject.toml poetry.lock ./
RUN pip install poetry \
  && poetry config virtualenvs.create false \
  && poetry install --no-root --no-interaction --no-ansi

# Copy all code
COPY . .

# Expose port
ENV PORT 8080
EXPOSE 8080

# At startup: migrate and serve
ENTRYPOINT ["sh", "-c", "\
    python manage.py migrate --no-input && \
    gunicorn Connect_Waseda_backend.wsgi:application \
      --bind 0.0.0.0:${PORT} --workers 2"]
