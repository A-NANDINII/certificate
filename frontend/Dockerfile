# Use Node 18 for building
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install --include=dev

COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]