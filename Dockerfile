# ---- Build stage ----
FROM node:24-alpine AS builder

WORKDIR /app

# Copy workspace config and lockfile
COPY package.json package-lock.json tsconfig.base.json ./

# Copy workspace packages
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/frontend/package.json packages/frontend/svelte.config.js packages/frontend/vite.config.ts packages/frontend/tsconfig.json ./packages/frontend/

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy source files
COPY packages/shared/src ./packages/shared/src
COPY packages/frontend/src ./packages/frontend/src

# Build shared package first, then frontend
RUN npm run build:shared
RUN npm run build:frontend

# ---- Production stage ----
FROM node:24-alpine AS runner

WORKDIR /app

# Copy workspace config and lockfile
COPY package.json package-lock.json tsconfig.base.json ./

# Copy built packages
COPY --from=builder /app/packages/shared/package.json /app/packages/shared/dist ./packages/shared/
COPY --from=builder /app/packages/frontend/package.json ./packages/frontend/
COPY --from=builder /app/packages/frontend/build ./packages/frontend/build

# Install production dependencies only
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "packages/frontend/build/index.js"]
