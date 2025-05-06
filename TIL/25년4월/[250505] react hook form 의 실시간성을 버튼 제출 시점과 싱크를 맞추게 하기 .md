
ui 2번 클릭되는 이유가 

해당 내부의 옵션을 변경하면 -> react hook form 의 실시간성으로 판단 로직이 변경되는데 

react hook form 은 이미 버튼을 눌렀다고 보고 있었음 

그러면, 

보기를 눌렀을 때 -> 판단 로직을 타게 할게 아니라 
보기 + 버튼을 같이 눌렀을 때 isOverMax, isIncludes 를 판단하게 한다면? 