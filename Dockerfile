# Build stage for React app
FROM node:16-alpine AS build-stage
WORKDIR /app
COPY whispertranscribe-frontend/package*.json ./
RUN npm ci --silent
COPY whispertranscribe-frontend/ ./
RUN npm run build

# Production stage for Flask app
FROM python:3.10.11-slim AS production-stage
WORKDIR /app
RUN apt-get update && \
    apt-get install -y git && \
    apt-get install -y ffmpeg
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . /app
COPY --from=build-stage /app/dist /app/whispertranscribe-frontend/dist
EXPOSE 5000
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
