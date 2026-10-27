FROM node:24.15.0-bookworm-slim

WORKDIR /workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/package.json
COPY server/package.json ./server/package.json
COPY packages/wui-react/package.json ./packages/wui-react/package.json
RUN corepack enable && corepack pnpm@11.5.2 install --filter api --prod --frozen-lockfile --ignore-scripts

COPY api ./api
COPY server ./server
COPY src/platform/auth/model/accessDecision.ts ./src/platform/auth/model/accessDecision.ts
COPY config/route-policy.json ./config/route-policy.json
RUN mkdir -p /data && chown -R node:node /workspace /data

ENV NODE_ENV=production \
    ENTERPRISE_ENABLED=true \
    ENTERPRISE_DB_PATH=/data/enterprise.sqlite \
    TRACKING_STORE=memory \
    TRACKING_API_PORT=5200

USER node
EXPOSE 5200
CMD ["node", "api/server.js"]
