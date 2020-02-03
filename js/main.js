'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let answer = +prompt('Угадай число от 1 до 100');
function bot(){
  let a = 35;
  if (isNumber(answer) && answer !== 0){
    if (answer > a){
      answer = +prompt('Загаданное число меньше');
      return bot();
    } else if (answer < a && answer !== 0){
      answer = +prompt('Загаданное число больше');
      return bot();
    } else if (answer === a && answer !== 0){
      answer = confirm('Вы угадали!');
      if (answer === true) {
        answer = +prompt('Угадай число от 1 до 100');
        return bot();
      } else {
        return alert('Игра окончена');
      }
    } else if (answer === 0) {
      return alert('Игра окончена');
    }
  } else {
    alert('Введи число');
    answer = +prompt('Угадай число от 1 до 100');
    return bot(); 
  }
}

bot();

