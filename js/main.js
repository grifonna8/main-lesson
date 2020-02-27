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
    periodAmount = document.querySelector('.period-amount'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    resetButton = document.querySelector('#cancel'),
    elemType = document.querySelectorAll('input'),
    dataBlock = document.querySelector('.data');


const AppData = function(){
  this.income = {};
  this.addIncome = []; /* доп доходы */
  this.expenses = {};
  this.addExpenses = []; /* массив с возможными расходами */
  this.addExpensesNew = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.incomeMonth = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.accumulatedMonth = 0;
};

AppData.prototype.start = function(){
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses(); 
  this.getAddIncome();
  this.getBudget(); /* результат месячного накопления */    
  this.getTargetMonth();

  this.showResult();
  let typeText = document.querySelectorAll('[type=text]');
  typeText.forEach(function(item){
    if (dataBlock.contains(item)){
      item.setAttribute('disabled', 'disabled');
    }
  });
  start.style.display='none';
  resetButton.style.display='initial';
  resetButton.addEventListener('click', this.reset.bind(this));
};

AppData.prototype.reset = function(){
  this.income = {};
  this.addIncome = []; /* доп доходы */
  this.expenses = {};
  this.addExpenses = []; /* массив с возможными расходами */
  this.addExpensesNew = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.incomeMonth = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.accumulatedMonth = 0;
  if (depositCheck.checked){
    depositCheck.checked = false;
  }
  elemType.forEach(function(item){
    item.value = '';
    item.removeAttribute('disabled', 'disabled');
    if (item.getAttribute('class') === 'period-select'){
      item.value = 1;
    }
    item.style.display='initial';
  });
  start.style.display='initial';
  resetButton.style.display='none';
  if (incomeItems.length === 3){
    incomeItems[1].remove();
    incomeItems[2].remove();
    incomePlus.style.display = 'initial';
  } else if (incomeItems.length === 2){
    incomeItems[1].remove();
    incomePlus.style.display = 'initial';
  }
  if (expensesItems.length === 3){
    expensesItems[1].remove();
    expensesItems[2].remove();
    expensesPlus.style.display = 'initial';
  } else if (expensesItems.length === 2){
    expensesItems[1].remove();
    expensesPlus.style.display = 'initial';
  }
  expensesItems = document.querySelectorAll('.expenses-items');
  incomeItems = document.querySelectorAll('.income-items');
  this.periodChange();
  depositAmount.style.display = 'none';
  depositPercent.style.display = 'none';
  start.disabled = true;
};
AppData.prototype.showResult = function(){
  budgetDayValue.value = this.budgetDay;
  budgetMonthValue.value = this.budgetMonth;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener('input', this.calcChangedSavedMoney.bind(this));
  targetMonthValue.value = this.accumulatedMonth;
};
AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
  console.log(this);
};
AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3){
    incomePlus.style.display = 'none';
  }
  console.log(this);
};
AppData.prototype.getBudget = function (){
  this.budgetMonth = this.budget - this.expensesMonth;
  for (let key in this.income){
    this.income[key] = +this.income[key];
    this.budgetMonth = this.budgetMonth + this.income[key];
  }
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function (){
  this.accumulatedMonth = Math.ceil(targetAmount.value / this.budgetMonth);
  if (this.accumulatedMonth > 0){
    return this.accumulatedMonth;
  }
};
AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay >= 1200){
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};
AppData.prototype.getExpenses = function(){
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function(){
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if((itemIncome !== '') && (cashIncome !== '' || isNumber(cashIncome))){
      this.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if(item !== ''){
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function(){
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.periodChange = function(){
  periodAmount.innerText = periodSelect.value;
};
AppData.prototype.getExpensesMonth = function(){ /* сумма всех трат */
  for (let key in this.expenses){
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getInfoDeposit = function(){
  if (this.deposit){
    do{
      this.percentDeposit = prompt('Какой годовой процент?', '10');
    }
    while (!isNumber(this.percentDeposit) || this.percentDeposit === '');
    do{
    this.moneyDeposit = prompt('Какая суммма вложена?', 10000); 
    }
    while (!isNumber(this.moneyDeposit) || this.moneyDeposit === ''); 
  }
};
AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.calcChangedSavedMoney = function(){
  incomePeriodValue.value = this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListeners = function(){
  start.addEventListener('click', this.start.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.periodChange);
  start.disabled = true;
  let checking = function(){
    if (salaryAmount.value === '' && !isNumber(salaryAmount.value)){
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  };
  salaryAmount.addEventListener('input', checking);
  appData.getTargetMonth();
  appData.getInfoDeposit();
};
const appData = new AppData();
appData.eventListeners();

