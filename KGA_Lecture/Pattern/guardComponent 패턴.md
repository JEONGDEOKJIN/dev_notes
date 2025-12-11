# CheckLogin - Guard Component 패턴

로그인 여부를 확인하고, 로그인된 사용자만 자식 컴포넌트를 렌더링하는 Guard Component

## 사용법

```tsx
import { CheckLogin } from '@/app/(shared)/layout/check-login'

export default function ProtectedPage() {
    return (
        <CheckLogin>
            <MyProtectedContent />
        </CheckLogin>
    )
}
```

## 동작 흐름

```
사용자 접속
    ↓
CheckLogin 렌더링 시작
    ↓
┌─────────────────────────────────┐
│ isLoading === true              │
│ → <LoadingFallback /> 표시      │
│ → children 렌더링 안 함          │
└─────────────────────────────────┘
    ↓
로그인 상태 확인 완료
    ↓
┌─────────────────────┐     ┌─────────────────────┐
│ isLogin === false   │     │ isLogin === true    │
│ → null 반환         │     │ → children 렌더링   │
│ → 로그인 페이지 이동 │     │ → 보호된 콘텐츠 표시 │
└─────────────────────┘     └─────────────────────┘
```

## 리액트 렌더링 원리

| 단계 | 설명 |
|------|------|
| 1) 부모 먼저 실행 | `CheckLogin`이 먼저 렌더링 |
| 2) 조건부 렌더링 | 부모가 `children`을 반환할지 결정 |
| 3) 자식 렌더링 | `return <>{children}</>` 할 때만 자식 실행 |

**핵심**: `children`은 props로 전달되지만, 부모가 `return`하지 않으면 렌더링되지 않습니다.

## 핵심 코드

```tsx
export const CheckLogin = ({ children }: { children: React.ReactNode }) => {
    const { isLogin, isLoading } = useIsLogin({ redirect: false })

    // 1. 로딩 중 - 자식 렌더링 안 함
    if (isLoading || isLogin === null) {
        return <LoadingFallback size="xl" />
    }

    // 2. 비로그인 - 자식 렌더링 안 함 + 리다이렉트
    if (!isLogin) {
        return null
    }

    // 3. 로그인 됨 - 자식 렌더링
    return <>{children}</>
}
```

## 사용 예시

### 장바구니 페이지

```tsx
// app/(page)/(payments)/cart/page.tsx
export default function CartsPage() {
    return (
        <CheckLogin>
            <ClientCartsPage />
        </CheckLogin>
    )
}
```

### 마이페이지

```tsx
// app/(page)/mypage/page.tsx
export default function MyPage() {
    return (
        <CheckLogin>
            <MyPageContent />
        </CheckLogin>
    )
}
```

## Guard Component 패턴이란?

- **다른 이름**: Protected Route, Auth Guard, Route Guard
- **목적**: 특정 조건(로그인, 권한 등)을 만족할 때만 콘텐츠 표시
- **장점**:
  - 인증 로직을 한 곳에서 관리
  - 재사용 가능
  - 선언적인 코드

## 관련 파일

- [useIsLogin](../../hooks/useIsLogin.tsx) - 로그인 상태 확인 Hook
- [LoadingFallback](../../components/loading-fallback) - 로딩 UI 컴포넌트
