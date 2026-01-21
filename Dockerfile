FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code (cache bust: 726eea2)
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 8080

# Start
CMD ["node", "dist/index.js"]
