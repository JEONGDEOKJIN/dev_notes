
```
target 업데이트 시 → 아래 항목들이 변경되게 하고 싶은데, useMemo 는 참조비교라서, useState 의 경우, 값 비교가 안 됨 음 
```


### ✅ 문제 핵심

- `useMemo`는 **참조값 비교(얕은 비교)**만 해서
    
    `target2` 내부 속성만 바뀌면 **변화 감지 못함** → 계산 안 됨.
    

---

### ✅ 해결

1. **계산 순서 보장하려면**
    
    `getMosList → matchList → result`
    
    이렇게 **의존성 체인**으로 `useMemo` 구성해야 함.
    
2. 만약 `target2` 내부 값이 자주 바뀌는데 캐치가 안 된다면
    
    → **`useEffect + useState` 조합**으로 직접 업데이트 제어.
    

---
