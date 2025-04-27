# [250427] useState 의 값이 실제로 비동기적으로 처리되지만, 동기처리로 오해 하여 발생한 바텀시트 재호출 문제

- 문제의 원인을 이해한 대로 적은 것
    - `출처 : app\kbsm\components\private\reservation\Program-250426-useState에동기적업데이트를기대하였으나, 비동기 처리로 인해, 발생한, 바텀시트 재호출 이슈.tsx`
    
    ```tsx
        /**
         * [250427] 여기에서, 'handleExaminationQue()' 를 실행시켰을 때,
         * 자궁암을 클릭하고 -> 바텀 시트가 열리고 -> 바텀 시트의 '취소' or '완료' 를 눌렀을 때, -> 왜 다시 바텀시트가 자동적으로, 다시 열리는 걸까?
            1.  - '자궁암을 클릭하고 -> 바텀 시트가 열리고 -> 바텀 시트의 '취소' or '완료' 를 누르고 난 다음' flow 는? 
                - 자궁암 클릭 → handleExaminationQue() → SET_IEXAMINATION_DATA, setIsBottomSheetTriggered(true) -> isBottomSheetTriggered → isBottomSheetOpen(true)
                -> ExaminationSheet가 open=true로 열림, 이 상태에서, ExaminationSheet 안에서 '취소'나 '완료' 버튼 누르면?
            1.1 '완료' 버튼을 누르면 
                -> <ExaminationSheet/> 의 onClick 에 바인딩 되어 있는 onAnswerClickHandler(EXMNCDLIST) 가 실행 -> 문진 FLOW 를 탄다 
                -> 자궁암 바텀시트가 다시 OPEN 됨! 
            
            1.2 '취소' 버튼을 누르면
                - 'handleOnCloseExaminationSheet' 이 실행 -> SET_IEXAMINATION_DATA([]); 실행 -> IEXAMINATION_DATA 변경 -> 
                - IEXAMINATION_DATA 의존하고 있는 useEffect 실행
                  useEffect(() => {
                    if (isBottomTriggered && IEXAMINATION_DATA.length > 0) {
                      setIsBottomSheetOpen(true);
                      setIsBottomSheetTriggered(false);
                    }
                  }, [IEXAMINATION_DATA]);
                
            1.3 근데, 여기에서, 왜 'IEXAMINATION_DATA.length > 0' 이 분기점을 통과해서, bottomSheet 가 열리는가! (#⭐⭐⭐⭐⭐)
    
                  1) 나는 handleOnCloseExaminationSheet 에서 SET_IEXAMINATION_DATA 으로 IEXAMINATION_DATA 를 초기화 했지만 
                  2) '리렌더 타이밍 문제' 로 인해서 (#react 의 상태업데이트(useState) 는 '비동기' 로 일어난다!!! #⭐⭐⭐)
                  3) useEffect 가 먼저 돌면서,  IEXAMINATION_DATA 값이 실제로는 비워지지 않았음 (#⭐⭐⭐⭐⭐⭐) 
                  4) 그 상태에서 IEXAMINATION_DATA.length > 0 이 분기처리가 실행되어서 (#그래서, 값이 비워졌어야 하는데, 비워지지 않아서)
                  5) bottomSheet 가 열린다
                  -> 핵심은 useState 의 상태값은 '비동기' 로 업데이트 된다는 점! (#⭐⭐⭐⭐⭐⭐ )
                  -> 그래서, '동기' 적인 타이밍에 useState 값이 업데이트 되기를 기대하고, 코드를 쓰면, 작동을 안 하게 된다는 점! (#⭐⭐⭐)
          
            [요약] 
              - 실제로 react 의 내부 구성상, 비동기적인 타이밍에 useState 값이 업데이트 되는데, 나는 동기적인 타이밍에 업데이트를 기대하고 코드를 썼음. 
              - 그래서, 원하는대로 동작을 하지 않는다고 느껴졌고, 에러 발생시, 문제 원인 파악이 다른 이슈보다 늦었음.
    
    ```
    

- 해결 : 이렇게 `maxSelectable` 에 의해 분기처리 될 수 있게 셋팅
    
    ```tsx
        if (maxSelectable === 1) {
          if (selectedCancerItemList.length >= maxSelectable) {
            if (isIncludes) {
              const findIdx = selectedCancerItemList.findIndex(
                (v) => v.label === LABEL
              );
              remove(findIdx);
            }
          } else {
            handleExaminationQue();
    
    ```
    

- 시사점 : useState 를 통해 값을 업데이트 하는 것은 `비동기` 처럼 동작하므로 → 이를 `동기처럼` 기대하고 사용하면 안 된다는 점! (#⭐⭐⭐⭐⭐)