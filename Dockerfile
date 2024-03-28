# Sử dụng image Node.js làm base image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

RUN npm install -g serve
RUN serve -s build
