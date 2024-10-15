

- 이걸 내가 짤 수 있게 

```js
// 1. 로컬 스토리지에서 데이터 가져오기
const terms = JSON.parse(localStorage.getItem('terms'));

// 2. 특정 id를 가진 항목의 checked 값을 true로 변경하는 함수
function updateCheckedStatus(id) {
  // 배열을 순회하며 id가 일치하는 항목의 checked 값을 변경
  const updatedTerms = terms.map(term => {
    if (term.id === id) {
      return { ...term, checked: true }; // checked 값을 true로 변경
    }
    return term;
  });

  // 3. 변경된 배열을 다시 로컬 스토리지에 저장
  localStorage.setItem('terms', JSON.stringify(updatedTerms));
}

// 예시: id가 "pi_collection_and_use_optional"인 항목의 checked 값을 true로 변경
updateCheckedStatus('pi_collection_and_use_optional');


```