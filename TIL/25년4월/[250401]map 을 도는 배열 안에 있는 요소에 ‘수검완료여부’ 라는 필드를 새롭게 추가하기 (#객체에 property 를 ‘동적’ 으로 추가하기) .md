- 1차 작성한 코드
    
    ```tsx
    import React, { useEffect } from "react";
    
    const BasicProgram = ({ items, desc }) => {
      // 설명상태
      const [isDescOpen, setIsDescOpen] = React.useState<boolean[]>([]);
      /**
       *  [설명상태를 '배열' 로 관리하는 이유는?] (#⭐⭐⭐ 내가 부족한 부분)
       */
    
      // 전체 토글 기본값을 false 로 설정
      useEffect(() => {
        if (items && items.length > 0) {
          setIsDescOpen(Array(items.length).fill(false));
          /**
           * setIsOpen: 배열을 값으로 갖는 useState
           * Array(만들고싶은배열개수).fill(넣고싶은값)
           */
        }
      });
    
      // 설명 열고 닫기 토글 함수 (#⭐⭐⭐⭐⭐⭐⭐ #아, 여기에서 많이 배웠다)
      const toggleDesc = (index: number) => {
        setIsDescOpen((prev: boolean[]) => {
          return prev.map((value, idx) => (idx === index ? !value : value));
        });
        /**
         * 1) setIsDescOpen로 useState 를 업데이트 할 거야. 어떤 값으로 할거야?
         * 2) 이전 값을 prev 로 가져와 (#이건, useState 의 기본 기능? )
         * 3) prev(이전 값) 에는 '배열' 이 들어가 있으니까, 배열을 가져와서 map 돌려
         * 4) toggleDesc 함수의 인자로 index 가 들어오면 -> 배열의 요소 중 index 가 동일한 요소를 찾는다. 그래서 해당 value 를 변경한다.
         */
      };
    
      return items?.map(
        (item, index) =>
          // 일반검진(G01) 자체는 화면에 띄워지지는 않고, 수록만 되어 있음.
          items.nhicExmnMdcsCd !== "G01" && (
            <div key={`private_reservation_nhic_exmn_list_${index}`}>
              <div>
                {/* 검사 */}
                <div>
                  {/* 검사명 */}
                  <div>
                    {/* 검사명 */}
                    {item.exmnCdNm}
                    {/* [TODO]
                        - item 안에 '수검완료여부' 필드를 추가해서 -> 바인딩 true/false 로 바인딩 한다.
                        - item 은 객체 인데, 이걸 어디에서, 어떻게 추가해야 할지? (#⭐⭐⭐⭐⭐)
                    */}
                  </div>
                </div>
              </div>
            </div>
          )
      );
    };
    
    export default BasicProgram;
    
    ```
    


    

