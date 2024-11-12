import AbstractComponent from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate() {
    return (
        `<form class="new-task">
            <h2 class="new-task__title">Новая задача</h2>
            
            <input class="new-task__input" type="text" placeholder="Название задачи...">
            <button class="new-task__button" type="submit">+ Добавить</button>
        </form>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;
    
    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleClick();
    }
}