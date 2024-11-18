



### [테이블 종류] chunk 로 나눠서 렌더링 하는 경우 
TIL\24년11월_천사일지&널널한개발자CS&정처기\241118.md



### 병합 관련
- 이 부분은 rowspan 을 하면 합쳐지는 구나! 
![Image](https://i.imgur.com/83bKor8.png)



### [셀 커스텀] width 를 수정할 때는, tailwind class 에 넣는게 아니라 바로 css 에 넣어야 들어가짐! 

```jsx
import classNames from "classnames";
import React from "react";
import { Statistics } from "./StatisticsTable";

interface CustomCellBGChangeProps {
  index: number;
  property: number | string;
  bgColor: string;
  tdWidth?: string;
}

{
  /* 성별 구간에서 
      - 3의 배수 일 때, 계를 보여주고, 색상을 변경 
      - 나누기 했을 때 나머지 2로 떨어지는 구간이어야 '계' 라인이 됨
  */
}
const CustomCellBGChange: React.FC<CustomCellBGChangeProps> = ({
  index,
  property,
  tdWidth = "39px",
  bgColor = "bg-[#f5f5f5]",
}) => {
  return (
    <>
      <td
        style={{ width: tdWidth }}
        className={classNames(
          "border-b border-[#ccc] py-2 ",
          index % 3 === 2 ? `${bgColor}` : "bg-white"
        )}
      >
        {property}
      </td>
    </>
  );
};

export default CustomCellBGChange;

```
