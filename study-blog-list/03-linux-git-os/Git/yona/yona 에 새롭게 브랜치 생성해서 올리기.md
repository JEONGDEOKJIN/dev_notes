

# [TASK] 해야 하는 것 
```
- yona 에 브랜치를 생성해서, 현재 로컬 pc 에 있는 코드를 올리기 
```

# 진행 및 시행착오 

```bash
- 지금 이해하기로는 
    1) yona 원격 저장소에 접속해서 
    2) 내 로컬에 있는 소스 코드를 올리면 된다. 라는 건데

- 궁금한거는 
    - 원격저장소 gitlab과 yona 가 동시에 운영될 수 있나? 
        : 이 문제는, '동시 운영' 이 가능하다고 하네 (https://chatgpt.com/share/6736d7a5-4960-8009-8203-5f68f4cd40f3)

- 그러면 이렇게 해보자 
    1. Yona 원격 저장소 추가:
    git remote add yona-2 https://busiman1@yona.nextinnovation.kr/si/1004bang-ilg-web


    2. 원격 저장소 목록 확인
    git remote -v

    3. Yona에 올릴 새 브랜치를 '로컬' 에 생성 
    git checkout -b yona-feature/admin 
        #아직 원격에 넣은 건 아니고, 로컬에서 생성한 것 임

    4. 커밋 
    git add .
    git commit -m "Upload source code to Yona"

    5. 푸쉬 
    git push yona yona-feature/admin #yona 에 푸쉬 
    
    CF. Gitlab 비교 
    - GitLab에 푸시하려면 git push origin [브랜치명] (ex: gl-feature/menu) 
    - Yona에 푸시하려면 git push yona yona-feature/menu (cf: 요나는 접두사로 yona 를 사용하는게 보통의 컨벤션 인듯)

```


### 실제로 해보자 

- 우선, yona 원격 브랜치에 접속했고, 리스트가 나옴 
![Image](https://i.imgur.com/9OfjUKu.png)

<br/>

- '접두사' 로 원격 저장소를 gitlab 과 yona 로 분류하고, 로컬에 저장소 생성 
![Image](https://i.imgur.com/h0FfjO7.png)

<br/>

- 이렇게 하고 나면, 비밀번호를 작성하라고 나오는데, 기재해둔 것을 작성하면 됨 
![Image](https://i.imgur.com/7ImI3X9.png)

![Image](https://i.imgur.com/7CAq9Mf.png)

<br />



# 결론 

- 아래와 같이 진행하니 문제없이 push 가 되었음. 
```bash
- 그러면 이렇게 해보자 
    1. Yona 원격 저장소 추가:
    git remote add yona https://busiman1@yona.nextinnovation.kr/si/1004bang-ilg-web


    2. 원격 저장소 목록 확인
    git remote -v

    3. Yona에 올릴 새 브랜치를 '로컬' 에 생성 
    git checkout -b yona-feature/admin 
        #아직 원격에 넣은 건 아니고, 로컬에서 생성한 것 임

    4. 커밋 
    git add .
    git commit -m "Upload source code to Yona"

    5. 푸쉬 
    git push yona yona-feature/admin #yona 에 푸쉬 
    
    CF. Gitlab 비교 
    - GitLab에 푸시하려면 git push origin [브랜치명] (ex: gl-feature/menu) 
    - Yona에 푸시하려면 git push yona yona-feature/menu (cf: 요나는 접두사로 yona 를 사용하는게 보통의 컨벤션 인듯)
```