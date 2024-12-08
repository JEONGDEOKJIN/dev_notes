
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
- + 버튼 눌러서 아무것도 없게 하기 

git stash save "스노우피크 설계 단계 고려할 것들 작성중"

push 함 


# stash list 로 확인함
nextinnovation@DESKTOP-LHQ5S8E MINGW64 ~/Desktop/DJ-DEV/dev_notes (main)
$ git stash list
stash@{0}: On main: 스노우피크 설계 단계 고려할 것들 작성중-2
stash@{1}: On main: 스노우피크 설계 단계 고려할 것들 작성중

```