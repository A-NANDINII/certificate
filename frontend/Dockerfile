# Stage 1: Build
FROM node:18-alpine as build

WORKDIR /app

# First copy only package files for better caching
COPY package*.json ./

# Clean install all dependencies (including devDependencies)
RUN npm ci --include=dev

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]