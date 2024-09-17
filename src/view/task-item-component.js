import {createElement} from '../framework/render.js';


function createTaskItemComponentTemplate() {
    return (
        `
			<li class="task-item">Выучить JS</li>
        `
      );
}


export default class TaskItemComponent {
  getTemplate() {
    return createTaskItemComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
