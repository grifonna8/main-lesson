'use strict';
let items = document.querySelector('.items');
const DomElement = function(){
  this.selector =  prompt('Введите селектор');
  this.height = '80px';
  this.width = '150px';
  this.bg =  'pink';
  this.fontSize = '14px';
};

DomElement.prototype.creating = function(){
  if (this.selector[0] === '.'){
    let newElem = document.createElement('div');
    newElem.className = this.selector.slice(1);
    newElem.style.cssText = `height:${this.height};
    width:${this.width};
    background-color:${this.bg};
    font-size:${this.fontSize};`;
    newElem.innerText = 'Я новый элемент';
    items.appendChild(newElem);
  } else if (this.selector[0] === '#'){
    let newElem = document.createElement('p');
    newElem.id = this.selector.slice(1);
    newElem.style.cssText = `height:${this.height};
    width:${this.width};
    background-color:${this.bg};
    font-size:${this.fontSize};`;
    newElem.innerText = 'Я новый элемент';
    items.appendChild(newElem);
  }
};
let elements = new DomElement();
elements.creating();