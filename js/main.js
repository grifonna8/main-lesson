'use strict';
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let start = document.getElementById('start'),
    salaryAmount = document.querySelector('.salary-amount'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    budgetDayValue = document.querySelectorAll('.budget_day-value')[0],
    budgetMonthValue = document.querySelectorAll('.budget_month-value')[0],
    expensesMonthValue = document.querySelectorAll('.expenses_month-value')[0],
    additionalExpensesValue = document.querySelectorAll('.additional_expenses-value')[0],
    additionalIncomeValue = document.querySelectorAll('.additional_income-value')[0],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    targetAmount = document.querySelector('.target-amount'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodSelect = document.querySelector('.period-select'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    periodAmount = document.querySelector('.period-amount') ;

let appData = { /* содержит все созданнве переменные */
  income: {},
  addIncome: [], /* доп доходы */
  expenses: {},
  addExpenses: [], /* массив с возможными расходами */
  addExpensesNew: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  incomeMonth: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  accumulatedMonth: 0,
  case: function(){
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)){
      start.addEventListener('click', appData.start);
    }
  },
  start: function(){

    appData.budget = +salaryAmount.value;
    console.log('salaryAmount.value: ', salaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses(); 
    appData.getAddIncome();
    appData.getBudget(); /* результат месячного накопления */    
    appData.getTargetMonth();

    appData.showResult();
    
  },
  showResult: function(){
    budgetDayValue.value = appData.budgetDay;
    budgetMonthValue.value = appData.budgetMonth;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    // incomePeriodValue.value = periodSelect.addEventListener('input', appData.calcSavedMoney);
    incomePeriodValue.value = appData.calcSavedMoney();
    targetMonthValue.value = appData.accumulatedMonth;
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getBudget: function (){
    for (let key in appData.income){
      appData.income[key] = +appData.income[key];
    appData.budgetMonth = appData.budget + appData.income[key] - appData.expensesMonth;
    // appData.incomeMonth добавляла еще наверзу, но что это значит не ясно
    }
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function (){
    appData.accumulatedMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
    if (appData.accumulatedMonth > 0){
      return appData.accumulatedMonth;
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
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if((itemIncome !== '') && (cashIncome !== '' || isNumber(cashIncome))){
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  periodChange: function(){
    periodAmount.innerText = periodSelect.value;
  },
  asking: function(){

    let answer = 0,
        expenses1,
        addExpenses = '';
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    do{
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    }
    while (isNumber(addExpenses) || addExpenses === '');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

  },
  getExpensesMonth: function(){ /* сумма всех трат */
    for (let key in appData.expenses){
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getInfoDeposit: function(){
    if (appData.deposit){
      do{
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (!isNumber(appData.percentDeposit) || appData.percentDeposit === '');
      do{
      appData.moneyDeposit = prompt('Какая суммма вложена?', 10000); 
      }
      while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === ''); 
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * periodSelect.value;
  }
};
salaryAmount.addEventListener('blur', appData.case);


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodChange);
appData.getTargetMonth();

let addExpensesStr = '',
item; 
for (item of appData.addExpenses){
  item = item.charAt(0).toUpperCase() + item.substring(1);
  addExpensesStr = addExpensesStr + item + ', ';
}

console.log(addExpensesStr.slice(0, addExpensesStr.length - 2));

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());