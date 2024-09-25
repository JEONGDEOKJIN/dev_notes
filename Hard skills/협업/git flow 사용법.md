# git flow

## [요약 @240924]
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
          $ git add .
          $ git commit -m "style: 상품 후기 등록 모달"
          $ git push origin feature/review

	# develop 브랜치로 이동해서 최신화
        5.	git pull origin develop (Optional)
    
    # ? 여기에서 develop-1 에 있어야 하나? 아니면, feature/review 브랜치에 있어야 하나? -> feature/review 브랜치로 이동

    # feature/review 를 develop 에 merge 하고, feature/review 제거 
	    6.	git flow feature finish review
      7. 분명히, merge 충돌이 남! 이걸 해결! -> 그러면 완전히 merge 됨
      8. 음. 이러고 나면, 근데, review 가 사라지지 않네? ❓❓❓❓❓❓❓❓ 왜지?
```


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


## 가장 최신화된 git-flow 버전으로 할 때, feature/review 가 안 사라지는데? 

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


