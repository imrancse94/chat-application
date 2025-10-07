# Stage 1: Build React app
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx + Self-Signed SSL
FROM nginx:alpine

# Install OpenSSL
RUN apk add --no-cache openssl bash

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Environment variable for IP (set during build)
ARG SERVER_IP
ENV SERVER_IP=51.21.152.103

# Generate self-signed certificate with IP in SAN
RUN mkdir -p /etc/ssl/private /etc/ssl/certs && \
    echo "subjectAltName = IP:${SERVER_IP}" > /tmp/ssl_ext.cnf && \
    openssl req -x509 -nodes -newkey rsa:2048 \
      -keyout /etc/ssl/private/nginx-selfsigned.key \
      -out /etc/ssl/certs/nginx-selfsigned.crt \
      -subj "/C=US/ST=NA/L=NA/O=SelfSigned/CN=${SERVER_IP}" \
      -extensions v3_req \
      -sha256 \
      -days 365 \
      -config <(cat /etc/ssl/openssl.cnf; echo "[v3_req]"; echo "subjectAltName = IP:${SERVER_IP}")

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
