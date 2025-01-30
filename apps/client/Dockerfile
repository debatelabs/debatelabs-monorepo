FROM node:lts

WORKDIR /app

COPY ./shell ./shell

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN npm install -g serve

RUN chmod a+x /app/shell/start-dev.sh
RUN chmod a+x /app/shell/start-prod.sh

EXPOSE 3000
