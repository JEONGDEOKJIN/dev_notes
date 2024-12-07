
### 오로라 스킨 영상 가이드 (240910)

(참고 영상 : https://www.youtube.com/watch?v=4zeusLdLizs)

- 샵바이 개발 가이드에서 `git stash` 가 나옴. 


- `임시 저장소` 에서, `git remote add upstream https://skins.shopy.co.kr/shopby/aurora-skin.git` 이걸 사용한다는 건 무슨 의미지? 
```bash
그냥, 현재의 로컬 temp 저장소랑 
원격 저장소 주소 'https://skins.shopy.co.kr/shopby/aurora-skin.git' 를 연결하고 
이름을 upstream 으로 짓겠다는 의미?  
```

![Image](https://i.imgur.com/7Be8szr.png)


- 받아온 걸 이렇게 확인하는 구나. 

![Image](https://i.imgur.com/r8agbQ5.png)


- 응? 받아온 걸 `fetch` 를 사용해서 받아온다구? (#❓❓❓❓❓ 이게 진짜 뭐지 #rebase 같은거 없이?)

![Image](https://i.imgur.com/Q1wUQ57.png)


- `fetch` 이후 바로 `merge` 를 한다고??????? 
![Image](https://i.imgur.com/tjc4pVf.png)


- 그러면, `incoming change` 랑, `current change` 이게 뭐가 다른걸까나
![Image](https://i.imgur.com/4VJGAHJ.png)

- 충돌 해결하고 패키지 설치 -> 이건, `yarn` 으로 오캐이 


- 그 다음 바로, temp 에 push 를 한다고? rebase 같은거 없이? 
![Image](https://i.imgur.com/PwSuzzm.png)

