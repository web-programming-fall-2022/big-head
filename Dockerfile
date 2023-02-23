FROM docker.repos.balad.ir/node:16 as builder

WORKDIR /bighead
RUN npm i -g pnpm
COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN pnpm install
COPY . .

RUN pnpm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /bighead/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
