FROM node:alpine as build
WORKDIR /app
# COPY package.json /app
# --silent : 터미널에 보이는 로그를 최소화
# RUN npm install --silent
# RUN npm install
# COPY . /app
# COPY /Users/danny_mac/Documents/vscode/blog/blog-frontend /app
COPY . /app

RUN npm run build

FROM nginx

# --from=bulid : 위에서 생성한 build 이미지
# 위에서 생성한 build 이미지의 /app/build를 /usr/share/nginx/html에 복사
COPY --from=build  /app/build /usr/share/nginx/html 
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY /Users/danny_mac/Documents/vscode/book-deploy/docker/frontend/nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# compose에 의해 구성된 네트워크에 개별로 배포하는 방법
# 1. 배포하고자 하는 컨테이너 stop & remove
# 2. 이미지 재생성 및 컨테이너 생성(이미 네트워크에서 out되어 정상적으로 start 안됨)
# * 컨테이너 생성 시 compose 배포 시 적용되는 네이밍 정책 적용(보기 좋으니까)
# >>> docker run -d --name ex09-frontend-1 -p 80:80 
# 3. 네트워크 설정
# >>> 네트워크 연결 : docker network connect [네트워크ID] [컨테이너ID]
# >>> 네트워크 해제 : docker network disconnect [네트워크ID] [컨테이너ID]
# 4. 해당 컨테이너 실행 
# >>> docker start [컨테이너ID]
# 5. 실행 및 네트워크 연결여부 확인
# docker inspect [네트워크ID] 
# containers 내 새로 배포한 컨테이너가 저장됐는지 확인 

# docker compose up -d 로 인해 구성된 네트워크에 다시 넣으면서 컨테이너 올리는 명령어
# docker run -d --name ex09-frontend-1 --net ex09_network --net-alias frontend -p 80:80 ex09-frontend

# 1) 컨테이너 삭제 후 재빌드v
# 2) 이미지까지 삭제 후 다운로드 미 재빌드