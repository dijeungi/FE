FROM node:alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . /app

# ARG로 환경 변수 받기
ARG REACT_APP_NAVER_CLIENT_ID
ARG REACT_APP_NAVER_CLIENT_SECRET
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_GOOGLE_CLIENT_SECRET
ARG REACT_APP_KAKAO_REST_API_KEY
ARG REACT_APP_KAKAO_CLIENT_SECRET
ARG REACT_APP_API_URL
ARG REACT_APP_FRONT_URL
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_KAKAOMAP_KEY

# 환경 변수 설정 (React에서는 process.env가 런타임에 적용되지 않음 → JS 파일로 생성)
RUN echo "window._env_ = {" > /app/public/env-config.js && \
    echo "  REACT_APP_NAVER_CLIENT_ID: \"${REACT_APP_NAVER_CLIENT_ID}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_NAVER_CLIENT_SECRET: \"${REACT_APP_NAVER_CLIENT_SECRET}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_GOOGLE_CLIENT_ID: \"${REACT_APP_GOOGLE_CLIENT_ID}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_GOOGLE_CLIENT_SECRET: \"${REACT_APP_GOOGLE_CLIENT_SECRET}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_KAKAO_REST_API_KEY: \"${REACT_APP_KAKAO_REST_API_KEY}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_API_URL: \"${REACT_APP_API_URL}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FRONT_URL: \"${REACT_APP_FRONT_URL}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FIREBASE_API_KEY: \"${REACT_APP_FIREBASE_API_KEY}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FIREBASE_AUTH_DOMAIN: \"${REACT_APP_FIREBASE_AUTH_DOMAIN}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FIREBASE_PROJECT_ID: \"${REACT_APP_FIREBASE_PROJECT_ID}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: \"${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_FIREBASE_APP_ID: \"${REACT_APP_FIREBASE_APP_ID}\"," >> /app/public/env-config.js && \
    echo "  REACT_APP_KAKAOMAP_KEY: \"${REACT_APP_KAKAOMAP_KEY}\"" >> /app/public/env-config.js && \
    echo "};" >> /app/public/env-config.js

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
