let money = prompt('Ваш месячный доход?'),
income = '10000',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 1000000,
period = 8,
budgetDay = null,
budgetMonth = null,
expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = prompt('Во сколько это обойдется?');

function getExpensesMonth(){ /* сумма всех трат */
  return +amount1 + +amount2;
}
console.log(getExpensesMonth());

function getAccumulatedMonth(){
  return +money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth(); /* результат месячного накопления */

function getTargetMonth(){
  return Math.ceil(mission / accumulatedMonth);
}
console.log('Цель будет достигнута за', getTargetMonth(), 'месяцев' );

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

