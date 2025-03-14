FROM node:22.14-alpine AS builder

COPY . /app

WORKDIR /app

RUN --mount=type=cache,target=/root/.yarn yarn

RUN --mount=type=cache,target=/root/.yarn yarn build

FROM node:22.14-alpine AS release

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile --production

ENTRYPOINT ["node", "build/index.js"]
