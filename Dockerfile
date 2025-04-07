# Sử dụng image node chính thức
FROM node:22

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json của backend
COPY backend/package*.json ./backend/

# Cài đặt thư viện cho backend
RUN cd backend && npm install

# --------------------------------------------------------------

# Copy file package.json và package-lock.json của frontend
COPY frontend/package*.json ./frontend/

# Cài đặt thư viện cho frontend
RUN cd frontend && npm install

# Copy toàn bộ code vào container
COPY . .


RUN chmod +x start.sh
# Expose port cho backend và frontend
EXPOSE 5000 3000

# Chạy script start.sh để khởi động cả backend và frontend
CMD ["sh", "./start.sh"]