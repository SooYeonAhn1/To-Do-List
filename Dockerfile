FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY run.py .
COPY config.py .

COPY app/ app/

EXPOSE 5000

CMD gunicorn --bind 0.0.0.0:${PORT} run:app