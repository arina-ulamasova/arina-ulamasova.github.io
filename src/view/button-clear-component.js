import AbstractComponent from '../framework/view/abstract-component.js';


function createButtonClearComponentTemplate() {
    return (
        `<button class="tasks-item__button--clear">x Очистить</button>`
    );
}

export default class ButtonClearComponent extends AbstractComponent {
    #handleClick = null;
    
    constructor(onClick) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createButtonClearComponentTemplate();
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleClick();
    }
}