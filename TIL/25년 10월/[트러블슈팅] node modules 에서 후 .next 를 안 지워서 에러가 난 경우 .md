### 첫 번째 시도에서 안 되었던 이유는 `.next` 를 안 지워서 

```bash
# 1. pnpm store 정리
pnpm store prune

# 2. node_modules 다시 삭제
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# 3. .next 빌드 캐시도 삭제
rm -rf apps/*/.next

# 4. 재설치
pnpm install

# 5. 빌드
pnpm build
```