FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate

CMD sh -c "yarn prisma migrate deploy && yarn seed && yarn dev"
