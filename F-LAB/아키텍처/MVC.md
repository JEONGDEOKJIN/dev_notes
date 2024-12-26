### MVC

- 우선, 이건 프론트에 해당하는 것.

- model
    - storage저장 역할
    - 변경을 알리는 역할 (REDUX, MOBX, ZUSTAND…)
- controller
    - data 수집 및 가공
- view
    - 데이터를 가지고 그려진 화면
    - 예시
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5f8b466d-6bf7-4384-8fe7-959c7a5b8f4d/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/74e69e98-2552-4c33-b045-7c4c1a5dff21/image.png)
    
    이 데이터는 어딘가에서 옴 
    
    이 데이터는 hook 에서 가져옴 
    
    물론, useQuery 를 이 페이지 안에서 넣어도 돌아감 
    
    그런데, ‘재사용성’ 을 높이기 위해서!!!!!!!! 
    
    비스슷한 페이지에서 쓸 수 있으니까 
    
    그래서, 이렇게 hook 이 들어가는게, controller 
    
- hook 의 종류 (hook 이 방대로 )
    - 이미 프론트엔드가 갖고 있는 데이터를 가공하는 hook
    - backend 에서 데이터를 추가 가지고 오는 경우
        - 이 경우, hook 안에서 데이터를 가지고 오는 로직을 뺀다. (#⭐⭐⭐⭐⭐)
        - service, repository, api
        - 이게 왜 3개 로 나뉘지????????????
            - DDD 랑 관련되는 질문
        - DOMA
    - 이 solid 원칙 지키기 위해
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/fe9a98ee-6717-4808-b493-6d348d9a83e1/image.png)