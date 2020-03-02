'use strict';

let date = new Date(),
    hours = date.getHours(),
    weekDay = date.getDay(),
    nowTime = date.toLocaleTimeString('en'),
    todayToCompare = date.getTime(),
    futureToCompare = new Date('31 december 2020').getTime(),
    difference = futureToCompare - todayToCompare;


function hello(){
  let newHello = document.createElement('div');
  if (hours >= 7 && hours < 12){
    newHello.innerText = 'Доброе утро';
  }
  if (hours >= 12 && hours < 18){
    newHello.innerText = 'Добрый день';
  }
  if (hours >= 18 && hours < 22){
    newHello.innerText = 'Добрый вечер';
  }
  if (hours >= 22 && hours < 7){
    newHello.innerText = 'Доброй ночи';
  }
  document.body.appendChild(newHello);
  
}
hello();

function dayWeek(){
  let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let todayDay = document.createElement('div');
  todayDay.innerText = 'Сегодня: ' + week[weekDay];
  document.body.appendChild(todayDay);
}
dayWeek();

function time(){
  let nowTimeArr = nowTime.split('');
  if (nowTime[0] >= 0 && nowTime[0] <= 9){
    nowTimeArr.unshift('0');
  }
  let todayTime = document.createElement('div');
  todayTime.innerText = 'Текущее время: ' + nowTimeArr.join('');
  document.body.appendChild(todayTime);
}
time();

function daysBeforeNewYear(){
  difference = Math.floor(difference / 1000 / 60 / 60 / 24);
  let todayDifference = document.createElement('div');
  todayDifference.innerText = `До Нового года осталось ${difference} дней`;
  document.body.appendChild(todayDifference);
}
daysBeforeNewYear();

