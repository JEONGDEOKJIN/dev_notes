### [251127] 트러블 슈팅

### 문제 상황

```bash
# pnpm build 를 실시함
pnpm build 

# 그런데, 
lecture, accounts 쪽을 넘어가지 못 하고 에러가 남

# 그렇다면, 그 상단에서의 문제일 수 있음. 
```

![image.png](attachment:7adbb92b-c9e3-49e1-a489-8ab069a736a6:image.png)

![image.png](attachment:c8fcdccc-da9f-43bb-b44a-d576185c9c06:image.png)

![image.png](attachment:c1ec6c2a-f4ec-4e30-addc-1a91d63a8727:image.png)

```bash
# 문제 원인 
	: node 버전이 안 맞았음 
		: 내가 설치하고 실행한 버전은 node v20
		: 그에 기반해서 pnpm 을 설치하고 -> pnpm 환경을 구성함 
		: 그런데 pnpm build 시 필요한 node 버전은 v18 로 명시가 되어 있었음 
		: so, build 가 안 되었던 것 임. 

	: nvm 으로 node 버전 관리를 하고 있었는데, 이게 관리가 안 되었음. 

# [해결방식1] :.nvmrc 에서 바라보는 버전으로 node 맞추기 
	# 현재 사용중인 nvm 버전 확인 
		nvm -v #우선, 버전이 나오기만 하면 됨
	
	# 루트에 있는 .nvmrc 파일이 바라보는 node 버전을 설치 하게 함 
	# nvm use 에서 필요로 하는 버전은 v18.20.5 이었음
	# 프로젝트가 요구하는 올바른 nvm 버전으로 전환
		nvm use 18.20.5

	# 기존 node 버전으로 설치했던 node modules 모두 삭제 
		rm -rf node_modules apps/*/node_modules packages/*/node_modules
		# 왜냐면, 기존 버전의 노드로 설치되어 있으면, 의존성이 기존 노드 버전에 맞춰지기 때문
		
	# pnpm 부터 다시 설치 
		npm install pnpm -g
		
	# 해당 pnpm 으로 다시 pnpm 환경 설치 
		pnpm install 
		
	# 빌드 실행
		pnpm build                
	
```

- nvmrc 파일 설정 화면

![image.png](attachment:8e096d9e-e7ae-4307-ab88-86b259e527bd:image.png)