'use strict';
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function(){
      do{
        money = +prompt('Ваш месячный доход?');
      }
      while (!isNumber(money));
    };
start();

let appData = { /* содержит все созданнве переменные */
  income: {},
  addIncome: [], /* доп доходы */
  expenses: {},
  addExpenses: [], /* массив с возможными расходами */
  deposit: false,
  mission: 1000000,
  period: 8,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  accumulatedMonth: 0,
  getBudget: function (){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function (){
    appData.accumulatedMonth = Math.ceil(appData.mission / appData.budgetMonth);
    if (appData.accumulatedMonth > 0){
      console.log('Цель будет достигнута за', appData.accumulatedMonth, 'месяцев' );
    } else { 
      console.log('Цель не будет достигнута');
    }
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200){
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
  asking: function(){
    let answer = 0,
        expenses1,
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++){
      do {
        
        expenses1 = prompt('Введите обязательную статью расходов');
        answer = prompt('Во сколько это обойдется?');
      }
      while (!isNumber(answer));
      appData.expenses[expenses1] = answer;
    } 
  },
  getExpensesMonth: function(){ /* сумма всех трат */
    for (let key in appData.expenses){
      appData.expensesMonth += +appData.expenses[key];
    }
  }
};

appData.asking();
appData.getExpensesMonth();
console.log(appData.expensesMonth);
appData.getBudget(); /* результат месячного накопления */
appData.getTargetMonth();
console.log(appData.getStatusIncome());
for (let key in appData){
  console.log('Наша программа включает в себя данные: ', key, ' ', appData[key]);
}