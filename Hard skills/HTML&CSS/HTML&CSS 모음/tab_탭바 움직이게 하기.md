

### 탭 밑에 있는 하위 요소들이 클릭할 때 마다 움직인다. `overflow-hidden` 이걸로 우선 잡아줌 
- 움직이는 이유는 하위 요소들이 x 방향으로 좀 더 넓어지는 경우가 있음 
- ex) 패딩이 더 들어갔다거나. 그걸 잡아줌 

```jsx
{/* 오른쪽 섹션 */}
<section className="flex flex-col w-[50%] relative overflow-hidden">

    {/* tabs */}
    <CreateSurveyFormHeader activeTab={activeTab} setActiveTab={setActiveTab} />

    {/* 콘텐츠 박스 */}
    {activeTab === "question" && (
    <>
        <CreateSurveyForm />
    </>
    )}
    {activeTab === "reply" && (
    <>
        <ReplyBox />
    </>
    )}
    {activeTab === "settings" && (
    <>
        <div>
        <ConfigBox />
        </div>
    </>
    )}
</section>

```

- 여기 '질문' 의 경우, 아주 조금 살짝, 옆으로 넓어짐! 
![Image](https://i.imgur.com/91SkNoQ.png)
