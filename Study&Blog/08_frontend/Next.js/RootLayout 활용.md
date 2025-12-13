



### 전체 간격을 w-[1500px] 로 고정해버림. 만약, 세부 페이지에서 w 가 전체 확장되는게 필요하다면? 
```jsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <main className="flex justify-center bg-[#F9F9F4] min-h-screen relative">
          {/* 이렇게 layout 을 잡았을 때, 1500px 이 필요없는 aboutus 에서 전체 확장을 어케 하느냐의 문제가 생김 */}
          <div className="w-[1500px] flex flex-col justify-start ">
            <HeaderBox />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
```


### 해당 세부 페이지에서 absolute 를 걸고, 전체로 확장해버리면 된다. 이걸 하려면, RootLayout 에서 부모 태그에게 relative 가 걸려 있어야 겠지. 하지만...

- 하지만, 뭔가 이상하다. 깔끔하지 못 하다는 생각이 든다. 
- 아마도, layout 전체에 1500px 을 주기 때문이 아닐까. 
- 이걸 어케 보완해야 하려나. 
```jsx
import React from "react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="absolute left-0 w-[100%] ">
      {children}
    </main>
  );
};

export default layout;

```