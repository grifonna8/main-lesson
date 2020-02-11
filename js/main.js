'use strict';

let count = document.getElementById('start'),
    button1 = document.getElementsByTagName('button')[0],
    button2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    input1 = document.querySelectorAll('.additional_income-item')[0],
    input2 = document.querySelectorAll('.additional_income-item')[1],
    results = document.querySelector('.result'),
    values = 0,
    salary = document.querySelector('.salary-amount'),
    income1 = document.querySelectorAll('.income-title')[1],
    income2 = document.querySelector('.income-amount'),
    addIncome1 = document.querySelectorAll('.additional_income-item')[0],
    addIncome2 = document.querySelectorAll('.additional_income-item')[1],
    expenses1 = document.querySelectorAll('.expenses-title')[1],
    expenses2 = document.querySelector('.expenses-amount'),
    addExpenses = document.querySelector('.additional_expenses-item'),
    deposit = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    target = document.querySelector('.target-amount'),
    period = document.querySelector('[type="range"]'),
    values1, values2, values3, values4, values5, values6, values7;


values = results.querySelectorAll('[class*="-value"]');
values1 = values[0];
values2 = values[1];
values3 = values[2];
values4 = values[3];
values5 = values[4];
values6 = values[5];
values7 = values[6];


console.log(count);
console.log(button1);
console.log(button2);
console.log(checkBox);
console.log(input1);
console.log(input2);
console.log(results);
console.log(salary);
console.log(income1);
console.log(income2);
console.log(addIncome1);
console.log(addIncome2);
console.log(expenses1);
console.log(expenses2);
console.log(addExpenses);
console.log(deposit);
console.log(depositAmount);
console.log(depositPercent);
console.log(target);
console.log(period);
console.log(values1);
console.log(values2);
console.log(values3);
console.log(values4);
console.log(values5);
console.log(values6);
console.log(values7);

