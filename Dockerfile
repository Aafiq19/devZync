# ============================================
# devZync — Dockerfile
# Uses Nginx to serve static frontend files
# ============================================

# Step 1: Use official lightweight Nginx image
FROM nginx:alpine

# Step 2: Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy our website files into Nginx's serve folder
COPY . /usr/share/nginx/html

# Step 4: Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 5: Expose port 80 (HTTP)
EXPOSE 80

# Step 6: Start Nginx when container runs
CMD ["nginx", "-g", "daemon off;"]
