## 예시

```jsx
 <div className="w-full">
                            <div className="flex flex-col items-center rounded-t-[10px] bg-[#021B2A] py-[4px] text-[13px] leading-[1.29] tracking-[-0.032em] text-[#FFFFFF]">
                                <span className="font-bold">AI 시대, 게임 산업의 현주소</span>
                                <span className="font-medium">(대형사 vs 인디사의 기회와 리스크)</span>
                            </div>
                            <div className="flex-col-center w-full gap-5 md:gap-[1.875rem] xl:gap-10">
                                <iframe
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    className="aspect-video w-full"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    src="https://www.youtube.com/embed/iFWqXwBk4wg?si=3bCCaQSokvTKe3gk"
                                    title="YouTube video player"
                                />
                            </div>
                        </div>
```

## 각 속성 설명

```jsx
<iframe
    // 전체화면 버튼 활성화
    allowFullScreen
    
    // 허용할 기능들 (브라우저 권한 정책)
    // accelerometer: 기기 기울기 감지
    // autoplay: 자동 재생
    // clipboard-write: 클립보드 복사
    // encrypted-media: DRM 콘텐츠 재생
    // gyroscope: 자이로스코프 센서
    // picture-in-picture: PIP 모드 (작은 창으로 보기)
    // web-share: 공유 기능
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    
    // 16:9 비율 유지, 너비는 부모 요소에 맞춤
    className="aspect-video w-full"
    
    // 보안 정책: 같은 출처일 때만 Referer 헤더 전송
    referrerPolicy="strict-origin-when-cross-origin"
    
    // 유튜브 임베드 URL
    src="https://www.youtube.com/embed/E-t_nNMjMQw?si=RIut4C6BClSsy4Da"
    
    // 접근성: 스크린리더용 제목
    title="YouTube video player"
/>
```

## YouTube 임베드 주소 가져오는 방법

### 1. 유튜브 영상에서 "공유" 클릭

영상 아래 **공유** 버튼 클릭

### 2. "퍼가기" 선택

![공유 옵션에서 "퍼가기" 선택]

### 3. iframe 코드에서 src 복사

```html
<iframe src="https://www.youtube.com/embed/Ms5ulu0flWo?si=..."></iframe>

```

이 부분만 가져오면 됩니다:

```
https://www.youtube.com/embed/Ms5ulu0flWo?si=hXWqGpFcHMQeaKFI
```

![image.png](attachment:bfc2763a-016c-49e2-91c6-af7df2ba519b:image.png)

![image.png](attachment:79f3a0a2-af9a-4787-89d9-05ebfc954603:image.png)