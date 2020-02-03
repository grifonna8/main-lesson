'use strict';

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let answer = +prompt('Угадай число от 1 до 100');
function bot(){
  const a = randomInteger(1, 100);
  function bot2(){
    if (isNumber(answer) && answer !== 0){
      if (answer > a){
        answer = +prompt('Загаданное число меньше');
        return bot2();
      } else if (answer < a && answer !== 0){
        answer = +prompt('Загаданное число больше');
        return bot2();
      } else if (answer === a && answer !== 0){
        answer = confirm('Вы угадали!');
        if (answer === true) {
          answer = +prompt('Угадай число от 1 до 100');
          return bot2();
        } else {
          return alert('Игра окончена');
        }
      } else if (answer === 0) {
        return alert('Игра окончена');
      }
    } else if (answer !== 0){
      alert('Введи число');
      answer = +prompt('Угадай число от 1 до 100');
      return bot(); 
    } else if (answer === 0){
      return alert('Игра окончена');
    }
  
  }  
  bot2();
}

bot();

