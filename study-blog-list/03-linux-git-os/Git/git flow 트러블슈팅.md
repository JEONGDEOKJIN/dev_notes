

### git flow feature finish 를 통해, 성공적으로 merge 되었음에도, feature 가 자동적으로 사라지지 않는 경우 

- git flow feature finish 로 develop-1 에 성공 merge 되었음에도, feature 브랜치가 사라지지 않음. 추측 되는 원인은 `그 중간에 conflict` 가 발생해서 그렇지 않나? 라는 추측 

![Image](https://i.imgur.com/WbtCFPU.png)

<br />

- 확인 결과

```
- 중간에 conflict 가 나면, 로컬에 있는 feature 가 유지됨. 
- conflict 가 없으면, git flow feature finish 이후 성공 merge 되면, 원격 브랜치는 자동 삭제됨. 
```