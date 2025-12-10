# 현재 흐름

```JSX
[1] unreal page 진입
    |-- 'https://www.kiweb.or.kr/unreal-5/' 로 진입 (#이때, UTM 을 어떻게 설정해서 한번에 들어가게 할 수 있을까.)

const Unreal5Page = () => {
    return (
        <ViewContentTracker pageKey="unreal-5-page" />
    )
}

// 자주 사용하는 이벤트별 트래커들 (#✅ )
export function ViewContentTracker({ pageKey }: { pageKey?: string } = {}) {
    return <MetaPixelTracker eventName="ViewContent" pageKey={pageKey} />
}


[2] 픽셀에는 000 로 들어감
    |--




```
