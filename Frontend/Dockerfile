FROM node:20

WORKDIR /app

# 👇 copy only frontend package.json
COPY frontend/package*.json ./

RUN npm install

# 👇 copy frontend code only
COPY frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npx", "remix-serve", "build/index.js"]
