FROM nginx

LABEL maintainer "mattias.rylander@gmail.com"

WORKDIR /usr/share/nginx/html

COPY dist .