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

# Sử dụng image nginx để chạy ứng dụng React
FROM nginx:stable-alpine

# Sao chép thư mục build của React vào thư mục chứa tệp tĩnh của nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Khởi động nginx khi container được chạy
CMD ["nginx", "-g", "daemon off;"]