'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
income = '10000',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 1000000,
period = 8,
budgetDay = null,
budgetMonth = null,
expenses1, expenses2;

let start = function(){
  do{
    money = +prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};
start();

console.log(money);


let getExpensesMonth = function(){ /* сумма всех трат */
  let answer = 0;
  let sum = 0;

  for (let i = 0; i < 2; i++){

    if(i === 0){
      expenses1 = prompt('Введите обязательную статью расходов');
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную статью расходов');
    }
    
    do {
      answer = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(answer));
    sum += +answer;
  }
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log(expensesAmount);

function getAccumulatedMonth(){
  return +money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth(); /* результат месячного накопления */

let m = Math.ceil(mission / accumulatedMonth);
function getTargetMonth(){
  if (m > 0){
    console.log('Цель будет достигнута за', m, 'месяцев' );
  } else { 
    console.log('Цель не будет достигнута');
  }
}
getTargetMonth();


let showTypeOf = function(data){
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log((addExpenses.toLowerCase()).split(', '));
budgetDay = Math.floor(accumulatedMonth / 30);/* округление в меньшую сторону */
console.log('Бюджет на день:', budgetDay);

let getStatusIncome = function(){
  if (budgetDay >= 1200){
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};
console.log(getStatusIncome());
