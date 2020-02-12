'use strict';
let books = document.querySelector('.books'),
    bookItem = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    heading = document.querySelectorAll('h2')[4],
    adv = document.querySelector('.adv'),
    bookItemUl1 = bookItem[0].querySelector('ul'),
    liItem1 = bookItemUl1.querySelectorAll('li'),
    bookItemUl2 = bookItem[5].querySelector('ul'),
    liItem2 = bookItemUl2.querySelectorAll('li'),
    bookItemUl3 = bookItem[2].querySelector('ul'),
    liItem3 = bookItemUl3.querySelectorAll('li'),
    elem; 

books.insertBefore(bookItem[1], bookItem[0]);
books.insertBefore(bookItem[4], bookItem[2]);
books.insertBefore(bookItem[2], bookItem[5]);
books.insertBefore(bookItem[5], bookItem[2]);

body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg);');
adv.remove();

bookItemUl1.insertBefore(liItem1[3], liItem1[2]);
bookItemUl1.insertBefore(liItem1[6], liItem1[2]);
bookItemUl1.insertBefore(liItem1[8], liItem1[4]);
bookItemUl1.insertBefore(liItem1[2], liItem1[10]);

bookItemUl2.insertBefore(liItem2[9], liItem2[2]);
bookItemUl2.insertBefore(liItem2[2], liItem2[5]);
bookItemUl2.insertBefore(liItem2[5], liItem2[8]);

elem = document.createElement('li');
elem.textContent = 'Глава 8: За пределами ES6';
bookItemUl3.insertBefore(elem, liItem3[9]);

console.log(books);
console.log(bookItem);
console.log(liItem1);
console.log(liItem2);
console.log(liItem3);
heading.insertAdjacentHTML('beforebegin', '<h2><a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" target="_blank">Книга 3. this и Прототипы Объектов</a></h2>');
heading.remove();