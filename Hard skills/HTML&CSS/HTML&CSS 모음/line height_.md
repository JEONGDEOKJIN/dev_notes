


## line height 에 대해서 
``` bash
[line height 란]
- the space between lines 

[특징]
- 폰트 종류 따라서, 필요한 line-height 가 다름 
- 폰트 크기에 따라서, 필요한 line-height 가 다름 
	ex) Sans-serif fonts (e.g., Arial, Roboto): ~1.2 to 1.25.
	ex) Serif fonts (e.g., Times New Roman): ~1.4.
		
- 보통, 폰트 종류 및 크기에 따라서 대응되어야 하므로 '상대적인 값' 으로 설정함 ((https://velog.io/@ursr0706/line-height-%EC%86%8D%EC%84%B1)

[현재 상황]
- 피그마에서는 line height 가 normal 로 되어 있음 
- 피그마의 line height 는 글꼴 크기의 120% ~ 140% 사이
- 현재 피그마 폰트는 Noto Sans CJK KR 
	: - Noto Sans CJK KR 의 line height 
the space between lines is about 120% of the font size, which is typical for sans-serif fonts.

[1차 결론] 
- 우선, 현재 피그마에서 정확한 line-height 값이 없고, 폰트는 Noto Sans CJK KR  이므로, 
	leading-tight 로 설정해서 1.25로 줘보자

```


## [해보기] 음... 근데, leading-tight 로 주니까, 살짝 떠 있네. -> 이 말은, 폰트가 Noto Sans 라고 해서, 일괄적으로 line height 를 줄 수 없다는 의미 -> 하나 하나 확인하면서 넣어줘야 함 -

![Image](https://i.imgur.com/RtfQ6rp.png)


### [이렇게 해보자] line-height 값은 '상대적인 값' 을 넣어야 하니까, 우선, leading-normal(1.5) 을 주고, 각 케이스 마다 확인해줘야 할 것 같다. (다르다면 왜 다른지 까지)

```jsx
    <li
      onClick={onClick}
      className={`shrink-0 font-[700] text-[18px] w-fit h-[30px] px-[10px] rounded-[8px] cursor-pointer  ${
        isActive
          ? "text-white bg-brand1 border-brand1 border-[1px] leading-normal"
          : "text-brand1 bg-white border-brand1 border-[1px] leading-normal"
      }`}
    >
      {label}
    </li>
```

- 우선, line-height 1.5 로 들어가면, 제대로 나온다.
![Image](https://i.imgur.com/GfCOEfU.png)





![Image](https://i.imgur.com/6lV1Vj1.png)

![Image](https://i.imgur.com/cVpu09E.png)

![Image](https://i.imgur.com/6V5SpcZ.png)


![Image](https://i.imgur.com/uwwOo1Z.png)