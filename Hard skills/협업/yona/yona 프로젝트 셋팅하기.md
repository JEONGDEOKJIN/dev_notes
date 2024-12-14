




# git 설치 
```bash
$ git init
```

# yona 연결하기 
	
```bash
# 주소를 co.kr 로 해야 받아짐     
	# 원격 주소 이름을 yona-2 
	git remote add yona-2 https://busiman1@yona.nextinnovation.co.kr/si/spk-web-admin

	# 원격 주소 이름을 origin 
	git remote add origin https://busiman1@yona.nextinnovation.co.kr/si/spk-web-admin


# 연결했으면, 비번 을 쳐야 함 
```

	
	
# pull 받기 
```bash
# git pull 을 하려 했으나, 자동 stream 설정이 안 되어 있어서, 우선, 수동으로 받음 

	# main 받기 
	$ git pull yona-2 main
	# develop 받기 
	$ git switch develop
	$ git pull yona-2 develop
```


![Image](https://i.imgur.com/WnSJnCv.jpeg)


# 잘못된 저장소 지우고 다시 셋팅하기
![Image](https://i.imgur.com/oNpZGbC.jpeg)


# git pull 명령어를 실행하려면, 사전에 연결을 해줘야 함 
```bash
git branch --set-upstream-to=origin/<branch> develop
```

![Image](https://i.imgur.com/5tD3rTF.jpeg)
