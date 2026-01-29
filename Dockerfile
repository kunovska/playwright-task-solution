# Official Playwright image (includes browsers + deps)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Default envs (override with -e at runtime)
ENV CI=true
ENV HEADLESS=true

# Run tests automatically when container starts
ENTRYPOINT ["npx", "playwright", "test"]
