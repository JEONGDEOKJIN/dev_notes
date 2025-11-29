### 1. `absolute` 는 띄워지는 역할을 하긴 함. 다만, 무엇이 더 위에 보이게 할 것인가는 `어떤 코드가 먼저 쓰였나` 에 따라서 판단되고, 구체적인 순서는 z-index 에 의해 판단됨

### 2. `z-index` 는 `absolute` 여부와는 관계가 없음. (# `형제간` 의 우열을 나타냄!)

## 예시 코드

```tsx
<div className="relative">  // 부모
    <div className="absolute z-10">A</div>   // 형제 1
    <div className="absolute z-20">B</div>   // 형제 2
    <div className="relative z-30">C</div>   // 형제 3
</div>

// 쌓임 순서: A(뒤) → B → C(앞)

```

`absolute`든 `relative`든 상관없이, **z-index 값**으로 형제 간 순서가 결정됩니다.

단, `z-index`가 작동하려면 `position`이 `static`이 아니어야 합니다 (`relative`, `absolute`, `fixed`, `sticky` 중 하나).

## z-index 핵심

```
z-index = 형제 간 쌓임 순서
```

---

## position 속성의 역할

| 속성 | 역할 |
| --- | --- |
| `absolute` | **위치**를 부모 기준으로 배치 |
| `z-index` | **형제 간 순서** 결정 |


![image.png](attachment:8b7d5f82-8fd1-4b73-ab0d-4842fd22cf69:image.png)

### 3. `축이동 + 자신 이동` 을 해서, 가운데 정렬로 맞추기

```jsx
직관적으로는 
'가운데' 를 잡고 이동시키는 것 

그런데, css 상 가운데를 잡고 이동시키는 건 힘듬 
왜냐면 center 를 selector 로 못 잡음

[질문]
1) top 을 잡고도 할 수 있지 않나? 
	👉 맞아. 눈대중으로도 할 수는 있음 
	👉 다만, 정확하게 가운데로 오려면, 축이동 + 자신 이동 해야 

2) 
```

```jsx
1. top-[50%] → 요소의 "상단"이 부모 높이의 50% 위치로 이동
2. -translate-y-[50%] → 자신 높이의 50%만큼 "위로" 이동
```

```jsx
  <div className="absolute top-[50%] w-full -translate-y-[50%] bg-blue-500">
                <Image
                    alt="그리드 스킬업 배경 모바일"
                    className="h-auto w-full"
                    height={175}
                    src={`${staticUrl}assets/event/grid_skillup_bg_mo.png`}
                    width={375}
                />
            </div>

```

- 기존에는 이와 같았음
- 그러다가 부모 기준 top 이동 하고
- 자신의 위치를 translate 해서 가운데를 맞춤

![image.png](attachment:69749330-a40a-439a-834a-bb57e33eaa2d:image.png)

![image.png](attachment:161b9afe-0997-4bae-ad3d-98a27cd4d271:image.png)

### 4. opacity 표현

```jsx
// 연습용 레이아웃 구조
export default function LayoutPractice() {
    return (
        <section className="relative flex h-[300px] w-full items-center justify-center bg-gray-800">
            {/* 1. 메인 콘텐츠 (위에 보임) */}
            <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold text-white">메인 콘텐츠</h2>
                <button className="mt-4 rounded bg-cyan-400 px-6 py-3 font-bold">
                    버튼
                </button>
            </div>

            {/* 2. 배경 이미지 (뒤에 깔림) */}
            <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-20">
                <div className="grid grid-cols-4 gap-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-12 rounded bg-blue-500" />
                    ))}
                </div>
            </div>
        </section>
    )
}
```