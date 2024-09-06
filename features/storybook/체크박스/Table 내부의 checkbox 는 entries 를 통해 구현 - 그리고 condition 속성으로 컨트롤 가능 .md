



### 해야 하는 것 
```bash
- '상위 고정' 으로 체크된 것은 '체크 버튼 활성화' 되게 하기 
- '상위 고정' 체크 된 것은 '맨 위에' 보이게 하기 
```

### 구현 방식 

```jsx
- Entries 안에 isPinned 속성이 있음 
- isPinned 속성 안에 condition 이 있어서, 'isPinned' 에 따라서 보일지 말지 결정해~ 라고 명령해주면 됨 
```


### 구현 코드

```jsx
<Table
          data={data}
          totalCount={data.items.length}
          headers={
            data?.items[0]?.deleted ? headerTickerPosting2 : headerTickerPosting
          } // '삭제' 클릭 여부에 따라 다른 header 구조
          pageName="page"
          pageClick={onMovePage}
          Entries={{
            buttonEntries: {
              delete_btn: {
                label: "삭제",
                fun: (item) => onDelete(item),
              },
              isPinned: {
                label: " ",
                fun: (item) => onPinned(item),
                type: "checkbox",
                condition: "isPinned", // item.isPinned 를 참조 | 우선 이것만 활성화 해도 상단 3개만 'ON' 이 됨
                // subCondition: true, // item.isPinned 가 true 일 때만 활성화
              },
            },
            changeEntries: {
              deleted: changeBoolean,
            },
          }}
          // checkName="isPinnedArr"
          // is_pinned 로 변경함. 여기에서 name 을 header 의 name 속성으로 넣어주니까, 체크박스 활성화가 되네
          // isPinnedArr 로 변경함. isPinnedArr 이거는 체크박스 담은 배열 | 이게 현재 Table 의 name 으로 넘어감
        />
```

### 결과
![Image](https://i.imgur.com/JWLlX6e.png)


