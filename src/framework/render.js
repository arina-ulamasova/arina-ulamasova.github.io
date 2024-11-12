import AbstractComponent from './view/abstract-component.js';


const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',  // Перед самим элементом targetElement
    AFTERBEGIN:  'afterbegin',   // Внутри элемента targetElement, перед его первым потомком
    BEFOREEND:   'beforeend',    // Внутри элемента targetElement, после его последнего потомка
    AFTEREND:    'afterend',     // После самого элемента targetElement
};

function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    
    return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
    if (!(component instanceof AbstractComponent)) {
        throw new Error('Can render only components');
    }
    if (container === null) {
        throw new Error('Container element doesn\'t exist');
    }
    container.insertAdjacentElement(place, component.element);
}

export {RenderPosition, createElement, render};