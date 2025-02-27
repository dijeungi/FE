#!/bin/sh

# Convert .env.local to env-config.js for frontend use
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
while IFS='=' read -r key value || [ -n "$key" ]; do
  echo "  $key: \"$value\"," >> /usr/share/nginx/html/env-config.js
done < /usr/share/nginx/html/.env.local
echo "}" >> /usr/share/nginx/html/env-config.js

# Run Nginx
exec "$@"
