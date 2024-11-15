


### 느낀 것 
```
- 재귀 호출에 대해서, 실제로 적용해본 예시. 
- 더 잘 알고 싶다는 생각 
- DB 구조에서 영향을 받는다는 것. 
```


### 로직 

```
- rorootParentId = 게시글 1개의 고유 id 임 
    - 댓글, 대댓글 모두, rootId 를 알고 있어야 함 
    - 바로 직속 부모자식 관계는 parentId 로 표기함 


- 이 부근에서, replies 배열로 들어가서, replies 배열이 있으면, 계속 map 을 돌게 함 (#⭐⭐⭐⭐⭐)
    - 여기가 중요 
    - 이렇게 되는 이유는, 데이터 구조가 게시글 안에, 자기 자신을 달고 있기 때문에 (#⭐⭐⭐⭐⭐⭐⭐⭐)
</tr>
      {/* Recursive rendering for replies */}
      {content?.replies?.map((reply) => (
        <ContentsRow key={reply.id} content={reply} level={level + 1} />
      ))}

```


### 데이터 구조 
```ts
export const QNA_LIST_DATA = [
  {
    id: 1,
    text: "월별 다운로드시 날짜가 중간중간 빠져 있어서 문의 드립니다.",
    author: "이영희",
    isAttachmentShow: true,
    level: 0,
    parentId: null,
    rootParentId: 1, // Root reference for top-level
    createdDate: "24-05-06",
    replies: [
      {
        id: 101,
        text: "이 기능은 관리자만 사용할 수 있습니다.",
        author: "관리자",
        isAttachmentShow: false,
        level: 1,
        parentId: 1,
        rootParentId: 1, // Root reference for level 1 reply
        createdDate: "24-05-07",
        replies: [
          {
            id: 102,
            text: "대댓글 테스트 중입니다.",
            author: "박민수",
            isAttachmentShow: true,
            level: 2,
            parentId: 101,
            rootParentId: 1, // Root reference for level 2 reply
            createdDate: "24-05-08",
          },
          {
            id: 103,
            text: "대댓글 들여쓰기 확인 부탁드립니다.",
            author: "정은지",
            isAttachmentShow: false,
            level: 2,
            parentId: 101,
            rootParentId: 1, // Root reference for level 2 reply
            createdDate: "24-05-09",
          },
        ],
      },
    ],
  },
  ...
]
```

### ContentsRow 사용하는 곳 
```jsx
import CheckBox from "@/app/_common/_element/CheckBox";
import React from "react";
import { ContentsRow } from "./ContentsRow";


export interface QnaContent {
  id: number;
  text: string;
  author: string;
  isAttachmentShow: boolean;
  level: number;
  parentId: number | null;
  rootParentId: number;
  createdDate: string;
  replies: QnaContent[]; // Recursive type to support nested replies
}

interface QnaListTableProps {
  data: QnaContent[];
}


const QnaListTable: React.FC<QnaListTableProps> = ({ data }) => {

  // 최신순 정렬 여부
  const reversedData = [...data].reverse();


  return (
    <div className="overflow-y-scroll rounded-md h-[70vh]">
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="border-t-[2px] border-b-[2px] text-brand3 text-[18px] font-[500] border-[#ccc]">
            <th className="px-3 py-[6px] text-center w-8">
              <CheckBox />
            </th>
            <th className="px-3 py-[6px] border border-[#ccc] text-center w-12">NO</th>
            <th className="px-3 py-[6px] border border-[#ccc] text-center">제목</th>
            <th className="px-3 py-[6px] border border-[#ccc] text-center w-24">첨부</th>
            <th className="px-3 py-[6px] border border-[#ccc] text-center w-24">작성자</th>
            <th className="px-3 py-[6px] border border-[#ccc] text-center w-28">작성일</th>
          </tr>
        </thead>
        <tbody>
          {reversedData.map((content) => (
            <ContentsRow key={content.id} content={content} level={content.level} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QnaListTable;
```

### ContentsRow 정의 
```jsx
import CheckBox from "@/app/_common/_element/CheckBox";
import QnaTitleCell from "./QnaTitleCell";
import AttachmentCell from "./AttachmentCell";
import { QnaContent } from "./QnaListTable";
import QnaTitleReplyNoCell from "./QnaTitleReplyNoCell";

export const ContentsRow: React.FC<{ content: QnaContent; level: number }> = ({
  content,
  level,
}) => {

  // 모든 레벨에서의 댓글 수를 계산
  const replyCount = content?.replies?.length;

  return (
    <>
      <tr
        className={`border-b border-[#ccc] ${
          level % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <td className="px-3 py-[6px] text-center">
          <CheckBox />
        </td>
        <td className="px-3 py-[6px] border border-[#ccc] text-center">
          {content.rootParentId}
        </td>
        <td
          className="px-3 py-[6px] border border-[#ccc] text-left"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          
          <QnaTitleReplyNoCell
            level={content.level}
            text={content.text}
            replyCount={replyCount}
          />
        </td>
        <td className="px-3 py-[6px] border border-[#ccc] font-[300] text-center">
          <AttachmentCell isAttachmentShow={content.isAttachmentShow} />
        </td>
        <td className="px-3 py-[6px] border border-[#ccc] font-[300] text-center">
          {content.author}
        </td>
        <td className="px-3 py-[6px] border border-[#ccc] font-[300] text-center">
          {content.createdDate}
        </td>
      </tr>
      {/* Recursive rendering for replies */}
      {content?.replies?.map((reply) => (
        <ContentsRow key={reply.id} content={reply} level={level + 1} />
      ))}
    </>
  );
};

```