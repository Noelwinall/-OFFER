FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Clean and rebuild from scratch
RUN rm -rf dist && pnpm build && echo "BUILD_TIME=$(date -u +%Y%m%d_%H%M%S)" > /app/build-info.txt && cat dist/index.js | head -c 500

# Expose port
EXPOSE 8080

# Start
CMD ["node", "dist/index.js"]
