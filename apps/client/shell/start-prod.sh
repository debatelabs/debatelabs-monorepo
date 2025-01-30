REACT_APP_SERVER_HOST=${REACT_APP_SERVER_HOST}
pnpm i
pnpm build
serve -s build/
