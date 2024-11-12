import AbstractComponent from '../framework/view/abstract-component.js';


function createEmptyTaskComponentTemplate(task, taskColor) {
    return (
        `<li class="tasks__item tasks__item--empty">Перетащите карточку</li>`
    );
}

export default class EmptyTaskComponent extends AbstractComponent {
    get template() {
        return createEmptyTaskComponentTemplate(this.task, this.taskColor);
    }
}