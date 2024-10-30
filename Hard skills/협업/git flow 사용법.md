# git flow


## release-1.0.0 브랜치를 기준으로 git flow로 feature 를 파고, merge 하기 (241022) 
```bash
# release-1.0.0 최신화 
	git switch release-1.0.0
	git pull    # CF. git pull origin release-1.0.0 이것과 동일하게, 현재 브랜치에 있는 것을 가져오는 명령어가 git pull

# 현재 release-1.0.0 기준으로 feature 브랜치 파기
  현재 release-1.0.0 브랜치에 있는지 확인
	git flow feature start customerCenter release-1.0.0    # 시작을 release-1.0.0 기준으로 파면, finish 할 때도, 여기를 기준으로 파짐

# 기능 개발 
	(불라불라)

# feature 에 커밋하기 
	git add .
	git commit -m "commit message"
	git push origin feature/<feature-name>

# merge 전 최신화 코드 인지 확인하기 
	git switch release-1.0.0 #release-1.0.0 브랜치로 이동
	git pull 
	
# feature 에 한거를 release-1.0.0 에 merge 하기 
	git switch feature/000 #feature 브랜치로 이동하기 #⭐⭐⭐
	git flow feature finish customerCenter release-1.0.0  # 합치기 # 이때, start 를 release-1.0.0 을 기준으로 만들었기 때문에, 자동으로 그곳에 붙을 것 이라는 가정
	충돌 해결 
	제대로 충돌 해결 되었는지, 원격 release-1.0.0 의 코드와 최종 확인 
	release-1.0.0 에 push 

```



## [요약 @240924]
```bash
# [오전] 프로젝트 시작할 때 
    # develop 브랜치 가서 최신화 하기
        1. git checkout develop-1
        2. git pull origin develop-1
    # 최신화된 develop 기준으로 feature 브랜치 만들기
        3. git flow feature start <feature-name>
        3-1. git push 해서, 브랜치를 원격에 푸쉬 (게시버튼)
          # 이걸 하면, 당연히, 원격 브랜치가 생김! 

# [마감] 하루 중 꼭 충돌 잘 해결하고 머지 하기 
    # feature/review 에 커밋 -> push
        4.	코드 수정 및 git add . → git commit -m "커밋 메시지" -> push 
          $ git add .
          $ git commit -m "style: 상품 후기 등록 모달"
          $ git push 
            # ✅ feature 의 local & 원격이 동일한지 확인

	# develop 브랜치로 이동해서 최신화
        5.	git pull origin develop-1
          5.1 '원격에서의 최신 코드' 가 '내 develop-1' 으로 실제로 들어왔는지 확인 

  # feature 브랜치로 이동 (#⭐⭐⭐⭐⭐)
	    6. git flow feature finish review     # feature/review 를 develop 에 merge 하고, feature/review 제거 
      7. git flow 에 따른 충돌 해결 
        # 이때, vim 편집기가 동작하면서 commit 메시지를 쓰라고 함
        # git flow 자체가 1) merge 하고 2) 로컬 브랜치를 제거 하는 것 
          # 그러면, esc -> :wq! 를 입력하면 됨. 
        # git flow 는 1) merge 2) 브랜치 정리의 역할 까지만 하고, push 는 별도로 해줘야 함

    # push 까지 해야 올라감 
      8. 원격에서 가장 최근에 반영되어야 하는게, 잘 병합 되었는지 필수 확인 (#⭐⭐⭐⭐⭐)
      9. git push
      10. jenkins 잘 통과 하는지 확인
      # [push 를 하지 않았을 경우 발햣 생하는 현상] 
        # '음. 이러고 나면, 근데, feature 브랜치인 review 가 사라지지 않는다.' 라는 문제 
        # develop-1 브랜치에, 업로드한 코드가 반영되지 않는다는 문제

# [참고]
  # [로그] 이렇게 하니까 깔끔하게 진행됨  (# `241002-코오롱` ) 에서 제대로 git-flow 를 사용해서, 의도된 대로 진행
```


## [자료 모음]

- 기존에 게임배틀 프로젝트에서 노션에 정리한 것 : https://www.notion.so/git-process-a58a2c65af2a47ffbabf19268cd29823?pvs=4


## [최신화] git flow 에서 develop 코드 최신화 하고 작업하기 

1. 기본적으로 받고 최신화 
```bash
# 현재 feature/review 브랜치에 있음 

# develop-1 브랜치로 이동 
git switch develop-1

# develop-1 브랜치의 변경사항을 pull 
git pull origin develop-1

# feature 로 이동
git switch feature/review 

# feature/review 에서 develop-1 병합하기 (합치기)
  # 1) 원격 브랜치가 삭제되는 경우
  git flow feature finish review #git flow 의 기능을 사용해서 병합 
    # [해석] 이 과정이 merge, rebase 랑 동일 
  # 2) 원격 브랜치가 삭제되지 않음 
    git merge origin/develop-1 # 또는 git rebase origin/develop-1
```


2. 더 깔끔하게 최신화
```bash
# feature/review 브랜치에서 원격 develop-1 브랜치의 변경 사항을 바로 병합
git fetch origin
git merge origin/develop-1 #또는 git rebase origin/develop-1
```

<br />

## [merge 하기] 현재까지 작업한거 merge 하기 

### 1) 기존에 하던 방식 
```bash
# 현재 나는 'feature/review' 에 있음 여기에서. 작업한거 스테이징 
git add . 

# feature/review 에서 커밋 메시지 붙이기
git commit -m "style: 모달"

# feature/review에서 작업한거를 해서 develop-1 에 머지하고, feature/review 제거
git flow feature finish review
  # 이걸 하게 되면, 내 feature 브랜치는 사라지고 develop 브랜치에 머지됨

# 그러면 develop-1 에서 push 를 하게 되는데, 원격 저장소에 있는 것들이 아직 merge 가 안 되었기 때문에 충돌이 발생하게 됨. 그래서 우선, pull 을 받고, merge 해결하고, push 하면 되지 않을까. 
git pull origin develop-1

(충돌해결)

# 충돌 해결된걸 push
git push origin develop-1

```

<br />

### 2) 현재까지 작업한거 merge 주임님 process
```bash
# 현재 나는 'feature/review' 에 있음 여기에서. 작업한거 스테이징 
git add . 

# feature/review 에서 커밋 메시지 붙이기
git commit -m "style: 모달"

# feature/review 에 push 
git push origin 000

# develop 최신화
git pull origin develop-1

# feature/review에서 작업한거를 해서 develop-1 에 머지하고, feature/review 제거
git flow feature finish review
  # 이걸 하게 되면, 내 feature 브랜치는 사라지고 develop 브랜치에 머지됨

(충돌해결)

# 충돌 해결된걸 push
git push origin develop-1

```

<br />

### 3) 다시 정리 

```bash
# [오전] 프로젝트 시작할 때 
    # develop 브랜치 가서 최신화 하기
        1. git checkout develop
        2. git pull origin develop
    # 최신화된 develop 기준으로 feature 브랜치 만들기
        3. git flow feature start <feature-name>
	
# [마감] 하루 중 꼭 충돌 잘 해결하고 머지 하기 
    # feature/review 에 커밋 -> push
        4.	코드 수정 및 git add . → git commit -m "커밋 메시지" -> push 
	# develop 브랜치로 이동해서 최신화
        5.	git pull origin develop (Optional)
    # feature/review 를 develop 에 merge 하고, feature/review 제거 
	    6.	git flow feature finish <feature-name>
        7. 분명히, merge 충돌이 남! 이걸 해결! -> 그러면 완전히 merge 됨
```



<br />


## [이슈] 가장 최신화된 git-flow 버전으로 할 때, feature/review 가 안 사라지는데? 

- 여전히 feature/review 가 있네
![Image](https://i.imgur.com/RYZ1Pb5.png)

```bash
## [요약 @240924]
# [오전] 프로젝트 시작할 때 
    # develop 브랜치 가서 최신화 하기
        1. git checkout develop
        2. git pull origin develop
    # 최신화된 develop 기준으로 feature 브랜치 만들기
        3. git flow feature start <feature-name>
	
# [마감] 하루 중 꼭 충돌 잘 해결하고 머지 하기 
    # feature/review 에 커밋 -> push
        4.	코드 수정 및 git add . → git commit -m "커밋 메시지" -> push 
          $ git add .
          $ git commit -m "style: 상품 후기 등록 모달"
          $ git push origin feature/review

	# develop 브랜치로 이동해서 최신화
        5.	git pull origin develop (Optional)
    
    # ? 여기에서 develop-1 에 있어야 하나? 아니면, feature/review 브랜치에 있어야 하나? -> feature/review 브랜치로 이동

    # feature/review 를 develop 에 merge 하고, feature/review 제거 
	    6.	git flow feature finish review
      7. 분명히, merge 충돌이 남! 이걸 해결! -> 그러면 완전히 merge 됨
        # 음. 이러고 나면, 근데, review 가 사라지지 않네? ❓❓❓❓❓❓❓❓ 왜지?
```

<br />


## [로그] 240926에 작업한 git flow 과정 기록 ( #로컬에 브랜치가 남는 오류 해결 )

1. `feature/deliveryAddress` 브랜치 생성

```bash
nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (feature/review_1)
$ git switch develop-1
Switched to branch 'develop-1'
Your branch is up to date with 'origin/develop-1'.

nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (develop-1)
$ git pull origin develop-1
From https://skins.shopby.co.kr/team-3661/wstore
 * branch            develop-1  -> FETCH_HEAD
Already up to date.

nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (develop-1)
$ git flow feature start deliveryAddress
Switched to a new branch 'feature/deliveryAddress'

Summary of actions:
- A new branch 'feature/deliveryAddress' was created, based on 'develop-1'
- You are now on branch 'feature/deliveryAddress'

Now, start committing on your feature. When done, use:

     git flow feature finish deliveryAddress


nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (feature/deliveryAddress)
$
```

[1-1] 문제는, 현재, 원격 브랜치는 아직 생성이 안 되어 있다는 거

![Image](https://i.imgur.com/SYas1mN.png)



## [로그] 이렇게 하니까 깔끔하게 진행됨  (# `241002-코오롱` )

```bash
# feature/delivery 브랜치에서 
    # feature/review 에 커밋 -> push
        4.	코드 수정 및 git add . → git commit -m "커밋 메시지" -> push 
          $ git add .
          $ git commit -m "style: 상품 후기 등록 모달"
          $ git push 
            # 근데 git push 랑 git push origin develop-1 이랑 뭐가 다르지?

# develop-1 브랜치로 이동한 뒤 
nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (feature/delivery)
$ git switch develop-1
Switched to branch 'develop-1'
Your branch is up to date with 'origin/develop-1'.

nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (develop-1)
Merge branch 'feature/delivery' into develop-1
$ git pull origin develop-1
From https://skins.shopby.co.kr/team-3661/wstore
 * branch            develop-1  -> FETCH_HEAD
Already up to date.

nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (develop-1)
$ git flow feature finish delivery
```


## 241010 git flow 작업 

![Image](https://i.imgur.com/eCrzOh6.png)



## release-1.0.0 기준으로 git flow feature 브랜치 파기 

```bash
# release-1.0.0 최신화 
	git switch release-1.0.0
	git pull    # CF. git pull origin release-1.0.0 이것과 동일하게, 현재 브랜치에 있는 것을 가져오는 명령어가 git pull

# 현재 release-1.0.0 기준으로 feature 브랜치 파기
	git flow feature start customerCenter release-1.0.0 
	# 시작을 release-1.0.0 기준으로 파면, finish 할 때도, 여기를 기준으로 파짐

# 기능 개발 
	(불라불라)
	
# feature 에 커밋하기 
	git add .
	git commit -m "commit message"
	git push origin feature/<feature-name>

# merge 전 최신화 코드 인지 확인하기 
	git switch release-1.0.0 #release-1.0.0 브랜치로 이동
	git pull 
	
# feature 에 한거를 release-1.0.0 에 merge 하기 
	git switch feature/category #⭐⭐⭐ feature 브랜치로 이동
	git flow feature finish customerCenter  # 합치기 # 이때, start 를 release-1.0.0 을 기준으로 만들었기 때문에, 자동으로 그곳에 붙을 것 이라는 가정
	충돌 해결
	제대로 충돌 해결 되었는지, 원격 release-1.0.0 의 코드와 최종 확인 
	release-1.0.0 에 push 
	
```

- git flow 로 프로젝트 파기 / `release-1.0.0 브랜치` 에서 했음
![Image](https://i.imgur.com/sFDwPZX.png)


- git flow finish 로 merge 하기  
![Image](https://i.imgur.com/lnlayhS.png)




# git flow init 부터 사용해보기 

### 프로젝트 시작 

```bash
# git 설치 
git flow init

# 이렇게 나오면, 'enter' 치면 됨
Which branch should be used for bringing forth production releases?
   - develop-1
   - main

# 여기에서 좀 막혔는데, 개발 서버를 입력하는거 같은데?
Which branch should be used for integration of the "next release"?
   - develop-1
Branch name for "next release" development: [] develop-1
   # 여기에서, 기준점을 정하는거 같은데, release-1.0.0 인 경우에 이걸로 했음 


# 이 부분들은 다 그냥 enter 를 치면 됨
How to name your supporting branch prefixes?
Feature branches? [feature/] 
Bugfix branches? [bugfix/] 
Release branches? [release/] 
Hotfix branches? [hotfix/] 
Support branches? [support/] 
Version tag prefix? [] 
Hooks and filters directory? [C:/Users/nextinnovation/Desktop/NextInnonavtion/projects/wstore/.git/hooks] 


# feature 브랜치 설정하기 
nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (develop-1)
$ git flow feature start review
Switched to a new branch 'feature/review'

Summary of actions:
- A new branch 'feature/review' was created, based on 'develop-1'
- You are now on branch 'feature/review'

Now, start committing on your feature. When done, use:

     git flow feature finish review


nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/NextInnonavtion/projects/wstore (feature/review)
$
```

![Image](https://i.imgur.com/bkKUskQ.png)

### git flow 활용해서 commit 하기 

- 이거는 성심 주임님이 준 자료 참고 (git-flow 가이드 (1).docx) 



# 익스텐션
```bash
cntrl + w 활용해서 좌우 대칭되어서 생성되게 하기  
```