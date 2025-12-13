

```jsx
import Accordion_Contents_Freebie from "@/app/program/online-event/_components/Accordion_Contents_Freebie";
import Accordion_Contents_Point from "@/app/program/online-event/_components/Accordion_Contents_Point";

export const contentMap: { [key: string]: React.ReactNode } = {
  point: <Accordion_Contents_Point />,
  freebie: <Accordion_Contents_Freebie />,
};

```


```jsx
 <Accordion
  header={
    <Header_OnlineEvent
      formSelectRHFName="onlineEvent_giveAway_type"
      labelContent="구매금액대별"
    />
  }
  content={contentMap[watchRHFName] || ""}
  />
```