
```
이렇게 된다 
- onChange 이벤트가 발생했을 때 실행되는 방식 
	1) 익명함수를 만들어서, event 객체을 매개변수로 넣는 방식
		onChange = { (e) => console.log("checkbox value : ", e.target.checked)}
		
		- 이때, event 라는 매개변수가 전달되는 과정은 이러하다. 
			1) onChange 는 'input 의 값에 변동' 이 있을 경우 발생하는 이벤트 이다. 
			2) 'input 값' 은 DOM 에서 input 노드의 value attribute 안에 실존한다. 
			3) 이 값에 변화가 있는지를 '브라우저' 가 보고 있다가, value 가 변경되면 -> onChange 이벤트를 발생시키는 것! 
				 - 그래서, radio 버튼에서, 하나의 버튼을 계속 누르면 onClick 이벤트가 발생하지만, 
				 - 실제 값이 바뀌지 않으므로, onChange 이벤트는 발생하지 않는 것 이다. (#⭐⭐⭐)
			4) onChange 이벤트가 발생하면, 브라우저는 event 객체를 생성한다. 
			5) React 의 이를 캡쳐한다. -> 그래서 'SynthticEvent' 라는 객체로 변환한다.
			6) 그래서, 익명함수의 매개변수로 들어온다. (#⭐⭐⭐⭐⭐ 이게 전달되는 구체적인 코드의 로직은?)

- 그러면, onChange 의 이벤트 핸들러로 익명함수가 아니면, 'SynthticEvent 객체'를 못 받아보는건가? 
	: 아님, 이름 있는 함수도 받을 수 있음 (#⭐⭐⭐⭐⭐)
	-> 그러면, SynthticEvent 객체를 못 받아서, 문제가 되었던 경우가 있었는데 


- 그러면, React 가 브라우저가 캡쳐한 event 를 처리하는 구체적인 과정은? (#⭐⭐⭐⭐⭐ 이 과정을 기록하기)
	1) 브라우저가 DOM 요소에서 이벤트를 감지
	2) 브라우저는 해당 event 를 RootNode 에 전달함 
	3) React 가 이 루트노드를 미리 등록하고 있있었음.  
	4) React는 이벤트를 루트 노드에서 위임(Event Delegation) 방식으로 처리
	5) 그래서 'SyntheticEvent' 객체 생성
	6) React는 onChange 에 전달된 함수를 호출한다. | 동시에, 첫 번째 매개변수로 'SyntheticEvent' 객체를 전달한다.
	
	// 	핸들러가 실행될 때, 1) SyntheticEvent 인스턴스 만들어서 2) handler 안으로 syntheticEvent 객체가 들어가는 코드
	function triggerChangeHandler(handler, nativeEvent) {
  const syntheticEvent = new SyntheticEvent(nativeEvent); // DOM 이벤트 객체를 감쌈
  handler(syntheticEvent); // 이벤트 핸들러 호출
}


// 무명 함수도 'SynthticEvent 객체' 를 받을 수 있음. 
onChange={(e) => console.log(e.target.checked)};


// 일반 함수도 'SynthticEvent 객체' 를 받을 수 있음. 
function handleChange(e) {
  console.log(e.target.checked);
}
onChange={handleChange};


/** handler 함수에, 'SynthticEvent 객체' 이외에 '추가 매개변수' 를 전달할 때 ⭐⭐⭐, 
	onChage={handleChange(e, "My custom Param"} 
	이라고 하면 왜 안 되는거야? 
*/
1) React 이벤트 핸들러에 전달되는 값은 '함수 그 자체' 여야 함 (#⭐⭐⭐⭐⭐) 
2) React 는 참조된 함수의 주소값을 들고 있다가 -> 이벤트가 발생했을 때 -> 해당 주소에 가서 -> 실행한다.!!!!!!!!!! 

- ()=>{ handleChange(e, "My Custom Param")  } 이것은, '이런 이런 함수가 있어' 라는 '함수 정의(특정 함수에 대한 주소)' 를 전달하는 것'
- handleChange(e, "My Custom Param") 이것은 함수가 실행된 다음의 return 값을 전달하는 것 
- 우선, 핸들러에 'return 값' 을 전달하냐 VS '함수가 정의된 주소값을 전달하냐.' 의 차이가 존재한다. (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐)
	-> 1) RETURN 값을 전달받으면, 실행 시점을 받아들여야만 하고 
	-> 2) 주소값을 받으면, 원하는 시점에 함수를 실행시킬 수가 있다. 
	-> 따라서, 리액트 구조상, 원하는 시점에 함수를 실행시키고 싶은 것 이다. 

- 그러면, 핸들러에 전달되는 것은 왜 '함수 참조' 여야 하는거야? '함수의 RETURN 값' 이면 안 되고? 
	: 함수의 RETURN 값을 받는 것은, 함수 실행 시점을 핸들러가 결정하지 못 하는 것을 의미 
	: 함수 참조를 받으면, 핸들러가 원하는 시점에 실행시킬 수 있음 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐) 
	
```