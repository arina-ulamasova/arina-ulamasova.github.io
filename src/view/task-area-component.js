import AbstractComponent from '../framework/view/abstract-component.js';


function createTaskAreaComponentTemplate() {
    return (
        `<section class="container">
        </section>`
    );
}

export default class TaskAreaComponent extends AbstractComponent {
    get template() {
        return createTaskAreaComponentTemplate();
    }
}