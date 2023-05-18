const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];
let lastLoggedEntry = -1;

function getMaxLifeValues (){
  const enteredValue = prompt('Maximum Life for you and the monster', '100');
  const parsedValue = parseInt(enteredValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    // 사용자 정의 오류 발생시키기 -> 스크립트 중단
    // 관례상 대부분의 오류는 메세지가 담긴 객체의 형태
    throw {message : 'Invalid user input, not a number'}
  }
  return parsedValue;
}

let chosenMaxLife ;
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error){
  // 현재 코드에서 error는 자체 생성한 에러 메시지 객체
  // 네트워크 요청 같은 시스템 오류인 경우 자바스크립트가 생성한 에러 객체
  console.log(error);
  // 폴백 로직 : 코드가 예상대로 실행되지 않을 때, 즉 예외가 발생할 때 적절한 대응을 할 수 있도록 하는 대체 코드
  chosenMaxLife = 100;
} 

let currMonsterHp = chosenMaxLife;
let currPlayerHp = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHp, playerHp) {
  let logEntry = {
    ev,
    val,
    monsterHp,
    playerHp,
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    default:
      break;
  }
  battleLog.push(logEntry);
}

function reset() {
  currMonsterHp = chosenMaxLife;
  currPlayerHp = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHp = currPlayerHp;
  console.log(initialPlayerHp);
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currPlayerHp -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currMonsterHp,
    currPlayerHp
  );
  if (currPlayerHp <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currPlayerHp = initialPlayerHp;
    setPlayerHealth(initialPlayerHp);
    alert('bonus life save you');
  }

  if (currMonsterHp <= 0 && currPlayerHp > 0) {
    alert('win');
    writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currMonsterHp, currPlayerHp);
  } else if (currPlayerHp <= 0 && currMonsterHp > 0) {
    alert('defeat');
    writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currMonsterHp, currPlayerHp);
  } else if (currMonsterHp <= 0 && currPlayerHp <= 0) {
    alert('draw');
    writeToLog(LOG_EVENT_GAME_OVER, 'DRAW', currMonsterHp, currPlayerHp);
  }

  if (currMonsterHp <= 0 || currPlayerHp <= 0) {
    reset();
  }
}

function attackHandler(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(maxDamage);
  currMonsterHp -= damage;
  writeToLog(logEvent, damage, currMonsterHp, currPlayerHp);
  endRound();
}

function healHander() {
  let healValue;
  if (currPlayerHp >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currPlayerHp;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currPlayerHp += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currMonsterHp, currPlayerHp);
  endRound();
  console.log(currPlayerHp);
}

function printLogHandler() {
  let i = 0;

  for (const logEntry of battleLog) {
    if (lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} : ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener('click', () => attackHandler(MODE_ATTACK));
strongAttackBtn.addEventListener('click', () =>
  attackHandler(MODE_STRONG_ATTACK)
);
healBtn.addEventListener('click', healHander);
logBtn.addEventListener('click', printLogHandler);