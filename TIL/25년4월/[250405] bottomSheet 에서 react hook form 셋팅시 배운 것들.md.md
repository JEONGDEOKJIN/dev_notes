- 1차 셋팅 : useFormContext, useFieldArray, 에 대해서

```tsx
import React, { use } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form';

const Program = () => {

    const {control, watch, clearErrors}= useFormContext();
	   /**
		   상위 form 에서 사용하던 control, watch, clearErros를 
		   context 를 통해 
		   하위 컴포넌트에서도 사용할 수 있게 하는 것이 
		   useFormContext 임 
		   
		   이걸 할 수 있는 이유는 
			   1) context 의 존재 
			   2) 이때, 하위 컴포넌트는 당연하지만, FormProvider 로 감싸져야 함 
	   */
    
    const {replace, append, remove} = useFieldArray({control, name})
    /**
	    useFieldArray 는 control 을 매개변수로 받기 때문에, 상위 form 과 연결됨 
	    name 을 설정하면, 상위 form 에서 어떤 필드로 등록할지가 결정됨 
    */

  return (
    <div>Program</div>
  )
}

export default Program
```

- [2차 셋팅] 받아오는 props 를 `...props` 로 펼친다는 것 → 그래서, 코드가 깔끔해지는데, 다만, 언제 `...props` 로 받으면 되는지는 모르겠음 / watch 를 통해서 선택했을 때의 이벤트 핸들러 로직을 전개

```tsx
import React, { use } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form';

const Program = ({name, count, ...props}: ProgramsProps) => {
    // ❓❓❓ 여기에서 props 를 ...props 로 왜 펼치지? 

    /**
     * react-hook-form 관련 로직
     */
    const {control, watch, clearErrors}= useFormContext();
    const {replace, append, remove} = useFieldArray({control, name})
    const selected = IItem<any>[] = watch(name) // 현재 선택된 배열 (#⭐⭐)

  return (
    <div>Program</div>
  )
}

export default Program
```

- [3차 포인트] replace, label, value 의 활용 : ui 로 실제로 보여주는 데이터는 label 로 설정하고, api 로 넘어가는 데이터는 value 로 설정 / replace 는 실제로 하나만 클릭하기 때문에, 이걸로 설정 (#⭐⭐⭐⭐⭐⭐)

```tsx
    /**
     * 검사항목(프로그램) 선택 시, 핸들러
     * @description replace 
        - 해당 name 에 대해서, 새로운 배열로 통째로 덮어쓴다! 
        - replace 를 쓰는 이유는, 하나만 선택했을 때, 해당 배열에 대해서, 덮어쓰는 것 이기 때문에!  
        - 예시 : replace([{ label: LABEL, value: VALUE }]) // 이렇게 하면, name 이라는 필드에 대해서, LABEL과 VALUE 변수에 담긴 값으로 덮어쓴다. (#⭐⭐⭐)

     * @description label 과 value 속성에 대해서 
        - label : UI 에 보여지는 값
        - value : API 요청시 PAYLOAD 에 담기는 값 
            replace({  
                label : LABEL,
                value : VALUE,
            }) 
     */

    const onAnswerClickHandler = () => {
        // 1-1. 단일 선택인 경우 
        // [TODO] 이 count 는 어디에서 온 건지 확인 필요 (#✅TODO)
        if(count === 1){
            replace({
                label : LABEL,
                value : VALUE,
            })
        }
    }

```