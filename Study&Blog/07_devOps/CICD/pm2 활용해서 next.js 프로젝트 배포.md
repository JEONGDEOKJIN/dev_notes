

## 서버 접속 전 까지 (#SSH 로 서버 접속 전 까지 #⭐⭐⭐⭐⭐⭐)

1. package.json 에서 정의된 `pm2 start ecosystem.config.js` 를 실행시키기 위해  `pm2` 를 `전역적`으로 설치하기 (#local 로 설치하면, `npx` 또는 `./node_modules/.bin/pm2` 로 실행해야 하는데, 이는 `기존 프로젝트에 셋팅된 명령어를 활용하지 못 함!` 

```bash
# pm2 를 전역적 으로 설치하기 
npm install -g pm2

# pm2 버전 확인 
pm2 --version

# ecosystem.config.js 파일 존재 여부 확인
	# ecosystem.config.js 파일 : pm2 설정시 필요한 정보
	# ~/Desktop/NextInnonavtion/projects/snowPeak_BO_1 경로에서 아래와 같이 확인
ls ecosystem.config.js

# 파일이 없다면, ecosystem.config.js 파일 생성
pm2 init
	# 이렇게 하면 (projects\snowPeak_BO_1\ecosystem.config.js generated) 파일이 바로 생김
```

1. `ecosystem.config.js` 파일 설정하기 

```bash
module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next", // 빌드 파일 위치???
      args: "start",
      env_local: {
        NODE_ENV: "local",
        PORT: 3000, // 필요한 경우 포트 설정
      },
    },
  ],
};
```

1. pm2 로 실행해보기 

```bash
# 현재 pm2 가 하나만 있는지 확인
pm2 kill

# 빌드 파일 만들기 : 여기서 만든게 'node_modules/next/dist/bin/next' 여기로 들어감
npm run build-development 로 빌드 파일 만들고 

# 실행시키기
$ pm2 start ecosystem.config.js --env development 하니까, [localhost:30000](http://localhost:30000) 이 나옴 
(#⭐⭐⭐⭐⭐) 

	# 회사 코드의 경우, start-pm2, start-pm2-development, start-pm2-development 
		# 이렇게 구분되어 있기 때문에, 해당 명령어를 사용하면, 각각의 실행환경에서 online 이 뜸 
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/976bb4ee-fd9f-40ee-b2f4-fbb935118049/image.png)

1. 해당 sever 에 접근해서, 1) 원격 브랜치에 있는 develop 코드를 가져와서 2) 배포된 도메인인 [`https://dev-service.admin.snowpeak.co.kr/`](https://dev-service.admin.snowpeak.co.kr/) 로 업데이트 하기