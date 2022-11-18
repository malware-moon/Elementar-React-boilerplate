# =====================================
#               BASE
# =====================================
FROM node:16-alpine3.15 as base
# =====================================
#               INSTALL
# =====================================
# Create app directory
FROM base as install
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# =====================================
#             DEVINSTALL
# =====================================
# =====================================
#               TEST
# =====================================
FROM install as test
RUN CI=true npm run test 
# =====================================
#               PROD
# =====================================
FROM install as prod
RUN npm run build
CMD ["npx", "http-server"]
# =====================================
#               DEV
# =====================================
FROM install as dev
CMD PORT=${ADMIN_CONSOLE_CONTAINER_PORT} npm start --host 0.0.0.0