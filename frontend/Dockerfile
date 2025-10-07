# Stage 1: Build React app
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx + Self-Signed SSL
FROM nginx:alpine

# Install OpenSSL and bash (for flexibility)
RUN apk add --no-cache openssl bash

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Environment variable for your server DNS name (not IP)
ARG SERVER_DNS
ENV SERVER_DNS=${SERVER_DNS:-ec2-51-21-152-103.eu-north-1.compute.amazonaws.com}

# Generate self-signed certificate with DNS in SAN
RUN mkdir -p /etc/ssl/private /etc/ssl/certs && \
    echo "[req]" > /tmp/openssl.cnf && \
    echo "distinguished_name=req" >> /tmp/openssl.cnf && \
    echo "[v3_req]" >> /tmp/openssl.cnf && \
    echo "subjectAltName=DNS:${SERVER_DNS}" >> /tmp/openssl.cnf && \
    openssl req -x509 -nodes -newkey rsa:2048 \
      -keyout /etc/ssl/private/nginx-selfsigned.key \
      -out /etc/ssl/certs/nginx-selfsigned.crt \
      -subj "/C=US/ST=NA/L=NA/O=SelfSigned/CN=${SERVER_DNS}" \
      -extensions v3_req \
      -sha256 \
      -days 365 \
      -config /tmp/openssl.cnf && \
    rm -f /tmp/openssl.cnf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/chat-app.conf

# Expose ports
EXPOSE 80 443

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
