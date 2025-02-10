FROM node:23-alpine

WORKDIR /app

COPY ./shell ./shell

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN chmod a+x /app/shell/start-dev.sh
RUN chmod a+x /app/shell/start-prod.sh
