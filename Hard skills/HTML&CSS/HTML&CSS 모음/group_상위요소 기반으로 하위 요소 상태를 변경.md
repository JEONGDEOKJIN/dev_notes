


### 원리 
```
- 상위 요소에 group 클래스를 추가 
- 하위 요소는 상위 요소의 상태 변경에 따라서, 스타일 변경
```

### 예제 코드 
```jsx
<span className="relative group">
    <Image
    width={30}
    height={30}
    alt="cross_plus_gray"
    src="/icons/icon_plus_gray.svg"
    className="group-hover:hidden" // Hover 시 숨김
    />
    <Image
    width={30}
    height={30}
    alt="cross_plus_pink"
    src="/icons/icon_plus_pink.svg"
    className="hidden group-hover:block cursor-pointer" // Hover 시 표시
    />
</span>
```