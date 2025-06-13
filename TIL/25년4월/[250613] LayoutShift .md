

# [문제 상황] 조건부 렌더링 과정에서 자식의 gap 속성 때문에 조건 true/false 에 따라서 ui 가 변동됨
```tsx
{selectedRHFKeys &&
  item.id &&
  isExmnIDMatched(item.id, selectedRHFKeys)(
    <ChildExmnSheet ... />
  )
}
```

```
ChildExmnSheet가 조건부로 렌더됨

조건이 true → false, 혹은 false → true 바뀌면서 DOM이 추가/제거

이때 자식 div의 gap 속성 때문에 레이아웃 점프 발생
```

# gap 대신 margin 적용 
```tsx
<div className="pt-[4px] flex flex-col">
  {childQueList?.map((item, idx) => {
    const shouldRender = isAnswerYes && selectedQstn;

    return (
      <div
        key={`ExaminationSheet_question_list_${idx}`}
        className={classNames(
          shouldRender ? "mb-[20px]" : "mb-0",
          "transition-all duration-300"
        )}
      >
        {shouldRender && (
          <ChildExmnSheet
            IDFromParentComponent={parentCode}
            item={item}
            stringRespType={stringRespType}
          />
        )}
      </div>
    );
  })}
</div>
```

## 다른 이유 

### gap 은 1) 부모가 간격을 설정 2) 조건이 false 이면 gap 이 사라짐 3) 그로인해 덜컹거림이 발생
```
조건 === false → Child 사라짐 → gap도 사라짐

→ 부모 높이 줄어듦 → 레이아웃 점프 발생
```
```tsx
<div className="flex flex-col gap-4">
  {조건 && <div>Child</div>}
</div>

```

### margin 은 1) 자식이 간격을 설정 2) 조건이 false 여서 자식이 사라져도 2) 다른 곳에 영향을 주지 않음 
```tsx
<div className="flex flex-col">
  {조건 && <div className="mb-4">Child</div>}
</div>
```