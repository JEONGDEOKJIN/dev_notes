

### flex로 했을 때, 굉장히 애매한 부분이 있음. 예를 들어서, 전체는 가운데 정렬이 되어야 하고, 자식 요소는 왼쪽 정렬이 되어야 하는데, 이게 원하는대로 안 되는 경우가 있음. 

```
- 전체를 justify-start 로 먹이면, 자식 요소 들 가운데 정렬이 쉽지가 않음
```
```jsx
<div className="flex flex-wrap  min-w-[400px] max-w-[500px] h-fit justify-start gap-2 p-4">
        
          {studentDummy.map((student, index) => {
            return (
              <div
                onClick={() =>
                  onSelect(
                    student.name,
                    student.yo,
                    student.special,
                    student.gender
                  )
                }
                key={`목록리스트-${index}`}
                className="cursor-pointer leading-[1.3]   text-[18px] font-[350] text-black33 hover:bg-[#E7E7E7]  "
              >
                <NameGenderBadgeCell student={student} />
              </div>
            );
          })}
        
      </div>
```

![Image](https://i.imgur.com/OOj4v7e.png)



### grid로 하면, 
![Image](https://i.imgur.com/IODVDQ6.png)
```jsx
      <div className="grid grid-cols-3 gap-2 min-w-[400px] max-w-[500px] h-fit p-4">
        {studentDummy.map((student, index) => {
          return (
            <div
              onClick={() =>
                onSelect(
                  student.name,
                  student.yo,
                  student.special,
                  student.gender
                )
              }
              key={`목록리스트-${index}`}
              className="cursor-pointer leading-[1.3] text-[18px] font-[350] text-black33 hover:bg-[#E7E7E7]"
            >
              <NameGenderBadgeCell student={student} />
            </div>
          );
        })}
      </div>
```
