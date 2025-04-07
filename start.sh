#!/bin/bash

# Chạy backend
cd backend
node server.js &

# Chạy frontend
cd ../frontend
node app.js &

# Giữ container chạy
wait