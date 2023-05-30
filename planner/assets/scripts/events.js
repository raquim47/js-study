const btn = document.querySelector('button');

// btn.onclick = function () {};
const onClickBtn = () => {};
btn.addEventListener('click', onClickBtn);
btn.removeEventListener('click', onClickBtn);
// removeEventListener를 하기 위해선 이벤트 이름, 함수가 같아야 한다. 익명 함수는 제거할 수 없음.

// 아래 경우 또한 bind가 새로운 함수 객체를 생성해 서로 다른 참조를 갖기 때문에 removeEventListener로 제거할 수 없다.
btn.addEventListener('click', onClickBtn.bind(this));
btn.removeEventListener('click', onClickBtn.bind(this));
// 이를 해결하려면 bind 메소드를 호출한 결과를 변수에 저장하고, 그 변수를 사용하여 이벤트 리스너를 등록 및 제거해야 한다.
const boundFn = onClickBtn.bind(this);
btn.addEventListener('click', boundFn);
btn.removeEventListener('click', boundFn);

// 캡쳐링 & 버블링

const section = document.querySelector('section');
const test = document.getElementById('test');
const testBtn = test.querySelector('button');
section.addEventListener('click', (event) => {
  console.log('Clicked section');
  console.log(event);
});
test.addEventListener(
  'click',
  () => {
    // event.stopPropagation()
    console.log('Clicked div');
    console.log(event);
  },
  true
);
testBtn.addEventListener('click', (event) => {
  event.stopPropagation()
  console.log('Clicked btn');
  console.log(event);
});

// JavaScript에서는 모든 이벤트 리스너는 기본적으로 이벤트 버블링이 발생한다, 하위 요소에서 상위 요소로 이벤트가 전파. 특정 요소를 click하면 그 요소의 조상 요소들을 거쳐가면서 click이 발생

// 캡처 단계: 이벤트는 최상위 요소(보통 document 혹은 window 객체)에서 시작하여 실제 이벤트가 발생한 요소까지 '내려갑니다'. 이 단계에서 이벤트 리스너가 동작하게 하려면, addEventListener의 세 번째 인자를 true로 설정해야 합니다.

// 타깃 단계: 이벤트가 실제로 발생한 요소에 도달했습니다. 이 요소에 등록된 이벤트 리스너가 동작합니다. 캡처 단계나 버블링 단계와 관계 없이 항상 이벤트 리스너가 실행됩니다.

// 버블링 단계: 이벤트는 발생한 요소에서 다시 최상위 요소로 '올라갑니다'. 이 단계에서 이벤트 리스너가 동작하게 하려면, addEventListener의 세 번째 인자를 false로 설정하거나 생략해야 합니다. 이것이 기본 동작입니다.

// event.stopPropagation()를 통해 이벤트 전파를 막을 수 있다 (캡처링 방향, 버블링 방향 둘 다)
// event.stopImmediatePropagation() 이벤트의 전파를 중지시키는 동시에 현재 요소에 등록된 나머지 이벤트 핸들러들의 실행도 중지
// btn.addEventListener('click', () => {
//   event.stopImmediatePropagation();
// })
// btn.addEventListener('click', handler1) // 실행안된
// btn.addEventListener('click', handler2) // 실행안된

// mouseenter 이벤트는 DOM 트리에서 버블링되지 않습니다. 이는 mouseenter 이벤트가 특정 요소에 진입했을 때만 그 요소에서 발생하며, 부모 요소로 전파되지 않는다

const listItems = document.querySelectorAll('li');

// listItems.forEach(item => {
//   item.addEventListener('click', e => {
//     e.target.classList.toggle('hightlight')
//   })
// })
// 이벤트 위임, 

const list = document.querySelector('ul');
list.addEventListener('click', e => {
  // currentTarget은 이벤트 리스너가 부착된 요소
  console.log(e.currentTarget)
  // e.target은 클릭되어진 실제 목표를 참조, 단 이벤트 위임은 복잡한 구조에서는 문제가 생길 수 있음
  // e.target.classList.toggle('hightlight')
  
  // 완벽한 이벤트 위임 패턴, 이벤트를 위임하되 DOM 탐색을 조합
  e.target.closest('li').classList.toggle('hightlight');
})