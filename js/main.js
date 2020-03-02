document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  // Timer вариант 1
  // function countTimer(deadline){
  //   let timerHours = document.querySelector('#timer-hours'),
  //       timerMinutes = document.querySelector('#timer-minutes'),
  //       timerSeconds = document.querySelector('#timer-seconds');

  //   function getTimeRemaining(){
  //     let dateStop = new Date(deadline).getTime(),
  //         dateNow = new Date().getTime(),
  //         timeRemaining = (dateStop - dateNow) / 1000, /* перевели мс в сек */
  //         seconds = Math.floor(timeRemaining % 60),
  //         minutes = Math.floor((timeRemaining / 60) % 60),
  //         hours = Math.floor(timeRemaining / 60 / 60);
  //       return {timeRemaining, hours, minutes, seconds};
  //   }

  //   function updateClock(){
  //     let timer = getTimeRemaining();

  //     timerHours.textContent = timer.hours;
  //     timerMinutes.textContent = timer.minutes;
  //     timerSeconds.textContent = timer.seconds;

  //     if(timer.timeRemaining > 0){
  //       setTimeout(updateClock, 1000);
  //     }
      
  //   }

  //   updateClock();
  // }

  // countTimer('03 march 2020');

// Timer вариант 2 с setInterval
  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000, /* перевели мс в сек */
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock(){
      let timer = getTimeRemaining();
      if (timer.hours >= 0 && timer.hours <=9){
        timerHours.textContent = '0' + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes >= 0 && timer.minutes <=9){
        timerMinutes.textContent = '0' + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds >= 0 && timer.seconds <=9){
        timerSeconds.textContent = '0' + timer.seconds; 
      } else {
        timerSeconds.textContent = timer.seconds;
      }
      

      if(timer.timeRemaining > 0){
        setInterval(updateClock, 1000);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
      
    }

    updateClock();
  }

  setInterval(countTimer, 1000, '03 march 2020');


});
