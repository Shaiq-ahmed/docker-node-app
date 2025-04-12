# Dockerfile (production-ready with multi-stage)

FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g eslint

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# --- Production Stage ---

FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 9191

CMD ["node", "dist/index.js"]