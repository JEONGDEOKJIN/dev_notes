
### git stash 가 필요한 순간
```bash
- 첫 번째 커밋은 완성도가 있어서, 바로 staging 을 했다. 
- 그런데, 두 번째 커밋은 아직 못 쓴게 있어서, 커밋을 못 했다. 
- 그런데 첫 번째 커밋을 빨리 push 하고 싶다. 
- 그러면 애매하게 남은 두 번째 커밋을 포함해서 push 할 것 인가? 
- 이때, stash 를 쓸 수 있는 듯 하다.
```
(애매하게 남은 작성물)
![Image](https://i.imgur.com/EAfLP34.png)


### 이렇게 해보자 

```bash

# 변경된 것 staging 하기 
- + 버튼 눌러서, '변경 사항 섹션'에 아무것도 없게 하기 

# git stash 에 이름 작성해서, 현재 상태 저장하기
git stash save "스노우피크 설계 단계 고려할 것들 작성중"

# push 하기
git push (#또는 gui 아이콘 클릭)

# (여기에서 아무것도 변경하지 말고 바로 복원할 stash list 확인)
    # 여기에서 뭔가를 작성해서 변경사항이 생기면, 꼬임 ⭐⭐⭐⭐⭐

# stash list 로 확인함
nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/DJ-DEV/dev_notes (main)
$ git stash list
stash@{0}: On main: 스노우피크 설계 단계 고려할 것들 작성중-2
stash@{1}: On main: 스노우피크 설계 단계 고려할 것들 작성중

# 해당 버전으로 복원 
$ git stash apply stash@{2}

# stash 제거
$ git stash clear



```