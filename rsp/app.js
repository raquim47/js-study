const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt('Rock, Paper or Scissors?', '').toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_CHOICE}`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice = DEFAULT_CHOICE) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (pChoice === PAPER && cChoice === ROCK) ||
    (pChoice === SCISSORS && cChoice === PAPER) ||
    (pChoice === ROCK && cChoice === SCISSORS)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

const startGame = () => {
  if (gameIsRunning) return;

  gameIsRunning = true;
  console.log('Game is starting');
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  const winner = getWinner(computerSelection, playerSelection);
  console.log(playerSelection || DEFAULT_CHOICE, computerSelection, winner);
};

startGameBtn.addEventListener('click', startGame);

// DOM
// DOM (Document Object Model)은 웹 브라우저가 HTML 페이지를 로드한 후에 그 내용을 표현하는 방식
// DOM은 트리 구조로 표현되며, 각각의 요소, 속성, 텍스트 등은 모두 그 트리 구조의 노드로 표현됩니다. 이러한 노드들은 서로 연결되어 있으며, 이를 통해 웹 문서의 전체 구조를 표현

// DOM은 단순히 로드된 HTML 코드를 렌더링하는 것을 넘어서, 자바스크립트 같은 스크립트 언어를 통해 HTML 페이지의 내용과 구조를 동적으로 조작하거나 조회할 수 있는 API를 제공

// DOM을 통해 웹페이지의 요소에 접근하고, 이를 변경하거나 추가, 삭제하는 것을 'DOM 조작'이라고 합니다. 이를 통해 웹페이지는 동적인 인터랙션과 복잡한 기능을 수행

// window  :웹 브라우저 창 자체를 나타내는 객체입니다. 이것은 곧 전역 객체이기도 합니다. 
// document: window 객체의 하위 객체로, 현재 웹페이지의 DOM 트리에 접근하게 해줍니다. 

// // 요소와 노드
// 모든 요소는 노드이지만, 모든 노드가 요소는 아닙니다. 
// 노드(Node): DOM 트리의 각각의 부분을 가리키는 일반적인 용어입니다. 즉, DOM에서 노드는 HTML 문서의 개별 부분을 나타내는 객체로 볼 수 있습니다. 이러한 노드는 여러 가지 타입이 있을 수 있습니다. 예를 들면, 요소 노드(Element Node), 속성 노드(Attribute Node), 텍스트 노드(Text Node) 등이 있습니다.

// 요소(Element): 노드 중에서도 특별히 '요소 노드' 혹은 간단히 '요소'는 HTML 태그 하나를 가리키는 객체입니다. 예를 들면, <p> , <div>, <body>, <head> 등의 태그가 그 예시입니다. 요소는 다른 요소 노드, 텍스트 노드 등의 부모 또는 자식이 될 수 있습니다.

{/* 정적, 동적 노트 */}
// querySelector, querySelectorAll : '정적 Node'를 반환. 이것은 메소드가 호출된 시점에서 해당 선택자에 일치하는 요소들의 '스냅샷'을 가져옵니다. 이후 DOM의 변화가 있더라도, 이 변화는 querySelectorAll이 반환한 NodeList에 반영되지 않는다. 즉, 원래의 요소들에 대한 참조를 유지한다.

// getElementsByTagName, getElementById, getElementsByClassName : '동적 NodeList'를 반환. DOM의 변화를 실시간으로 반영합니다. 

// 속성 vs 프로퍼티
// 속성: HTML 태그 내에서 설정되는 값들을 가리킵니다. 이는 원시 HTML 코드에 직접 작성되며, 그 예시로는 id, class, value, name 등이 있습니다.
// 프로퍼티 : HTML 요소를 나타내는 JavaScript 객체의 속성들을 가리킵니다. DOM에서 요소는 객체로 표현되며, 이 객체의 프로퍼티는 해당 요소의 여러 정보를 나타내게 됩니다. 속성들은 대부분 프로퍼티와 1대1로 매핑되지만, 예외적인 경우도 있습니다.
// HTML 코드에 존재하는 것들이 '속성'이고, 이것이 JavaScript에서 객체로 표현될 때는 '프로퍼티'라고 부릅니다.
// id : 1대1 매핑, 쌍방향 실시간 반영
// class : class, className으로 이름은 다르지만 쌍방향 실시간 반영
// value : 1대1 매핑 단방향 실시간 반영
// <input id="input" value="default"/>
// const input = document.getElementById('input');
// input.value = 'hi';
// 이렇게 프로퍼티를 변경하면 브라우저에서 렌더링하는 뷰는 즉시 업데이트되어 사용자에게 변경된 값('hi')을 보여주게 된다. 하지만 해당 HTML 코드의 value는 변하지 않는다.

// 요소 탐색하기
// <div>
//   <nav></nav>
//   <ul>
//     <li></li>
//     <li></li>
//     <li></li>
//   </ul>
//   <input/>
// </div>
//   자식요소 탐색
// const ul = document.querySelector('ul');
// const ul.firstElementChild;
// 부모요소 탐색
// const liFirst = document.querySelector('li');
// liFirst.parentNode // ul node
// liFirst.closest('div') // div node
// 형제 요소 탐색
// const ul = document.querySelector('ul');
// ul.previousElementSibling // nav node
// ul.nextElementSibling // input node