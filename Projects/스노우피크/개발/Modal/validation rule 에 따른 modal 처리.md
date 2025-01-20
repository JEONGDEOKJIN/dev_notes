
- 개발 노트 출처 : https://www.figma.com/board/LmwbrNXAVUOogSBWXLhthN/%EC%8A%A4%EB%85%B8%EC%9A%B0%ED%94%BC%ED%81%AC-DDD%2C-DAG%2C-%EC%8B%9C%ED%80%80%EC%8A%A4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8?node-id=149-1037&t=7ilJ4pk9SvWvFJ9T-4


### 디렉토리 구조 
```bash
hooks/
├── validation/
│   ├── commonValidation.ts          # Contains common validation rules
│   ├── createValidationStrategy.ts  # Combines common and page-specific 
│   └── pageSpecific/
│       ├── fieldEventValidation.ts  # Page-specific validation logic for Field 
```

### [이슈] 왜 함수를 return 하는가 

```jsx
import { validationResult } from "@/strategies/modals";
import { validateSelection } from "./commonValidation";
import { OnlineEventValidation } from "./page/OnlineEventValidation";


// [TODO] 왜 함수를 return 하는지!!! 
// [TODO] 1) 기본 validation 과 2) page-specific validation 을 조합해서 사용 
export const createStrategyValidation = (strategyType: string) => {
  return (params: {
    selectedItems: string[];
    fetchedData: any;
  }): validationResult => {
    const { selectedItems, fetchedData } = params;

    // 1. Common Validation (selection validation)
    const selectionValidation = validateSelection(selectedItems);
    if (!selectionValidation.isValid) {
      return selectionValidation; // Return early if common validation fails
    }

    // 2. Page-Specific Validation
    switch (strategyType) {
      case "fieldEvent":
        return OnlineEventValidation(selectedItems, fetchedData);
      // Add other strategies here
      case "exhibition":
        return { isValid: true }; // Example: Add exhibition-specific validation here
      case "review":
        return { isValid: true }; // Example: Add review-specific validation here
      default:
        return { isValid: true }; // Default to valid if no strategy applies
    }
  };
};

```