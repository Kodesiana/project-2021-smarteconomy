FROM python:3.11-slim-bullseye AS base

WORKDIR /usr/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app
COPY ./logging.conf .

# CMD ["uvicorn", "app.main:app", "--log-config", "logging.conf", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
CMD ["gunicorn", "--log-config", "logging.conf", "--worker-class", "uvicorn.workers.UvicornWorker", "--workers", "2", "--forwarded-allow-ips", "*", "--bind", "0.0.0.0:8000", "app.main:app"]
